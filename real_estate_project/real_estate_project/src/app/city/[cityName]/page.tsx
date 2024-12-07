import ProjectList from "@/components/city-data/project-list";


export default async function Page({ params }: { params: { cityName: string } }) {

  return (
    <div className="text-lg font-bold w-full">
      <ProjectList cityName={params.cityName}/>
    </div>
  );
}
