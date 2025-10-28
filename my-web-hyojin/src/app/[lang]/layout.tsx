import { ReactNode } from 'react';
import { parseLang } from '@/i18n/utils';
import Header from '../../components/Header';
import '@/styles/globals.css';

interface Props {
  children: ReactNode;
  params: { lang: string };
}

export default async function Layout({ children, params }: Props) {
  const lang = parseLang(params.lang);

  return (
    <html lang={lang}>
      <body>
        <Header params={params} />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}