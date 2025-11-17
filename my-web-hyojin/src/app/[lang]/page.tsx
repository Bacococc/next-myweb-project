import { parseLang } from '@/i18n/utils';
import { getDictionary } from '@/i18n/config';
import BottomNav from '@/components/BottomNav';
import HomeClient from './components/HomeClinet';

interface Props {
  params: { lang: string };
}

export default async function HomePage({ params }: Props) {
  const lang = parseLang(params.lang);
  const dict = await getDictionary(lang);

  return (
    <>
      <HomeClient dict={dict} />
      <BottomNav />
    </>
  );
}