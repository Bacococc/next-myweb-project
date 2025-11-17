'use client';

import { useLang, useDict } from "@/i18n/langContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import Toast from "@/app/[lang]/components/Toast";
import { useState } from "react";

export default function Header() {
  const lang = useLang();
  const dic = useDict();
  const email = "hinicestore@gamil.com";
  const [showToast, setShowToast] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setShowToast(true);  // 토스트 시각화 시작
        setTimeout(() => setShowToast(false), 2000); // 2초 후 자동 숨김
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/50 backdrop-blur pt-2"
      role="banner"
    >
      <nav 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 hover:text-gray-300">
          <Link
            href={`/${lang}`}
            className="group flex flex-col text-left focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-xs px-3 py-2 transition-all"
            aria-label={`Home - ${dic.headerIntro}`}
          >
            <span className="text-white text-lg sm:text-md leading-tight">
              Hyojin Park
            </span>
            <span className="text-gray-200 text-sm font-semibold sm:text-sm transition-colors">
              {dic.headerIntro}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher currentLang={lang} />
            
            <a
              href="https://github.com/Bacococc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm sm:text-base px-3 py-2 rounded-xs focus:ring-2 focus:outline-none focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black transition-all hover:text-gray-300"
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub
            </a>
            
            <button
              onClick={copyEmail}
              className="text-white text-sm sm:text-base px-3 py-2 rounded-xs focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black transition-all hover:text-gray-300"
              aria-label="Copy email"
            >
              Contact
            </button>

            {showToast && (
              <div className="justify-center items-center">
                <Toast message="Email copied!" />
              </div>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
}