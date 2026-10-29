import { prisma } from "./prisma";
import { RegistrationInput } from "./validations";
import fs from "fs";
import path from "path";

export interface RegistrationRecord {
  id: string;
  ticketCode: string;
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  attendanceType: string;
  interestTopic: string | null;
  questionsForSpeaker: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Generate unique ticket code, e.g. ANR-ET26-X9K4B
export function generateTicketCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ANR-ET26-${randomPart}`;
}

// Fallback JSON storage path when DATABASE_URL is not yet connected to live Supabase
const BACKUP_FILE = path.join(process.cwd(), ".local-registrations.json");

function readLocalBackup(): RegistrationRecord[] {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const data = fs.readFileSync(BACKUP_FILE, "utf-8");
      return JSON.parse(data, (key, value) => {
        if (key === "createdAt" || key === "updatedAt") {
          return new Date(value);
        }
        return value;
      });
    }
  } catch (err) {
    console.error("Error reading local registrations backup:", err);
  }
  return [];
}

function writeLocalBackup(records: RegistrationRecord[]) {
  try {
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local registrations backup:", err);
  }
}

export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  database: "supabase-postgresql" | "local-storage";
  message: string;
}> {
  try {
    // Run quick query
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      database: "supabase-postgresql",
      message: "Terhubung ke Supabase PostgreSQL via Prisma ORM",
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      database: "local-storage",
      message: `Database PostgreSQL belum aktif (${errorMsg.slice(0, 100)}...). Menggunakan mode simulasi lokal.`,
    };
  }
}

export async function registerParticipant(data: RegistrationInput): Promise<{
  success: boolean;
  registration?: RegistrationRecord;
  error?: string;
  usedFallback?: boolean;
}> {
  const ticketCode = generateTicketCode();

  try {
    // 1. Try Prisma with Supabase PostgreSQL
    const existing = await prisma.registration.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
      return {
        success: false,
        error: "Email ini sudah terdaftar sebelumnya. Silakan periksa email Anda atau gunakan email lain.",
      };
    }

    const created = await prisma.registration.create({
      data: {
        ticketCode,
        fullName: data.fullName.trim(),
        institution: data.institution.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        attendanceType: data.attendanceType || "ONLINE",
        interestTopic: data.interestTopic || null,
        questionsForSpeaker: data.questionsForSpeaker?.trim() || null,
        status: "CONFIRMED",
      },
    });

    return {
      success: true,
      registration: created,
      usedFallback: false,
    };
  } catch (dbError) {
    console.warn("Prisma Supabase operation fell back to local file storage:", dbError);

    // Fallback to local storage so user can test the form immediately
    const records = readLocalBackup();
    const existing = records.find(
      (r) => r.email.toLowerCase() === data.email.toLowerCase().trim()
    );

    if (existing) {
      return {
        success: false,
        error: "Email ini sudah terdaftar sebelumnya (mode lokal).",
      };
    }

    const fallbackRecord: RegistrationRecord = {
      id: "local_" + Date.now().toString(36),
      ticketCode,
      fullName: data.fullName.trim(),
      institution: data.institution.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      attendanceType: data.attendanceType || "ONLINE",
      interestTopic: data.interestTopic || null,
      questionsForSpeaker: data.questionsForSpeaker?.trim() || null,
      status: "CONFIRMED",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    records.unshift(fallbackRecord);
    writeLocalBackup(records);

    return {
      success: true,
      registration: fallbackRecord,
      usedFallback: true,
    };
  }
}

export async function getAllRegistrations(): Promise<{
  registrations: RegistrationRecord[];
  isUsingFallback: boolean;
}> {
  try {
    const list = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { registrations: list, isUsingFallback: false };
  } catch (error) {
    console.warn("Fallback to local storage for listing:", error);
    const list = readLocalBackup();
    return { registrations: list, isUsingFallback: true };
  }
}

export async function deleteRegistration(id: string): Promise<boolean> {
  try {
    await prisma.registration.delete({ where: { id } });
    return true;
  } catch {
    const records = readLocalBackup();
    const filtered = records.filter((r) => r.id !== id);
    writeLocalBackup(filtered);
    return true;
  }
}
