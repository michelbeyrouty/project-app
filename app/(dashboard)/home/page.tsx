import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingSkeleton";
import Projects from "@/components/Projects";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import TaskCard from "@/components/TaskCard";
import NewProject from "@/components/NewProject";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getProjectCount() {
  await delay(2000);
  const user = await getUserFromCookie(cookies());

  return await db.project.count({
    where: {
      ownerId: user?.id,
    },
  });
}

export default async function Page() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-full px-5 pt-2">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          <Suspense
            fallback={<ProjectsSkeleton count={await getProjectCount()} />}
          >
            <Projects />
          </Suspense>
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
