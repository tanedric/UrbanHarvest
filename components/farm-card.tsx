import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"

interface FarmCardProps {
  name: string
  description: string
  image: string
  location: string
  rating: number
}

export function FarmCard({ name, description, image, location, rating }: FarmCardProps) {
  return (
    <Link href={`/farms/${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <img
          alt={name}
          className="aspect-[4/3] w-full object-cover"
          height={300}
          src={image || "/placeholder.svg"}
          width={400}
        />
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">{name}</h3>
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg
              className=" mr-1 h-4 w-4"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

