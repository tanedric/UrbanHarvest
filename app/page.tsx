import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FarmCard } from "@/components/farm-card"
import ProductCard from "@/components/product-card"
import { dummyFarms } from "@/lib/store"
import FeaturedProducts from "@/components/featured-products"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-200">
                  Fresh Produce from Urban Farms to Your Table
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Connect directly with local urban farms. Get fresh, sustainable produce delivered to your doorstep
                  while supporting local agriculture and reducing food waste.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/marketplace">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Browse Products</Button>
                  </Link>
                  <Link href="/farms">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      Explore Farms
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                alt="Urban Farm"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="https://hips.hearstapps.com/hmg-prod/images/cheerful-young-asian-woman-receiving-a-box-full-of-royalty-free-image-1686340421.jpg"
                width="800"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              {/* <div className="space-y-2"> */}
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  Featured Farms
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-200">
                  Meet Our Urban Farmers
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Discover the passionate urban farmers who are revolutionizing local food production and bringing fresh
                  produce to your neighborhood.
                </p>
              {/* </div> */}
            </div><br />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dummyFarms.map((farm) => (
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
            <div className="flex justify-center mt-8">
              <Link href="/farms">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                >
                  View All Farms
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  Featured Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-200">
                  Seasonal Highlights
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Explore our current selection of fresh, seasonal produce from local urban farms.
                </p>
              </div>
            </div>
            <FeaturedProducts />
            <div className="flex justify-center mt-8">
              <Link href="/marketplace">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Browse All Products</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <img
                alt="Food Waste Reduction"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                // height="550"
                src="/lastImage.png"
                // width="800"
              />
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-300">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-200">
                  Reducing Food Waste Through Direct Connections
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  By connecting urban farms directly with consumers, we eliminate middlemen, reduce transportation
                  distances, and ensure produce is harvested only when needed. This approach significantly reduces food
                  waste while providing you with the freshest possible produce.
                </p>
                {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

