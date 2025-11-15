import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const docRef = await addDoc(collection(db, "projects"), data);
    return NextResponse.json({ id: docRef.id, message: "추가 성공" });
  } catch (err) {
    return NextResponse.json({ error: err, message: "추가 실패" });
  }
}