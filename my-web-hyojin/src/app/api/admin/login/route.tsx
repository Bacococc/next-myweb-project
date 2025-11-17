// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  // 클라우드의 요청에서 body에서 비밀번호 부분 가져옴
  const body = await request.json();
  const { password } = body;

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  // 환경변수 없을 경우 response로 보낼 것
  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: '환경변수가 설정되지 않음' }, { status: 500 });
  }


  // 비번 검증 및 토큰 설정
  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true });

    response.cookies.set('admin_token', ADMIN_TOKEN, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 유효기간 1일
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  }

  // 비번 틀릴 경우 response
  return NextResponse.json({ ok: false }, { status: 401 });
}