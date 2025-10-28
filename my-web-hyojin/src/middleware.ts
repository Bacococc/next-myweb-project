import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일이나 API 요청 제외
  if (PUBLIC_FILE.test(pathname) || pathname.includes('/api/')) return;

  const locales = ['ko', 'en', 'ja'];

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const lang = request.cookies.get('lang')?.value || 'ja';
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/((?!_next).*)'],
};