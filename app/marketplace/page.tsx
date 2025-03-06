import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import FilterSidebar from "@/components/filter-sidebar"

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
            <p className="text-gray-500">Browse fresh produce from urban farms in your area</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search products..." className="w-full rounded-md pl-8 md:w-[300px]" />
            </div>
            <Button variant="outline" size="icon" className="md:hidden">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] lg:gap-10">
          <FilterSidebar className="hidden md:block" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

