"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore, useOrderStore, useReviewStore, type Order } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Package, Truck, CheckCircle, Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function OrderDetail() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuthStore()
  const { orders } = useOrderStore()
  const { reviews, addReview } = useReviewStore()

  const [order, setOrder] = useState<Order | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const orderId = params.id as string

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to view order details.",
        variant: "destructive",
      })
      return
    }

    const foundOrder = orders.find((o) => o.id === orderId)
    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      toast({
        title: "Order not found",
        description: "The order you're looking for doesn't exist.",
        variant: "destructive",
      })
      router.push("/orders")
    }
  }, [isAuthenticated, orderId, orders, router, toast])

  const hasReviewed = reviews.some((review) => review.orderId === orderId)

  const handleSubmitReview = () => {
    if (!order) return

    setIsSubmitting(true)

    addReview({
      orderId: order.id,
      farmId: order.farmId,
      farmName: order.farmName,
      customerName: user?.name || "Anonymous",
      rating,
      comment,
    })

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })

    setIsSubmitting(false)
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">Loading order details...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/orders">
            <Button variant="ghost" className="text-green-600">
              ← Back to Orders
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-200">
              Order from {order.farmName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-8">
              <div className="w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === "placed" || order.status === "dispatched" || order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <Package className="h-6 w-6" />
                    </div>
                    <span className="text-sm mt-2">Order Placed</span>
                  </div>
                  <div
                    className={`h-1 flex-1 mx-2 ${order.status === "dispatched" || order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`}
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === "dispatched" || order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <Truck className="h-6 w-6" />
                    </div>
                    <span className="text-sm mt-2">Dispatched</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`} />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <span className="text-sm mt-2">Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Order Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Items</h4>
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
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <span>{order.customerAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Delivery Tracking</h3>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  {/* This would be a real map in a production app */}
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full" style={{ top: "40%", left: "30%" }}>
                      <span className="absolute -top-8 -left-12 bg-white dark:bg-gray-900 px-2 py-1 rounded text-xs">
                        Your location
                      </span>
                    </div>
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full" style={{ top: "60%", left: "70%" }}>
                      <span className="absolute -top-8 -left-12 bg-white dark:bg-gray-900 px-2 py-1 rounded text-xs">
                        Farm location
                      </span>
                    </div>
                    <div className="text-gray-500">Interactive map would appear here</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Current Status:{" "}
                    <span className="font-medium text-green-600">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </p>
                  <p>Last Updated: {new Date(order.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {order.status === "delivered" && !hasReviewed && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800 dark:text-green-200">Leave a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Rating</h4>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Your Review</h4>
                  <Textarea
                    placeholder="Share your experience with this farm and their products..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || !comment}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

