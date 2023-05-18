import Link from "next/link";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function ProjectsSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((key) => (
    <div className="w-1/3 p-3" key={key}>
      <Link href={`/home`}>
        <ProjectCardSkeleton />
      </Link>
    </div>
  ));
}
