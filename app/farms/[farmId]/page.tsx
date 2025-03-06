import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, MessageSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { farms, products } from "@/lib/data"
import { notFound } from "next/navigation"
import ProductCard from "@/components/product-card"

export default function FarmPage({ params }: { params: { farmId: string } }) {
  const farm = farms.find((f) => f.id === params.farmId)

  if (!farm) {
    notFound()
  }

  const farmProducts = products.filter((p) => p.farmId === farm.id)

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <Link
        href="/farms"
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Farms
      </Link>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12">
        <div>
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
            <img src={farm.coverImage || "/placeholder.svg"} alt={farm.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="text-sm font-medium">
                    {farm.rating} ({farm.reviewCount} reviews)
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{farm.location}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{farm.name}</h1>
              <p className="text-gray-500">{farm.description}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Established</p>
                  <p className="text-sm text-gray-500">{farm.established}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-sm text-gray-500">{farm.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Distance</p>
                  <p className="text-sm text-gray-500">{farm.distance} miles away</p>
                </div>
              </div>
            </div>
            <Separator />
            <Tabs defaultValue="products">
              <TabsList>
                <TabsTrigger value="products">Products ({farmProducts.length})</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({farm.reviewCount})</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="space-y-6 pt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {farmProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="about" className="space-y-4 pt-6">
                <h2 className="text-xl font-semibold">About {farm.name}</h2>
                <p className="text-gray-500">{farm.longDescription}</p>
                <h3 className="text-lg font-semibold">Growing Methods</h3>
                <p className="text-gray-500">{farm.growingMethods}</p>
                <h3 className="text-lg font-semibold">Sustainability Practices</h3>
                <p className="text-gray-500">{farm.sustainabilityPractices}</p>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6 pt-6">
                <div className="space-y-4">
                  {farm.reviews.map((review, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-4 w-4 fill-amber-500" />
                          <span className="font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-500">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">Contact Farm</h2>
            <p className="mt-2 text-sm text-gray-500">
              Have questions about products or want to arrange a visit? Send a message to {farm.name}.
            </p>
            <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Farm
            </Button>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Farm Location</h2>
            <div className="mt-4 h-[200px] w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Map location"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">{farm.address}</p>
            <Button variant="outline" className="mt-4 w-full">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

