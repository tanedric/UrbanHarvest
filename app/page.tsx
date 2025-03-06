import Link from "next/link"
import { ArrowRight, Leaf, ShoppingBasket, TruckIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import FarmHighlights from "@/components/farm-highlights"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">UrbanHarvest</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/marketplace" className="text-sm font-medium hover:underline underline-offset-4">
              Marketplace
            </Link>
            <Link href="/farms" className="text-sm font-medium hover:underline underline-offset-4">
              Farms
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Browse Products
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fresh Urban Produce, Direct from Farm to Table
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with local urban farms, reduce food waste, and enjoy the freshest produce in your community.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/marketplace">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/farms">
                    <Button variant="outline">View Farms</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Urban farm produce"
                  className="rounded-lg object-cover w-full aspect-video"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  UrbanHarvest connects urban farms with consumers, reducing food waste and supporting local
                  agriculture.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Connect</h3>
                <p className="text-gray-500">
                  Urban farms join our platform to showcase their produce and connect with local customers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <ShoppingBasket className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Shop</h3>
                <p className="text-gray-500">
                  Customers browse and purchase fresh produce directly from nearby urban farms.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <TruckIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Deliver</h3>
                <p className="text-gray-500">
                  Produce is harvested on demand and delivered fresh, minimizing waste and maximizing freshness.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProducts />
        <FarmHighlights />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're an urban farmer or a conscious consumer, be part of the solution to reduce food waste.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register/farm">
                  <Button className="bg-green-600 hover:bg-green-700">Register as a Farm</Button>
                </Link>
                <Link href="/register/customer">
                  <Button variant="outline">Sign Up as a Customer</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 px-4 md:px-6">
          <div className="flex flex-col gap-2 md:gap-4 md:w-1/3">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">UrbanHarvest</span>
            </Link>
            <p className="text-sm text-gray-500">
              Connecting urban farms with consumers to reduce food waste and support local agriculture.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:flex-1 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/marketplace" className="text-gray-500 hover:underline">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/farms" className="text-gray-500 hover:underline">
                    Farms
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-500 hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-500 hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-500 hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-500 hover:underline">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-gray-500">
          <div className="container px-4 md:px-6">© 2025 UrbanHarvest. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

