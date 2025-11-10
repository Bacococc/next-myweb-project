import ProjectDetailCompo from "../../components/ProjectDetailCompo";

export default function ProjectDetailPage({ params }: { params: { lang: string } }) {

  return (
    <div>
      <ProjectDetailCompo params={params} />

    </div>
  )
}