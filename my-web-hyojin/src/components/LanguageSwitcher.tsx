'use client';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (lang: string) => {
    Cookies.set('lang', lang, { expires: 365 });
    router.push(pathname.replace(`/${currentLang}`, `/${lang}`));
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => handleChange(e.target.value)}
      className="border rounded p-1"
    >
      <option value="ko">🇰🇷 한국어</option>
      <option value="en">🇺🇸 English</option>
      <option value="ja">🇯🇵 日本語</option>
    </select>
  );
}