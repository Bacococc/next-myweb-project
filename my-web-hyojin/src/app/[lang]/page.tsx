import { parseLang } from '@/i18n/utils';
import { getDictionary } from '@/i18n/config';

interface Props {
  params: { lang: string };
}

export default async function Page({ params }: Props) {
  const lang = parseLang(params.lang);
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1>{dict.greeting}</h1>
    </div>
  );
}