import Card from "./Card";

// To clean up

export default function ProjectsSkeleton() {
  return [1, 2, 3, 4, 5, 6].map((key) => (
    <Card key={key} className="!px-6 !py-8 w-1/3 p-3">
      <div className="animate-pulse">
        <div className="space-y-6 py-1">
          <div className="h-2 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-300 rounded col-span-2"></div>
              <div className="h-2 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </Card>
  ));
}
