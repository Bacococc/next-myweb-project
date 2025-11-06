import { ReactNode } from 'react';
import { parseLang } from '@/i18n/utils';
import { getDictionary } from '@/i18n/config';
import { LangProvider } from '@/i18n/langContext';
import Header from '../../components/Header';
import CursorWithStars from '@/app/[lang]/components/CursorWithStars';
import '@/styles/globals.css';

interface Props {
  children: ReactNode;
  params: { lang: string };
}

export default async function Layout({ children, params }: Props) {
  const lang = parseLang(params.lang);
  const dict = await getDictionary(lang); // 언어별 번역 데이터 불러오기

  return (
    <html lang={lang}>
      <body>
        {/* LangProvider로 언어 상태를 전역적으로 공유 */}
        <LangProvider lang={lang} dict={dict}>
          <CursorWithStars />
          <Header />
          <main className="pt-16">{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}