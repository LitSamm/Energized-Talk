import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validations";
import { registerParticipant } from "@/lib/registration-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = registrationSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstIssue ? firstIssue.message : "Data pendaftaran tidak valid",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const result = await registerParticipant(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.registration,
        usedFallback: result.usedFallback,
        message: "Pendaftaran berhasil! Selamat datang di Energize Talk Anargya ITS.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/register error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan pada server saat memproses pendaftaran.",
      },
      { status: 500 }
    );
  }
}
