'use client';

import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { parseLang } from "@/i18n/utils";

interface Project {
  id: string; 
  title: string;
  team: string;
  content: {
    ko: string;
    en: string;
    ja: string;
  };
  stacks: string[]; 
  isMobile: boolean;
  link: string;
};

export default function ProjectsCompo() {
  const param = useParams();
  const lang = param as { lang: string };

  const [projects, setProjects] = useState<Project[]>([]);
  const parasedLang = parseLang(lang.lang); // 그냥 lang 은 object라 lang.lang으로 문자열을 넘겨줌

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const CollRef = collection(db, "projects");
        const querySnap = await getDocs(CollRef);

        if (querySnap.empty) {
          setProjects([]);
          return;
        }

        const ProjectList: Project[] = [];
        querySnap.forEach(docSnap => {
          const data = docSnap.data() as Project;
          ProjectList.push({
            ...data,
            id: docSnap.id
          });
        });

        setProjects(ProjectList);
      } catch (error) {
        setProjects([]);
      }
    };

    fetchProjects();
  }, [parasedLang]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br py-10 px-6 z-60 text-white">
      <div className="w-2/5 text-left m-14 justify-start">
        <h2 className="text-5xl font-extrabold animate-fadeIn">
          I am Hyojin.<br />
          A pioneer who keeps moving forward, unafraid of change.
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center border-gray-100/5 backdrop-blur">
        {projects.map((item, idx) => (
          <div
            key={idx}
            className="relative hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-out overflow-hidden w-full">
            <Link href={`/project/${item.id}`}>
              <div className="relative w-full h-90">
                <Image
                  src={`/images/projectMain/${idx + 1}.png`}
                  alt={`${item.title} project main image`}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
              <div className="p-6 flex flex-col justify-between min-h-[160px]">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3">
                  {/* 언어별 내용 렌더링 */}
                  {item.content[parasedLang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.stacks.map((stack, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs text-black bg-gray-100/90 font-medium px-3 py-1 rounded-full shadow-sm transition">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
