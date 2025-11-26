import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "삭제 성공" });
  } catch (err) {
    if (err instanceof Error)
    return NextResponse.json({ error: err.message ?? err, message: "삭제 실패" }, { status: 500 });
  }
}
