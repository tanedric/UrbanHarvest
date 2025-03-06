import Link from "next/link"
import { Leaf, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/marketplace/${product.id}`}>
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-48 w-full object-cover" />
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Link
            href={`/farms/${product.farmId}`}
            className="inline-flex items-center gap-1 text-green-600 hover:underline"
          >
            <Leaf className="h-3 w-3" />
            <span className="text-xs font-medium">{product.farmName}</span>
          </Link>
          <Link href={`/marketplace/${product.id}`}>
            <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-between">
            <p className="font-medium text-green-600">
              ${product.price.toFixed(2)} / {product.unit}
            </p>
            <p className="text-xs text-gray-500">{product.distance} miles</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

