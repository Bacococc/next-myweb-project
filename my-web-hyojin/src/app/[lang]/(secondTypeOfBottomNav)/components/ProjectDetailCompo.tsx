'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Image from "next/image";
import { parseLang } from "@/i18n/utils";
import Link from "next/link"; // lucide-react가 아니라 next/link 사용!

export default function ProjectDetailCompo() {
  const params = useParams();
  const { lang, projectId } = params as { lang: string; projectId: string };

  const [project, setProject] = useState<any>(null);
  const parsedLang = parseLang(lang);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          console.log("❌ 해당 프로젝트 문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("🔥 Firestore 데이터 가져오기 오류:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  if (!project) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen px-8 py-16 text-white flex flex-col items-center">
      {/* 이미지 카드 */}
      <div className="flex gap-4 mb-12 w-full max-w-6xl justify-center flex-wrap">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`bg-neutral-900 rounded-sm shadow-[0_4px_32px_0_rgba(0,0,0,0.15)]
              border border-neutral-700 transition-transform
              w-64 ${
                project?.isMobile ? "aspect-[9/16]" : "aspect-[16/9]"
              }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={`/images/projects/${projectId}/${num}.png`}
                alt={`${num}th image of ${project.title} project`}
                className="rounded-sm object-cover"
                fill
                sizes="(max-width: 600px) 100vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 설명/스택/링크 */}
      <div className="w-full max-w-5xl px-10 py-8 flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 flex flex-col">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            {project.title}
          </h2>
          <p className="text-md leading-relaxed text-gray-300 mb-6">
            {project.content?.[parsedLang]}
          </p>
        </div>
        <div className="lg:w-1/3 flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stacks?.map((stack: string, index: number) => (
              <span
                key={index}
                className="bg-gray-100/95 text-neutral-800 px-4 py-1 rounded-full shadow-md text-xs tracking-wide"
              >
                {stack}
              </span>
            ))}
          </div>
          <p className="flex flex-wrap gap-1.5 px-4 py-1 rounded-full shadow-md text-xs tracking-wide border border-white hover:bg-white/50 transition">
            Team {project.team}
          </p>
          <Link
            href={project.link}
            className="text-xs items-center border border-white px-4 py-1 rounded-full font-medium hover:bg-white/50 transition"
          >
            Go to GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}