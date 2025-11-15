import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
  const data = await req.json();
  try {
    const docRef = doc(db, "projects", params.id);
    await updateDoc(docRef, data);
    return NextResponse.json({ message: "수정 성공" });
  } catch (err) {
    return NextResponse.json({ error: err, message: "수정 실패" });
  }
}