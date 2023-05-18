import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingSkeleton";
import Projects from "@/components/Projects";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-full px-5">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          <Suspense fallback={<ProjectsSkeleton />}>
            <Projects />
          </Suspense>
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
}
