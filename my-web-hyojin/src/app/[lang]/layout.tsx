import { ReactNode } from 'react';
import { parseLang } from '@/i18n/utils';
import { getDictionary } from '@/i18n/config';
import { LangProvider } from '@/i18n/langContext';
import Header from '../../components/Header';
import CursorWithStars from '@/app/[lang]/components/CursorWithStars';
import '@/styles/globals.css';
import type { Dictionary } from '@/i18n/langContext';

interface Props {
  children: ReactNode;
  // 여기서 Promise 로 변경
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: Props) {
  // 먼저 params 를 await 해서 lang 꺼내기
  const { lang } = await params;

  const parsedLang = parseLang(lang);
  const dict: Dictionary = await getDictionary(parsedLang);

  return (
    <html lang={parsedLang}>
      <body>
        <LangProvider lang={parsedLang} dict={dict}>
          <CursorWithStars />
          <Header />
          <main className="pt-16">{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}
