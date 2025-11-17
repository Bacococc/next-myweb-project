export type Lang = 'ko' | 'en' | 'ja';
const supportedLangs: Lang[] = ['ko', 'en', 'ja'];

export function parseLang(lang: string | undefined): Lang {
  if (lang && supportedLangs.includes(lang as Lang)) return lang as Lang;
  return 'ja';
}