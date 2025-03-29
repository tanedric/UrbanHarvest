"use client"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore, useReviewStore, useOrderStore } from "@/lib/store"
import { Star } from "lucide-react"

// Helper functions for sentiment analysis
function getSentiment(review: any) {
  if (review.rating >= 4) {
    return "Positive"
  } else if (review.rating >= 3) {
    return "Neutral"
  } else {
    return "Negative"
  }
}

function getSentimentClass(review: any) {
  if (review.rating >= 4) {
    return "bg-green-100 text-green-800"
  } else if (review.rating >= 3) {
    return "bg-blue-100 text-blue-800"
  } else {
    return "bg-red-100 text-red-800"
  }
}

export function ReviewManagement() {
  const { user } = useAuthStore()
  const { reviews } = useReviewStore()
  const { orders } = useOrderStore()

  // Filter reviews for this farm
  const farmReviews = reviews.filter(
    (review) => review.farmId === (user?.name || "").toLowerCase().replace(/\s+/g, "-"),
  )

  // Get order for a review
  const getReviewOrder = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  if (farmReviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">No reviews yet</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate average rating
  const averageRating = farmReviews.reduce((sum, review) => sum + review.rating, 0) / farmReviews.length

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {farmReviews.map((review) => {
            const order = getReviewOrder(review.orderId)

            return (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.customerName}</p>
                      <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      {order && (
                        <Link
                          href={`/farm-dashboard/orders/${order.id}`}
                          className="text-sm text-green-600 hover:underline"
                        >
                          View Order #{order.id.split("-")[1]}
                        </Link>
                      )}
                    </div>
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
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentClass(
                        review,
                      )}`}
                    >
                      {getSentiment(review)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {farmReviews
            .filter((review) => getSentiment(review) === "Positive")
            .map((review) => {
              const order = getReviewOrder(review.orderId)

              return (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        {order && (
                          <Link
                            href={`/farm-dashboard/orders/${order.id}`}
                            className="text-sm text-green-600 hover:underline"
                          >
                            View Order #{order.id.split("-")[1]}
                          </Link>
                        )}
                      </div>
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
                  </CardContent>
                </Card>
              )
            })}
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          {farmReviews
            .filter((review) => getSentiment(review) === "Neutral")
            .map((review) => {
              const order = getReviewOrder(review.orderId)

              return (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        {order && (
                          <Link
                            href={`/farm-dashboard/orders/${order.id}`}
                            className="text-sm text-green-600 hover:underline"
                          >
                            View Order #{order.id.split("-")[1]}
                          </Link>
                        )}
                      </div>
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
                  </CardContent>
                </Card>
              )
            })}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {farmReviews
            .filter((review) => getSentiment(review) === "Negative")
            .map((review) => {
              const order = getReviewOrder(review.orderId)

              return (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        {order && (
                          <Link
                            href={`/farm-dashboard/orders/${order.id}`}
                            className="text-sm text-green-600 hover:underline"
                          >
                            View Order #{order.id.split("-")[1]}
                          </Link>
                        )}
                      </div>
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
                  </CardContent>
                </Card>
              )
            })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

