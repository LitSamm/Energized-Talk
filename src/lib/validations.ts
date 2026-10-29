import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nama lengkap harus diisi minimal 2 karakter")
    .max(100, "Nama lengkap maksimal 100 karakter"),
  institution: z
    .string()
    .min(2, "Asal instansi/universitas/sekolah harus diisi")
    .max(120, "Nama instansi maksimal 120 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid (contoh: nama@domain.com)"),
  phone: z
    .string()
    .min(10, "Nomor telepon/WhatsApp minimal 10 digit")
    .regex(
      /^(?:\+62|62|08)[0-9]{8,13}$/,
      "Nomor WhatsApp harus valid Indonesia (contoh: 08123456789 atau +628123456789)"
    ),
  attendanceType: z
    .enum(["ONLINE", "ONSITE"], {
      message: "Pilih format kehadiran yang valid",
    })
    .default("ONLINE"),
  interestTopic: z.string().optional(),
  questionsForSpeaker: z.string().max(500, "Pertanyaan maksimal 500 karakter").optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
