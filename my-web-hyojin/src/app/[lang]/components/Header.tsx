import { getDictionary } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { parseLang } from "@/i18n/utils";

interface Props {
  params: { lang: string };
}

export default async function Header({ params }: Props) {
  const lang = parseLang(params.lang);
  const dic = await getDictionary(lang);

  return (
    <header>
      <button>
        Hyojin Park <br /> {dic.headerIntro}
      </button>
      <LanguageSwitcher currentLang={lang}/>
      <button>GitHub</button>
      <button>Contact</button>
    </header>
    
  );
}