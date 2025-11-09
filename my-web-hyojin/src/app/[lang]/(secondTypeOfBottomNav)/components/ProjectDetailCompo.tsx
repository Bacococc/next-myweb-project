'use client';

import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProjectDetailCompo() {
  const projectId = useParams();

  return (
    <div className="w-full flex gap-6 p-6 bg-neutral-900">
      {/* 각 이미지 컨테이너를 카드처럼 box-shadow, rounded-lg 적용 */}
      <div className="bg-neutral-900 rounded-3xl shadow-xl p-3 flex-1 flex items-center justify-center aspect-square">
        <Image
          src={`/projects/${projectId}/1.png`}
          alt={`1st picture of ${projectId}th project`}
          className="rounded-2xl object-cover w-full h-full"
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
      <div className="bg-neutral-900 rounded-3xl shadow-xl p-3 flex-1 flex items-center justify-center aspect-square">
        <Image
          src={`/projects/${projectId}/2.png`}
          alt={`2nd picture of ${projectId}th project`}
          className="rounded-2xl object-cover w-full h-full"
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
      <div className="bg-neutral-900 rounded-3xl shadow-xl p-3 flex-1 flex items-center justify-center aspect-square">
        <Image
          src={`/projects/${projectId}/3.png`}
          alt={`3rd picture of ${projectId}th project`}
          className="rounded-2xl object-cover w-full h-full"
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
      <div className="bg-neutral-900 rounded-3xl shadow-xl p-3 flex-1 flex items-center justify-center aspect-square">
        <Image
          src={`/projects/${projectId}/4.png`}
          alt={`4th picture of ${projectId}th project`}
          className="rounded-2xl object-cover w-full h-full"
          fill
          sizes="(max-width: 600px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
