import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Farm } from "@/lib/types"

interface FarmCardProps {
  farm: Farm
}

export default function FarmCard({ farm }: FarmCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <img src={farm.coverImage || "/placeholder.svg"} alt={farm.name} className="h-full w-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <span className="text-sm font-medium">{farm.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">{farm.distance} miles</span>
            </div>
          </div>
          <Link href={`/farms/${farm.id}`}>
            <h3 className="font-semibold">{farm.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 line-clamp-2">{farm.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline" size="sm">
          <Link href={`/farms/${farm.id}`}>View Farm</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

