import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { farms } from "@/lib/data"

export default function FarmHighlights() {
  const highlightedFarms = farms.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Farms</h2>
            <p className="text-gray-500">Meet the urban farmers growing food in your community</p>
          </div>
          <Link href="/farms">
            <Button variant="link" className="gap-1">
              View All Farms
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
          {highlightedFarms.map((farm) => (
            <div key={farm.id} className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />
              <img
                src={farm.coverImage || "/placeholder.svg"}
                alt={farm.name}
                className="h-80 w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">{farm.name}</h3>
                <p className="text-sm text-white/80">{farm.location}</p>
                <p className="mt-2 line-clamp-2 text-sm text-white/80">{farm.description}</p>
                <Button asChild className="mt-4 w-max bg-white text-black hover:bg-white/90">
                  <Link href={`/farms/${farm.id}`}>Visit Farm</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

