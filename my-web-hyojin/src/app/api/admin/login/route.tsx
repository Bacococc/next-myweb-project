// src/app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

  if (!ADMIN_PASSWORD || !ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: '환경변수가 설정되지 않음' }, { status: 500 });
  }

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ ok: true });

    response.cookies.set('admin_token', ADMIN_TOKEN, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1일
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}