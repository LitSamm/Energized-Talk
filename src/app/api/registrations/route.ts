import { NextResponse } from "next/server";
import { getAllRegistrations, deleteRegistration } from "@/lib/registration-service";

export async function GET() {
  try {
    const data = await getAllRegistrations();
    return NextResponse.json({
      success: true,
      data: data.registrations,
      isUsingFallback: data.isUsingFallback,
    });
  } catch (error) {
    console.error("API /api/registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil daftar peserta" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID pendaftaran diperlukan" },
        { status: 400 }
      );
    }
    await deleteRegistration(id);
    return NextResponse.json({ success: true, message: "Pendaftaran berhasil dihapus" });
  } catch (error) {
    console.error("API DELETE /api/registrations error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus pendaftaran" },
      { status: 500 }
    );
  }
}
