'use client';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    Cookies.set('lang', lang, { expires: 365 });
    router.push(pathname.replace(`/${currentLang}`, `/${lang}`));
  };

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <div className="relative">
      <select
        id="language-select"
        value={currentLang}
        onChange={handleChange}
        className="bg-transparent text-white border-none outline-none cursor-pointer hover:text-gray-300 transition-colors focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-xs px-2 -mx-2 appearance-none pr-2"
        aria-label={`Current language: ${currentLanguage?.label}. Select to change language`}
      >
        {languages.map((lang) => (
          <option 
            key={lang.code} 
            value={lang.code}
            className="bg-black text-white"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
