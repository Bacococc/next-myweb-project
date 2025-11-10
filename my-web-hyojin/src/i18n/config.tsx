import { Lang } from './utils';

const dictionaries = {
  ko: () => import('@/i18n/messages/ko.json').then((m) => m.default),
  en: () => import('@/i18n/messages/en.json').then((m) => m.default),
  ja: () => import('@/i18n/messages/ja.json').then((m) => m.default),
};

export async function getDictionary(lang: Lang) {
  return dictionaries[lang]();
}