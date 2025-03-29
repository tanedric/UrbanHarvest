"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  unit: string
  farm: string
  image: string
}

export function ProductCard({ id, name, description, price, unit, farm, image }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      unit,
      farm,
      image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <img
        alt={name}
        className="aspect-[4/3] w-full object-cover"
        height={300}
        src={image || "/placeholder.svg"}
        width={400}
      />
      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          From <span className="font-medium text-green-600 dark:text-green-400">{farm}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-green-800 dark:text-green-200">
            ${price.toFixed(2)} <span className="text-sm font-normal">/ {unit}</span>
          </div>
          <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 text-white">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

