'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Image from "next/image";
import Link from "next/link";
import { parseLang } from "@/i18n/utils";

export default function ProjectDetailCompo() {
  const params = useParams();
  const { lang, projectId } = params as { lang: string; projectId: string };

  const [project, setProject] = useState<any>(null);
  const parsedLang = parseLang(lang);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProject(docSnap.data());
        else console.log("해당 프로젝트 문서를 찾을 수 없습니다.");
      } catch (error) {
        console.error("Firestore 데이터 가져오기 오류:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 1000); // 1초 후
    return () => clearTimeout(timer);
  }, []);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center gap-4 p-10 animate-pulse">
      <div className="flex gap-4">
        <div className="bg-gray-400/50 rounded-sm transition-transform w-64 aspect-[9/16]" />
        <div className="bg-gray-400/50 rounded-sm transition-transform w-64 aspect-[9/16]" />
        <div className="bg-gray-400/50 rounded-sm transition-transform w-64 aspect-[9/16]" />
        <div className="bg-gray-400/50 rounded-sm transition-transform w-64 aspect-[9/16]" />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen px-8 py-16 text-white flex flex-col items-center" role="main">

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* 위쪽 */}
          <div className="h-1/2 bg-black origin-top animate-open-top"></div>
          {/* 아래쪽 */}
          <div className="h-1/2 bg-black origin-bottom animate-open-bottom"></div>
        </div>
      )}
      
      {/* 이미지 갤러리 */}
      <section aria-labelledby="project-gallery" className="flex gap-4 mb-12 w-full max-w-6xl justify-center flex-wrap">
        <h2 id="project-gallery" className="sr-only">Project image gallery</h2>
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            tabIndex={0}
            aria-label={`${project.title} 프로젝트의 ${num}번째 이미지 (${project.isMobile ? "모바일 화면" : "데스크탑 화면"})`}
            className={`bg-neutral-900 rounded-sm shadow-[0_4px_32px_0_rgba(0,0,0,0.15)] border border-neutral-700 
                        transition-transform w-64 ${project.isMobile ? "aspect-[9/16]" : "aspect-[16/9]"}
                        focus:outline-2 focus:outline-white`}
          >
            <div className="relative w-full h-full">
              <Image
                src={`/images/projects/${projectId}/${num}.png`}
                alt={`${project.title} 프로젝트의 ${num}번째 이미지 (${project.isMobile ? "모바일 화면" : "데스크탑 화면"})`}
                className="rounded-sm object-cover"
                fill
                sizes="(max-width: 600px) 100vw, 25vw"
              />
            </div>
          </div>
        ))}
      </section>

      {/* 프로젝트 설명/스택/링크 */}
      <article aria-labelledby="project-info" className="w-full max-w-5xl px-10 py-8 flex flex-col lg:flex-row gap-4">
        <h2 id="project-info" className="sr-only">프로젝트 정보</h2>

        {/* 타이틀 + 설명 */}
        <div className="lg:w-2/3 flex flex-col">
          <h3 className="text-3xl font-extrabold mb-3">{project.title}</h3>
          <p className="text-md leading-relaxed text-gray-300 mb-6">{project.content?.[parsedLang]}</p>
        </div>

        {/* 스택 + 팀 + 링크 */}
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
          {project.team && (
            <p
              className="flex flex-wrap gap-1.5 px-4 py-1 rounded-full shadow-md text-xs tracking-wide border border-white hover:bg-white/50 transition"
            >
              Team {project.team}
            </p>
          )}
          <Link
            href={project.link}
            className="text-xs items-center border border-white px-4 py-1 rounded-full font-medium hover:bg-white/50 
                       focus-visible:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 
                       focus-visible:outline-white transition"
          >
            Go to GitHub
          </Link>
        </div>
      </article>
    </main>
  );
}