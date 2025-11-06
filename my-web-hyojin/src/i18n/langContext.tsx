'use client';

import { createContext, useContext } from 'react';
import type { Lang } from './utils';

type Dictionary = Record<string, string>;

interface LangContextType {
  lang: Lang;
  dict: Dictionary;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Lang;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, dict }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx.lang;
}

export function useDict() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useDict must be used within LangProvider');
  return ctx.dict;
}