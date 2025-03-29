"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { useCartStore, useAuthStore, useOrderStore, type CartItem } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const { createOrder } = useOrderStore()
  const { toast } = useToast()
  const router = useRouter()

  const [address, setAddress] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 5.99 : 0
  const total = subtotal + shipping

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(item.id, newQuantity)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in before checking out.",
        variant: "destructive",
      })
      router.push("/signin")
      return
    }

    if (!address) {
      toast({
        title: "Address required",
        description: "Please enter your delivery address.",
        variant: "destructive",
      })
      return
    }

    setIsCheckingOut(true)

    // Group items by farm
    const itemsByFarm = items.reduce(
      (acc, item) => {
        if (!acc[item.farm]) {
          acc[item.farm] = []
        }
        acc[item.farm].push(item)
        return acc
      },
      {} as Record<string, CartItem[]>,
    )

    // Create an order for each farm
    Object.entries(itemsByFarm).forEach(([farmName, farmItems]) => {
      const farmTotal = farmItems.reduce((total, item) => total + item.price * item.quantity, 0)

      createOrder({
        items: farmItems,
        total: farmTotal,
        status: "placed",
        customerName: user?.name || "Guest",
        customerAddress: address,
        farmId: farmName.toLowerCase().replace(/\s+/g, "-"),
        farmName: farmName,
        customerLocation: {
          lat: 40.7128, // New York coordinates as example
          lng: -74.006,
        },
      })
    })

    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be processed soon.",
    })

    clearCart()
    router.push("/orders")
    setIsCheckingOut(false)
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">Your Cart</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
              <Link href="/marketplace">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                    <div className="w-20 h-20 rounded overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">From {item.farm}</p>
                      <p className="text-green-600 dark:text-green-400">
                        ${item.price.toFixed(2)} / {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-right w-24">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800 dark:text-green-200">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="space-y-2 pt-4">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

