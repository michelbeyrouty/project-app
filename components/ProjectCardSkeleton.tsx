import Card from "./Card";

export default function ProjectCardSkeleton() {
  return (
    <Card className="!px-6 !py-8">
      <div className="animate-pulse">
        <div className="space-y-8 py-1">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="space-y-12">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
              <div className="h-2 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
