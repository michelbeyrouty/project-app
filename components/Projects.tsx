import { ProjectCard } from "@/components/ProjectCard";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";

async function getData() {
  await delay(2000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return projects;
}

export default async function Projects() {
  const projects = await getData();

  return projects.map((project) => (
    <div className="w-1/3 p-3" key={project.id}>
      <Link href={`/projects/${project.id}`}>
        <ProjectCard project={project} />
      </Link>
    </div>
  ));
}
