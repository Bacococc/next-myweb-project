import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "projects", params.id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "삭제 성공" });
  } catch (err) {
    if(err instanceof FirebaseError){
      return NextResponse.json({ error: err.message ?? err, message: "삭제 실패" }, { status: 500 });
    }
  }
}