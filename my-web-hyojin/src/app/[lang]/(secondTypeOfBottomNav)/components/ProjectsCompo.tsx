import Image from "next/image";

const projects = [
  {title: "Dutchpay - Global Campus Mate", content: "외국인 유학생들을 위한 간편 송금 & 정산 웹 서비스로, 다국적 환경에서도 손쉽게 더치페이를 할 수 있는 플랫폼입니다.", image: "/images/project1.png", stacks: ["Next.js", "TypeScript", "Nest.js", "MySQL", "Docker", "Team Project"]},
  {title: "Dutchpay - Global Campus Mate", content: "외국인 유학생들을 위한 간편 송금 & 정산 웹 서비스로, 다국적 환경에서도 손쉽게 더치페이를 할 수 있는 플랫폼입니다.", image: "/images/project1.png", stacks: ["Next.js", "TypeScript", "Nest.js", "MySQL", "Docker", "Team Project"]},
];

export default function ProjectsCompo() {
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
            {/* 이미지 */}
            <div className="relative w-full h-90">
              <Image
                src={item.image}
                alt={`${item.title} project main image`}
                fill
                className="object-cover rounded-sm"
              />
            </div>

            {/* 내용 */}
            <div className="p-6 flex flex-col justify-between min-h-[160px]">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm leading-relaxed mb-4 line-clamp-3">
                {item.content}
              </p>

              {/* 기술 스택 */}
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
          </div>
        ))}
      </div>
    </section>
  );
}