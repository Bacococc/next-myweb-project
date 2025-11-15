"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Content {
  ko: string;
  en: string;
  ja: string;
}
interface Project {
  id: string;
  title: string;
  team: string;
  content: Content;
  stacks: string[];
  isMobile: boolean;
  link: string;
}

export default function AdminEditProjectPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      setLoading(true);
      const res = await fetch(`/api/admin/projects/update/${id}`);
      const data = await res.json();
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleChange = (field: keyof Project, value: any) => {
    setProject((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  const handleContentChange = (lang: keyof Content, value: string) => {
    setProject((prev) =>
      prev ? {
        ...prev,
        content: { ...prev.content, [lang]: value }
      } : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    const updatableProject = { ...project };
    delete updatableProject.id; // Firestore에서는 id 필드 필요 없음, path로 전달
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatableProject)
    });
    if (res.ok) {
      alert("프로젝트가 성공적으로 수정되었습니다.");
      router.push("/admin/projects");
    } else {
      alert("수정 실패");
    }
    setSaving(false);
  };

  if (loading) return <div>로딩 중...</div>;
  if (!project) return <div>데이터가 없습니다.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">프로젝트 수정</h1>
      <label className="block mb-2">제목
        <input className="w-full border p-2" value={project.title} onChange={e => handleChange("title", e.target.value)} />
      </label>
      <label className="block mb-2">팀
        <input className="w-full border p-2" value={project.team} onChange={e => handleChange("team", e.target.value)} />
      </label>
      <label className="block mb-2">내용 (한국어)
        <textarea className="w-full border p-2" value={project.content.ko} onChange={e => handleContentChange("ko", e.target.value)} />
      </label>
      <label className="block mb-2">내용 (영어)
        <textarea className="w-full border p-2" value={project.content.en} onChange={e => handleContentChange("en", e.target.value)} />
      </label>
      <label className="block mb-2">내용 (일본어)
        <textarea className="w-full border p-2" value={project.content.ja} onChange={e => handleContentChange("ja", e.target.value)} />
      </label>
      <label className="block mb-2">Stacks
        <input className="w-full border p-2"
          value={project.stacks.join(", ")}
          onChange={e => handleChange("stacks", e.target.value.split(",").map(s => s.trim()))}
        />
      </label>
      <label className="block mb-2">모바일 프로젝트 여부
        <input type="checkbox" checked={project.isMobile} onChange={e => handleChange("isMobile", e.target.checked)} />
      </label>
      <label className="block mb-2">링크
        <input className="w-full border p-2" value={project.link} onChange={e => handleChange("link", e.target.value)} />
      </label>
      <button
        type="submit"
        className="mt-4 px-4 py-2 rounded bg-sky-600 text-white"
        disabled={saving}
      >
        {saving ? "수정 중..." : "저장"}
      </button>
    </form>
  );
}
