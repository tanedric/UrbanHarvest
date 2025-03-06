import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import FarmCard from "@/components/farm-card"
import { farms } from "@/lib/data"

export default function FarmsPage() {
  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Urban Farms</h1>
          <p className="text-gray-500">Discover and connect with local urban farms in your community</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search farms..." className="w-full rounded-md pl-8 md:w-[300px]" />
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {farms.map((farm) => (
          <FarmCard key={farm.id} farm={farm} />
        ))}
      </div>
    </div>
  )
}

