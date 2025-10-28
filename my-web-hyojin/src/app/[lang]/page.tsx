import { parseLang } from '@/i18n/utils';
import { getDictionary } from '@/i18n/config';
import Toast from './components/Toast';
import BottomNav from '@/components/BottomNav';
import CursorWithStars from './components/CursorWithStars';

interface Props {
  params: { lang: string };
}

export default async function HomePage({ params }: Props) {
  const lang = parseLang(params.lang);
  const dict = await getDictionary(lang);

  return (
    <>
      <div>
        <CursorWithStars />
        <Toast />
        <h1>{dict.greeting}</h1>
      </div>
      <BottomNav />
    </>
    
  );
}