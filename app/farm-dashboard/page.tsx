"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore, useOrderStore, useReviewStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Package, Star, CheckCircle } from "lucide-react"
import { OrderManagement } from "@/components/order-management"
import { ReviewManagement } from "@/components/review-management"

// Helper functions for sentiment analysis
function analyzeSentiment(reviews: any[]) {
  // This would connect to a Python backend in a real app
  // For demo purposes, we'll use a simple algorithm based on rating

  let positive = 0
  let neutral = 0
  let negative = 0

  reviews.forEach((review) => {
    if (review.rating >= 4) {
      positive++
    } else if (review.rating >= 3) {
      neutral++
    } else {
      negative++
    }
  })

  const total = reviews.length || 1 // Avoid division by zero

  return {
    positive: Math.round((positive / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    negative: Math.round((negative / total) * 100),
  }
}

export default function FarmDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const { orders, checkForUpdates } = useOrderStore()
  const { reviews, checkForUpdates: checkReviewUpdates } = useReviewStore()
  const { toast } = useToast()
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  // Filter orders for this farm
  const farmId = (user?.name || "").toLowerCase().replace(/\s+/g, "-")
  const farmOrders = orders.filter((order) => order.farmId === farmId)

  // Active orders (placed or dispatched)
  const activeOrders = farmOrders.filter((order) => order.status === "placed" || order.status === "dispatched")

  // Completed orders (delivered)
  const completedOrders = farmOrders.filter((order) => order.status === "delivered")

  // Farm reviews
  const farmReviews = reviews.filter((review) => review.farmId === farmId)

  // Calculate sentiment percentages
  const sentimentAnalysis = analyzeSentiment(farmReviews)

  // Calculate average rating
  const averageRating =
    farmReviews.length > 0 ? farmReviews.reduce((sum, review) => sum + review.rating, 0) / farmReviews.length : 0

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to access the farm dashboard.",
        variant: "destructive",
      })
      router.push("/signin")
      return
    }

    if (user?.role !== "farmer") {
      toast({
        title: "Access denied",
        description: "Only farm accounts can access this dashboard.",
        variant: "destructive",
      })
      router.push("/")
    }

    // Set up an interval to check for updates every second
    const intervalId = setInterval(() => {
      if (user?.role === "farmer") {
        // Check for updates from other sessions
        checkForUpdates()
        checkReviewUpdates()
        // Force a re-render by updating the refresh key
        setRefreshKey((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isAuthenticated, router, toast, user, checkForUpdates, checkReviewUpdates])

  if (!isAuthenticated || user?.role !== "farmer") {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-12">
          <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">Redirecting...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Farm Dashboard</h1>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Products</CardTitle>
              <CardDescription>Your current inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Active Orders</CardTitle>
              <CardDescription>Orders being processed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activeOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Average Rating</CardTitle>
              <CardDescription>Based on customer reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</p>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sentiment Analysis Card - Full Width */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Sentiment Analysis</CardTitle>
            <CardDescription>Customer feedback sentiment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-600">Positive</span>
                  <span className="text-sm font-medium text-green-600">{sentimentAnalysis.positive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${sentimentAnalysis.positive}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-blue-600">Neutral</span>
                  <span className="text-sm font-medium text-blue-600">{sentimentAnalysis.neutral}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${sentimentAnalysis.neutral}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-red-600">Negative</span>
                  <span className="text-sm font-medium text-red-600">{sentimentAnalysis.negative}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{ width: `${sentimentAnalysis.negative}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active-orders">
          <TabsList className="mb-6">
            <TabsTrigger value="active-orders" className="text-base">
              <Package className="mr-2 h-4 w-4" /> Active Orders
            </TabsTrigger>
            <TabsTrigger value="completed-orders" className="text-base">
              <CheckCircle className="mr-2 h-4 w-4" /> Completed Orders
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base">
              <Star className="mr-2 h-4 w-4" /> Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active-orders">
            <OrderManagement filterStatus={["placed", "dispatched"]} key={`active-${refreshKey}`} />
          </TabsContent>
          <TabsContent value="completed-orders">
            <OrderManagement filterStatus={["delivered"]} key={`completed-${refreshKey}`} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewManagement key={`reviews-${refreshKey}`} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

