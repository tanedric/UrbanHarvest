import { create } from "zustand"
import { persist } from "zustand/middleware"

// Add a timestamp to localStorage keys to prevent session bleeding between browsers
const SESSION_ID = Date.now().toString()

export interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  farm: string
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            return {
              items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
            }
          }

          return { items: [...state.items, item] }
        }),
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: `cart-storage-${SESSION_ID}`,
    },
  ),
)

// User store for authentication
interface User {
  id: string
  name: string
  email: string
  role: "customer" | "farmer"
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Dummy users for testing
const dummyUsers = [
  {
    id: "1",
    name: "John Customer",
    email: "customer@example.com",
    password: "password123",
    role: "customer" as const,
  },
  {
    id: "2",
    name: "Green Roof Gardens",
    email: "farm@example.com",
    password: "farm123",
    role: "farmer" as const,
  },
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const user = dummyUsers.find((u) => u.email === email && u.password === password)

            if (user) {
              const { password, ...userWithoutPassword } = user
              set({
                user: userWithoutPassword,
                isAuthenticated: true,
              })
              resolve()
            } else {
              reject(new Error("Invalid email or password"))
            }
          }, 500)
        })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: `auth-storage-${SESSION_ID}`,
    },
  ),
)

// Order store
export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "placed" | "dispatched" | "delivered"
  customerName: string
  customerAddress: string
  createdAt: Date
  updatedAt: Date
  farmId: string
  farmName: string
  customerLocation: {
    lat: number
    lng: number
  }
  currentLocation?: {
    lat: number
    lng: number
  }
}

interface OrderStore {
  orders: Order[]
  lastUpdated: number
  createOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => Order
  updateOrderStatus: (orderId: string, status: Order["status"], currentLocation?: { lat: number; lng: number }) => void
  getOrdersByFarm: (farmId: string) => Order[]
  getCustomerOrders: (customerId: string) => Order[]
  checkForUpdates: () => void
}

// Create a shared storage key for orders that will be the same across all sessions
const SHARED_ORDERS_KEY = "shared-orders-storage"

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      lastUpdated: Date.now(),
      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set((state) => ({
          orders: [...state.orders, newOrder],
          lastUpdated: Date.now(),
        }))

        return newOrder
      },
      updateOrderStatus: (orderId, status, currentLocation) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  updatedAt: new Date(),
                  currentLocation: currentLocation || order.currentLocation,
                }
              : order,
          ),
          lastUpdated: Date.now(),
        }))
      },
      getOrdersByFarm: (farmId) => {
        return get().orders.filter((order) => order.farmId === farmId)
      },
      getCustomerOrders: (customerId) => {
        // In a real app, we would filter by customer ID
        // For this demo, we'll return all orders since we don't have customer IDs
        return get().orders
      },
      checkForUpdates: () => {
        // Check localStorage for updates from other sessions
        try {
          const storedData = localStorage.getItem(SHARED_ORDERS_KEY)
          if (storedData) {
            const parsedData = JSON.parse(storedData)
            if (parsedData.state && parsedData.state.lastUpdated > get().lastUpdated) {
              // Only update if the stored data is newer
              set({
                orders: parsedData.state.orders,
                lastUpdated: parsedData.state.lastUpdated,
              })
            }
          }
        } catch (error) {
          console.error("Error checking for updates:", error)
        }
      },
    }),
    {
      name: SHARED_ORDERS_KEY,
    },
  ),
)

// Review store
export interface Review {
  id: string
  orderId: string
  farmId: string
  farmName: string
  customerName: string
  rating: number
  comment: string
  createdAt: Date
  sentiment?: "positive" | "neutral" | "negative"
}

interface ReviewStore {
  reviews: Review[]
  lastUpdated: number
  addReview: (review: Omit<Review, "id" | "createdAt">) => void
  getFarmReviews: (farmId: string) => Review[]
  checkForUpdates: () => void
}

