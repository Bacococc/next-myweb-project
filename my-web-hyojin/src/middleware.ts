import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일이나 API 요청 제외
  if (PUBLIC_FILE.test(pathname) || pathname.includes('/api/')) return;

  const locales = ['ko', 'en', 'ja'];

  // url에 언어 정보가 빠진 경우
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // /admin 으로 시작되는 url일 경우 쿠키에 어드민 토큰이 없으면 로그인 페이지로 이동
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || token !== process.env.ADMIN_TOKEN) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.search = `?from=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(loginUrl);
    }
  }

  // url이 pathnameIsMissingLocale일 경우 쿠키에서 가져옴 -> 없을 경우 ja 를 기본으로 사용
  if (pathnameIsMissingLocale) {
    if (!pathname.startsWith('/admin')) {
      const lang = request.cookies.get('lang')?.value || 'ja';
      return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next).*)'],
};