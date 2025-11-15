'use client';

import { useState } from "react";

export default function AdminProjectPostPage() {

  const [form, setForm] = useState({
    id: "",
    title: "",
    content: { en: "", ja: "", ko: "" },
    isMobile: false, // 기본 값 false
    link: "",
    stacks: [] as string[],
    team: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    // content.en, content.ja, content.ko
    if (name.startsWith("content.")) {
      // [1] 인덱스로 어느 언어인지 구분
      const key = name.split(".")[1] as keyof typeof form.content;
      setForm(prev => ({ ...prev, content: { ...prev.content, [key]: value } }));
      return;
    }

    // 체크박스
    if (name === "isMobile" && target instanceof HTMLInputElement) {
      setForm(prev => ({ ...prev, isMobile: target.checked }));
      return;
    }

    // stacks
    if (name === "stacks") {
      setForm(prev => ({ ...prev, stacks: value.split(",") }));
      return;
    }

    // 일반 input
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 같은 url 의 route 와 매핑 -> /api/admin/projects/add/post 
  const addProject = async () => {
    await fetch("/api/admin/projects/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("프로젝트 추가 완료!");
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-lg min-h-100 bg-white p-6 rounded-lg shadow-lg space-y-4">

        <h2 className="text-xl font-bold text-center mb-4">프로젝트 추가</h2>

        <input
          name="id"
          placeholder="ID"
          onChange={handleChange}
          className="input"
        />

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="input"
        />

        <input
          name="content.en"
          placeholder="Content(EN)"
          onChange={handleChange}
          className="input"
        />

        <input
          name="content.ja"
          placeholder="Content(JP)"
          onChange={handleChange}
          className="input"
        />

        <input
          name="content.ko"
          placeholder="Content(KR)"
          onChange={handleChange}
          className="input"
        />

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isMobile" onChange={handleChange} />
          Is mobile ratio
        </label>

        <input
          name="link"
          placeholder="Link"
          onChange={handleChange}
          className="input"
        />

        <input
          name="stacks"
          placeholder="Stacks (comma separated)"
          onChange={handleChange}
          className="input"
        />

        <input
          name="team"
          placeholder="Team"
          onChange={handleChange}
          className="input"
        />

        <button
          onClick={addProject}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition"
        >
          ADD
        </button>
      </div>
    </div>
  );
}