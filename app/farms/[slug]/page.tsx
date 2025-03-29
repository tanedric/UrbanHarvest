"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import { StarIcon, MapPin, Phone, Mail } from "lucide-react"
import { useFarmStore } from "@/lib/store"

export default function FarmDetail() {
  const params = useParams()
  const slug = params.slug as string
  const { getFarmBySlug, getProductsByFarm } = useFarmStore()

  const farm = getFarmBySlug(slug)
  const products = getProductsByFarm(slug)

  if (!farm) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Farm not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The farm you're looking for doesn't exist.</p>
            <Link href="/farms">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Back to Farms</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-200">
                  {farm.name}
                </h1>
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">{farm.rating}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">({farm.reviewCount} reviews)</span>
                </div>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {farm.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span>{farm.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="h-5 w-5" />
                    <span>{farm.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5" />
                    <span>{farm.email}</span>
                  </div>
                </div>
              </div>
              <img
                alt={farm.name}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src={farm.image || "/placeholder.svg?height=550&width=800"}
                width="800"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800 dark:text-green-200">
                  Our Products
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Browse our selection of fresh, locally grown produce harvested to order.
                </p>
              </div>
            </div>

            {products.length > 0 ? (
                  <div className="w-full mt-8">

<div className="grid gap-6 mt-8 px-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))` }}>
{products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    unit={product.unit}
                    farm={farm.name}
                    image={product.image}
                  />
                ))}
              </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No products available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800 dark:text-green-200">
                  About Our Farm
                </h2>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Our Story</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{farm.story}</p>
                  <h3 className="text-xl font-bold mb-4">Growing Methods</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{farm.growingMethods}</p>
                  <h3 className="text-xl font-bold mb-4">Sustainability Practices</h3>
                  <p className="text-gray-600 dark:text-gray-400">{farm.sustainabilityPractices}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

