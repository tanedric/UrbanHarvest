"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore, useOrderStore, useReviewStore, type Order } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Package, Truck, CheckCircle } from "lucide-react"

export default function Orders() {
  const { user, isAuthenticated } = useAuthStore()
  const { orders, checkForUpdates } = useOrderStore()
  const { reviews, checkForUpdates: checkReviewUpdates } = useReviewStore()
  const { toast } = useToast()
  const [customerOrders, setCustomerOrders] = useState<Order[]>([])

  // Check if a review exists for an order
  const hasReviewForOrder = (orderId: string) => {
    return reviews.some((review) => review.orderId === orderId)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to view your orders.",
        variant: "destructive",
      })
      return
    }

    // In a real app, we would filter by customer ID
    // For this demo, we'll show all orders when logged in as a customer
    if (user?.role === "customer") {
      setCustomerOrders(orders)
    } else {
      setCustomerOrders([])
    }

    // Set up an interval to check for updates every second
    const intervalId = setInterval(() => {
      if (user?.role === "customer") {
        // Check for updates from other sessions
        checkForUpdates()
        checkReviewUpdates()
        setCustomerOrders([...orders]) // Create a new array to trigger re-render
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isAuthenticated, orders, toast, user, checkForUpdates, checkReviewUpdates])

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">Your Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">Please sign in to view your orders</p>
              <Link href="/signin">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (customerOrders.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">Your Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any orders yet</p>
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
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-8">Your Orders</h1>
        <div className="space-y-6">
          {customerOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-green-50 dark:bg-green-900">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-bold text-green-800 dark:text-green-200">
                      Order from {order.farmName}
                    </CardTitle>
                    <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                  </div>
                  {order.status === "delivered" ? (
                    hasReviewForOrder(order.id) ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm font-medium">
                        Review Submitted
                      </span>
                    ) : (
                      <Link href={`/orders/${order.id}#review`}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">Leave a Review</Button>
                      </Link>
                    )
                  ) : (
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                      >
                        Track Order
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-full max-w-3xl mx-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "placed" || order.status === "dispatched" || order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          <Package className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">Order Placed</span>
                      </div>
                      <div
                        className={`h-1 flex-1 mx-2 ${order.status === "dispatched" || order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`}
                      />
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "dispatched" || order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          <Truck className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">Dispatched</span>
                      </div>
                      <div
                        className={`h-1 flex-1 mx-2 ${order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`}
                      />
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <span className="text-sm mt-2">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.quantity} x {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <span>{order.customerAddress}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

