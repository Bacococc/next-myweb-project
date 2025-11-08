import AboutContents from "../components/AboutContents";

export default function AboutHyojinPage({ params }: { params: { lang: string } }) {
  return (
    <div className="w-full px-10 gradation bg-gradient-to-t from-natural-900/50 backdrop:blur-md">
      <AboutContents params={params} />
    </div>
  );
}