import { PageSkeleton } from "@/components/ui/loading-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <PageSkeleton />
      </div>
    </div>
  )
}
