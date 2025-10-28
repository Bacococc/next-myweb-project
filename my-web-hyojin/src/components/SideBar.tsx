"use client";
import { useTranslation } from "react-i18next";

export const sideBarItems = [
  { key: "home" },
  { key: "about" },
  { key: "contact" },
];

export default function SideBar() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col p-4 bg-gray-100 w-60">
      {/* 언어 전환 버튼 */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("jp")}>JP</button>
      </div>

      <ul className="flex flex-col gap-2">
        {sideBarItems.map((item) => (
          <li key={item.key}>{t(item.key)}</li>
        ))}
      </ul>
    </div>
  );
}