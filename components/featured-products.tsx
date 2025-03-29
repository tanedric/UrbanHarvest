import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-gray-500">Fresh, seasonal produce from urban farms near you</p>
          </div>
          <Link href="/marketplace">
            <Button variant="link" className="gap-1">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            unit={product.unit}
            farm={product.farm}
            image={product.image} />
          ))}
        </div>
      </div>
    </section>
  )
}

