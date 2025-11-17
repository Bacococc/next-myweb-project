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
  const [error, setError] = useState<string | null>(null);
  const [stacksText, setStacksText] = useState("");  // 초기값을 빈 문자열로 설정

  useEffect(() => {
    if (!id) {
      setError("프로젝트 ID가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/projects/update/${id}`);
        if (!res.ok) {
          throw new Error(`서버 에러: ${res.status}`);
        }
        const data = await res.json();
        setProject(data);
        // 프로젝트 로드 후 stacksText 초기화
        setStacksText(data.stacks.join(", "));
      } catch (error) {
        if(error instanceof Error) {
        setError(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
      }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleStacksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStacksText(e.target.value);
    handleChange("stacks", e.target.value.split(",").map(s => s.trim()).filter(Boolean));
  };

  const handleChange = <K extends keyof Project>(field: K, value: Project[K]) => {
    setProject(prev => prev ? { ...prev, [field]: value } : prev);
  };


  const handleContentChange = (lang: keyof Content, value: string) => {
    setProject((prev) =>
      prev
        ? {
          ...prev,
          content: { ...prev.content, [lang]: value },
        }
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setSaving(true);
    setError(null);

    const updatableProject = { ...project };
    delete updatableProject.id; 

    try {
      const res = await fetch(`/api/admin/projects/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatableProject),
      });
      if (!res.ok) {
        throw new Error(`서버 응답 에러: ${res.status}`);
      }
      alert("프로젝트가 성공적으로 수정되었습니다.");
      router.push("/admin/projects");
    } catch (error) {
      if (error instanceof Error) {
        setError(`수정 실패: ${error.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-600 p-4">오류: {error}</div>;
  if (!project) return <div>데이터가 없습니다.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">프로젝트 수정</h1>

      <label className="block">
        제목
        <input
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={project.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </label>

      <label className="block">
        팀
        <input
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={project.team}
          onChange={(e) => handleChange("team", e.target.value)}
          required
        />
      </label>

      <label className="block">
        내용 (한국어)
        <textarea
          className="w-full border p-2  border-gray-400 rounded-sm"
          value={project.content.ko}
          onChange={(e) => handleContentChange("ko", e.target.value)}
          required
        />
      </label>

      <label className="block">
        내용 (영어)
        <textarea
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={project.content.en}
          onChange={(e) => handleContentChange("en", e.target.value)}
        />
      </label>

      <label className="block">
        내용 (일본어)
        <textarea
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={project.content.ja}
          onChange={(e) => handleContentChange("ja", e.target.value)}
        />
      </label>

      <label className="block">
        스택 (콤마로 구분)
        <input
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={stacksText}
          onChange={handleStacksChange}
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={project.isMobile}
          onChange={(e) => handleChange("isMobile", e.target.checked)}
        />
        모바일 프로젝트 여부
      </label>

      <label className="block">
        링크
        <input
          className="w-full border p-2 border-gray-400 rounded-sm"
          value={project.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        disabled={saving}
      >
        {saving ? "수정 중..." : "저장"}
      </button>
    </form>
  );
}
