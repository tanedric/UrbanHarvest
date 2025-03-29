"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore, useOrderStore, useReviewStore, type Order } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { Package, Truck, CheckCircle, MapPin, Star } from "lucide-react"
import Link from "next/link"

interface OrderManagementProps {
  filterStatus?: Array<"placed" | "dispatched" | "delivered">
}

export function OrderManagement({ filterStatus }: OrderManagementProps) {
  const { user } = useAuthStore()
  const { orders, updateOrderStatus } = useOrderStore()
  const { reviews } = useReviewStore()
  const { toast } = useToast()

  // Filter orders for this farm
  const farmOrders = orders.filter((order) => order.farmId === (user?.name || "").toLowerCase().replace(/\s+/g, "-"))

  // Apply status filter if provided
  const filteredOrders = filterStatus ? farmOrders.filter((order) => filterStatus.includes(order.status)) : farmOrders

  const handleUpdateStatus = (order: Order, newStatus: Order["status"]) => {
    // Generate a random location near the customer for tracking
    const customerLat = order.customerLocation.lat
    const customerLng = order.customerLocation.lng

    // Random offset to simulate movement (within ~1-2 miles)
    const latOffset = (Math.random() - 0.5) * 0.03
    const lngOffset = (Math.random() - 0.5) * 0.03

    const currentLocation = {
      lat: customerLat + latOffset,
      lng: customerLng + lngOffset,
    }

    updateOrderStatus(order.id, newStatus, currentLocation)

    toast({
      title: "Order updated",
      description: `Order status changed to ${newStatus}`,
    })
  }

  // Get review for an order
  const getOrderReview = (orderId: string) => {
    return reviews.find((review) => review.orderId === orderId)
  }

  if (filteredOrders.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">No orders found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {filteredOrders.map((order) => {
        const review = getOrderReview(order.id)

        return (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">Order #{order.id.split("-")[1]}</h3>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} by {order.customerName}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === "placed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "dispatched"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Delivery Information</h4>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <span>{order.customerAddress}</span>
                  </div>

                  <div className="space-x-2 mt-4">
                    {order.status === "placed" && (
                      <Button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        onClick={() => handleUpdateStatus(order, "dispatched")}
                      >
                        Mark as Dispatched
                      </Button>
                    )}

                    {order.status === "dispatched" && (
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleUpdateStatus(order, "delivered")}
                      >
                        Mark as Delivered
                      </Button>
                    )}

                    {order.status === "delivered" && (
                      <Link href={`/farm-dashboard/orders/${order.id}`}>
                        <Button
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                        >
                          View Details
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Show review if order is delivered and has a review */}
              {order.status === "delivered" && review && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-2">Customer Review</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{review.customerName}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

