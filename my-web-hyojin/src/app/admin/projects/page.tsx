'use client';

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useCallback, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

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

type Content = {
  ko: string;
  en: string;
  ja: string;
};

export default function AdminProjectPage() {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const collectionRef = collection(db, "projects");
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
          console.log("프로젝트 정보가 없습니다.");
          setProjects([]);
          return;
        }

        const projectList: Project[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const contentData: Content = data.content as Content || { ko: "", en: "", ja: "" };

          projectList.push({
            id: doc.id,
            title: (data.title as string) || 'No Title',
            team: (data.team as string) || 'Unknown Team',
            content: contentData,
            stacks: (data.stacks as string[]) || [],
            isMobile: (data.isMobile as boolean) ?? false,
            link: (data.link as string) || '#',
          });
        });

        setProjects(projectList);

      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error(`Firebase Error: ${error.message}`, error.cause);
        } else {
          console.error("Unknown Error:", error);
        }
        setProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = useCallback(async (projectId: string) => {
    if (!window.confirm(`프로젝트 ID ${projectId}를 정말로 삭제하시겠습니까?`)) {
      return;
    }

    const res = await fetch(`/api/admin/projects/delete/${projectId}`, { 
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, 
    });

    if (res.ok) {
      try {
        alert(`${projectId} 삭제를 완료했습니다.`);
      } catch(error) {
        if (error instanceof FirebaseError) alert('삭제에 실패했습니다.');
      }
    }
  }, []);

  if (projects === undefined) {
    return <div className="p-4 text-center">Loading projects...</div>;
  }
  
  if (projects.length === 0) {
    return <div className="p-4 text-center">No projects found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Project List</h1>
      <div className="space-y-6 gap-2">
        {projects.map(project => (
          <div key={project.id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-sky-600">{project.title}</h2>
            <p className="text-gray-700 mt-2">{project.content.ko}</p>
            <p className="text-sm text-gray-500 mt-1">Stacks: {project.stacks.join(', ')}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => {router.push(`/admin/projects/edit/${project.id}`)}} 
                className="rounded bg-black text-white px-2 py-1">수정</button>
              <button onClick={() => handleDelete(project.id)} 
                className="rounded border border-gray-300 px-2 py-1">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
