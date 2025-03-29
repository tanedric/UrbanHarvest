import { FarmCard } from "@/components/farm-card"

const farms = [
  {
    name: "Green Roof Gardens",
    description: "Rooftop farm specializing in heirloom tomatoes and leafy greens.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Downtown",
    rating: 4.8,
  },
  {
    name: "Vertical Harvest",
    description: "Indoor vertical farm growing herbs and microgreens year-round.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Westside",
    rating: 4.7,
  },
  {
    name: "Community Roots",
    description: "Community-based farm focusing on culturally diverse vegetables.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Eastside",
    rating: 4.9,
  },
  {
    name: "Sunshine Aquaponics",
    description: "Sustainable farm combining fish and vegetable production.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Northside",
    rating: 4.6,
  },
  {
    name: "Urban Orchard",
    description: "Specializing in dwarf fruit trees and berry bushes for urban settings.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Southside",
    rating: 4.5,
  },
  {
    name: "Bee City Farms",
    description: "Pollinator-friendly farm producing honey and bee-pollinated crops.",
    image: "/placeholder.svg?height=200&width=300",
    location: "Downtown",
    rating: 4.9,
  },
]

export default function Farms() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-200">
                  Our Urban Farms
                </h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the innovative urban farms in your area that are revolutionizing local food production. Each
                  farm has its own unique growing methods and specialty crops.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {farms.map((farm) => (
                <FarmCard
                  key={farm.name}
                  name={farm.name}
                  description={farm.description}
                  image={farm.image}
                  location={farm.location}
                  rating={farm.rating}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