// Create a shared storage key for reviews that will be the same across all sessions
const SHARED_REVIEWS_KEY = "shared-reviews-storage"

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      lastUpdated: Date.now(),
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}`,
          createdAt: new Date(),
        }

        set((state) => ({
          reviews: [...state.reviews, newReview],
          lastUpdated: Date.now(),
        }))
      },
      getFarmReviews: (farmId) => {
        return get().reviews.filter((review) => review.farmId === farmId)
      },
      checkForUpdates: () => {
        // Check localStorage for updates from other sessions
        try {
          const storedData = localStorage.getItem(SHARED_REVIEWS_KEY)
          if (storedData) {
            const parsedData = JSON.parse(storedData)
            if (parsedData.state && parsedData.state.lastUpdated > get().lastUpdated) {
              // Only update if the stored data is newer
              set({
                reviews: parsedData.state.reviews,
                lastUpdated: parsedData.state.lastUpdated,
              })
            }
          }
        } catch (error) {
          console.error("Error checking for updates:", error)
        }
      },
    }),
    {
      name: SHARED_REVIEWS_KEY,
    },
  ),
)

// Farm store with dummy data
export interface Farm {
  id: string
  name: string
  slug: string
  description: string
  image: string
  location: string
  address: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  story: string
  growingMethods: string
  sustainabilityPractices: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  unit: string
  farmId: string
  image: string
}

interface FarmStore {
  farms: Farm[]
  products: Product[]
  getFarmBySlug: (slug: string) => Farm | undefined
  getProductsByFarm: (farmSlug: string) => Product[]
}

// Dummy farms data
const dummyFarms: Farm[] = [
  {
    id: "1",
    name: "Green Roof Gardens",
    slug: "green-roof-gardens",
    description: "Rooftop farm specializing in heirloom tomatoes and leafy greens.",
    image: "/placeholder.svg?height=550&width=800",
    location: "Downtown",
    address: "123 Rooftop Ave, Downtown, City",
    phone: "(555) 123-4567",
    email: "farm@example.com",
    rating: 4.8,
    reviewCount: 42,
    story:
      "Green Roof Gardens started in 2015 when we transformed an unused rooftop into a thriving urban farm. Our mission is to bring fresh, locally grown produce to city dwellers while reducing the urban heat island effect and creating green spaces in the concrete jungle.",
    growingMethods:
      "We use a combination of container gardening and raised beds with organic soil mixes specifically formulated for rooftop conditions. Our irrigation system collects and reuses rainwater, minimizing our environmental impact.",
    sustainabilityPractices:
      "We compost all plant waste on-site, use solar panels to power our equipment, and deliver all produce within a 3-mile radius using electric cargo bikes to minimize our carbon footprint.",
  },
  {
    id: "2",
    name: "Vertical Harvest",
    slug: "vertical-harvest",
    description: "Indoor vertical farm growing herbs and microgreens year-round.",
    image: "/placeholder.svg?height=550&width=800",
    location: "Westside",
    address: "456 Innovation Blvd, Westside, City",
    phone: "(555) 987-6543",
    email: "info@verticalharvestfarm.com",
    rating: 4.7,
    reviewCount: 38,
    story:
      "Vertical Harvest was founded by a team of engineers and plant scientists who wanted to revolutionize urban agriculture. Our state-of-the-art vertical farming system allows us to grow fresh produce year-round regardless of weather conditions.",
    growingMethods:
      "We use hydroponic systems with LED lighting optimized for plant growth. Our vertical setup allows us to grow 20 times more food per square foot than traditional farming while using 95% less water.",
    sustainabilityPractices:
      "Our facility runs on 100% renewable energy, and we've eliminated the need for pesticides through careful environmental controls and beneficial insects for pest management.",
  },
  {
    id: "3",
    name: "Community Roots",
    slug: "community-roots",
    description: "Community-based farm focusing on culturally diverse vegetables.",
    image: "/placeholder.svg?height=550&width=800",
    location: "Eastside",
    address: "789 Neighborhood St, Eastside, City",
    phone: "(555) 456-7890",
    email: "hello@communityroots.org",
    rating: 4.9,
    reviewCount: 56,
    story:
      "Community Roots began as a neighborhood initiative to transform vacant lots into productive gardens. Today, we're a thriving urban farm that celebrates the cultural diversity of our community by growing vegetables used in cuisines from around the world.",
    growingMethods:
      "We practice intensive organic farming methods, including companion planting, crop rotation, and season extension techniques. Our seeds are sourced from local seed savers and heirloom varieties.",
    sustainabilityPractices:
      "We engage the community through volunteer programs, workshops, and a sliding-scale CSA program that ensures everyone in our neighborhood has access to fresh, healthy food regardless of income.",
  },
]

// Dummy products data
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Heirloom Tomatoes",
    description: "Colorful mix of heritage tomato varieties.",
    price: 4.99,
    unit: "lb",
    farmId: "green-roof-gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Organic Carrots",
    description: "Sweet and crunchy carrots grown without pesticides.",
    price: 3.29,
    unit: "bunch",
    farmId: "green-roof-gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    name: "Bell Peppers",
    description: "Colorful sweet peppers perfect for salads or cooking.",
    price: 1.99,
    unit: "each",
    farmId: "green-roof-gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Fresh Basil",
    description: "Aromatic basil grown in vertical systems.",
    price: 2.99,
    unit: "bunch",
    farmId: "vertical-harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    name: "Microgreens Mix",
    description: "Nutrient-dense assortment of young seedlings.",
    price: 5.99,
    unit: "box",
    farmId: "vertical-harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    name: "Fresh Mint",
    description: "Aromatic mint for teas, cocktails, and cooking.",
    price: 2.49,
    unit: "bunch",
    farmId: "vertical-harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Baby Bok Choy",
    description: "Tender Asian greens harvested young.",
    price: 3.49,
    unit: "bundle",
    farmId: "community-roots",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    name: "Butterhead Lettuce",
    description: "Tender lettuce with a buttery texture.",
    price: 2.79,
    unit: "head",
    farmId: "community-roots",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "9",
    name: "Japanese Cucumbers",
    description: "Crisp, thin-skinned cucumbers with few seeds.",
    price: 3.99,
    unit: "lb",
    farmId: "community-roots",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const useFarmStore = create<FarmStore>()((set, get) => ({
  farms: dummyFarms,
  products: dummyProducts,
  getFarmBySlug: (slug) => {
    return get().farms.find((farm) => farm.slug === slug)
  },
  getProductsByFarm: (slug) => {
    return get().products.filter((product) => product.farmId === slug)
  },
}))

