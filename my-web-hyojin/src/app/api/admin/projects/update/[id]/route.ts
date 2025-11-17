import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const docRef = doc(db, "projects", params.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    }
    const data = docSnap.data();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json({ error: error.message ?? "서버 에러" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  try {
    const data = await req.json();
    const { id } = await params;
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, data);
    return NextResponse.json({ message: "수정 성공" }, { status: 200 });
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json({ error: error.message ?? "수정 실패" }, { status: 500 });
  }
}
