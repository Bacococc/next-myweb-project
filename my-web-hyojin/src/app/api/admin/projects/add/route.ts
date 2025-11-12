import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data; // 사용자가 입력한 ID 분리

  if (!id) {
    return NextResponse.json({ error: "id가 필요합니다", message: "추가 실패" });
  }

  try {
    // setDoc으로 문서 ID를 직접 지정
    await setDoc(doc(db, "projects", String(id)), rest);
    return NextResponse.json({ id, message: "추가 성공" });
  } catch (err) {
    return NextResponse.json({ error: err, message: "추가 실패" });
  }
}