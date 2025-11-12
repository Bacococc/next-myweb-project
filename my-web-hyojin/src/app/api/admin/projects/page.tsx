'use client';

import { useState } from "react";

export default function AdminProjectPage() {
  const [form, setForm] = useState({
    title: "",
    content: { en: "", ja: "", ko: "" },
    isMobile: false,
    link: "",
    stacks: [] as string[],
    team: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("content.")) {
      const key = name.split(".")[1] as keyof typeof form.content;
      setForm(prev => ({ ...prev, content: { ...prev.content, [key]: value } }));
    } else if (name === "isMobile") {
      setForm(prev => ({ ...prev, isMobile: checked }));
    } else if (name === "stacks") {
      setForm(prev => ({ ...prev, stacks: value.split(",") }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const addProject = async () => {
    await fetch("/api/projects/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("프로젝트 추가 완료!");
  };

  return (
    <div>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="content.en" placeholder="Content EN" onChange={handleChange} />
      <input name="content.ja" placeholder="Content JA" onChange={handleChange} />
      <input name="content.ko" placeholder="Content KO" onChange={handleChange} />
      <input type="checkbox" name="isMobile" onChange={handleChange} /> Mobile
      <input name="link" placeholder="Link" onChange={handleChange} />
      <input name="stacks" placeholder="Stacks (comma separated)" onChange={handleChange} />
      <input name="team" placeholder="Team" onChange={handleChange} />
      <button onClick={addProject}>추가</button>
    </div>
  );
}