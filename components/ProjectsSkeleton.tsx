import Link from "next/link";
import Card from "./Card";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

// To clean up

export default function ProjectsSkeleton() {
  return [1, 2, 3, 4, 5, 6].map((key) => (
    <div className="w-1/3 p-3" key={key}>
      <Link href={`/home`}>
        <ProjectCardSkeleton />
      </Link>
    </div>
  ));
}
