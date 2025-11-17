import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// POST API 
// 백엔드 API 서버(Nest 등)를 따로 두지 않고, Next.js 자체 API 기능을 활용
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data; // 사용자가 입력한 ID 분리

  if (!id) {
    return NextResponse.json({ ok: false, error: 'id 입력 필요' }, { status: 500 });
  }

  try {
    // setDoc으로 문서 ID를 직접 지정
    await setDoc(doc(db, "projects", String(id)), rest);
    return NextResponse.json({ id, message: "추가 성공" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err}, { status: 400 });
  }
}