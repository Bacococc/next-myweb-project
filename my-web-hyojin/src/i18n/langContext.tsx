// @/i18n/langContext.tsx (최종 타입 정의 통합)

'use client';

import { createContext, useContext } from 'react';
import type { Lang } from './utils';
import React from 'react';

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  more?: string | null; 
}

export interface Dictionary {
  timelineTitle: string; 
  timelineItems: TimelineItem[]; 
  [key: string]: unknown; // 나머지 키에 대한 유연한 타입
}

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