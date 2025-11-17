import { getDictionary } from "@/i18n/config";
import { parseLang } from "@/i18n/utils";
import Image from "next/image";
import AboutHobby from "./AboutHobby";
import Timeline from "./TimeLine";

interface Props {
  params: { lang: string };
}

export default async function AboutContents({ params }: Props) {
  const lang = parseLang(params.lang);
  const dic = await getDictionary(lang);

  return (
    <div className="text-gray-100 z-50 mt-10">
      <div className="flex justify-between gap-10">
        <div className="w-2/5 text-left m-14 justify-start">
          <h2 className="text-5xl font-extrabold animate-fadeIn"> 
            I am Hyojin.<br />
            A pioneer who keeps moving forward, unafraid of change.
          </h2>
          <p className="py-10 text-md text-gray-300 tracking-wider font-light animate-fadeIn">{dic.aboutContent1}</p>
          <p className="py-2 text-md text-gray-300 tracking-wider font-light animate-fadeIn">{dic.aboutContent2}</p>
          <p className="py-2 text-md text-gray-300 tracking-wider font-light animate-fadeIn">{dic.aboutContent3}</p>
          </div>
              <div className="justify-end">
          <Image src="/Images/Omurice.png" alt="Hyojin holding Omurice" width={400} height={400} 
            className="mt-10 p-2 animate-fadeIn" 
          />
        </div>
      </div>

      <div className="mx-14 mt-14">
        <p className="text-5xl font-extrabold animate-fadeIn mb-8">I love...</p>

        {/* 취미 뱃지 컨테이너 */}
        <div className="flex gap-2 text-stone-700">
          <div className="text-center text-sm p-1 bg-pink-200 border border-pink-400 rounded-full w-20">
            Travel
          </div>
          <div className="text-center text-sm p-1 bg-sky-200 border border-sky-400 rounded-full w-20">
            Baking
          </div>
          <div className="text-center text-sm p-1 bg-[#bfebae] border border-[#749c65] rounded-full w-20">
            Karaoke
          </div>
          <div className="text-center text-sm p-1 bg-stone-200 border border-stone-400 rounded-full w-20">
            Design
          </div>
        </div>

          <AboutHobby />
          <div className="w-3/5 text-left m-14 justify-start mt-30">
            <Timeline />
          </div>
      </div>
    </div>
  );
}