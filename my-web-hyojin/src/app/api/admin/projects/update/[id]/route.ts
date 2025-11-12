import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

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

// 해야 할 것
// 지금까지의 코드 이해하기
// 사진 경로 어떻게 할지 생각 해보기 -> 트러블 슈팅?