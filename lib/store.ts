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
    name: "Ms LAU",
    email: "ymlau@smu.edu.sg",
    password: "password123",
    role: "customer" as const,
  },
  {
    id: "2",
    name: "Citiponics Urban Vertical Farm",
    email: "sales@citiponics.com",
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
  farm: string

}

interface FarmStore {
  farms: Farm[]
  products: Product[]
  getFarmBySlug: (slug: string) => Farm | undefined
  getProductsByFarm: (farmSlug: string) => Product[]
}

// Dummy farms data
export const dummyFarms: Farm[] = [
  {
    id: "1",
    name: "Citiponics Urban Vertical Farm",
    slug: "citiponics-urban-vertical-farm",
    description: "Rooftop farm specializing in heirloom tomatoes and leafy greens.",
    image: "https://vulcanpost.com/wp-content/uploads/2020/06/Danielle-2.jpg",
    location: "Downtown",
    address: "700 Ang Mo Kio Ave 6, Level 6 Multi-Storey Carpark, Singapore 560700",
    phone: "+65 9777 0520",
    email: "sales@citiponics.com",
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
    name: "Com Crop",
    slug: "com-crop",
    description: "Indoor vertical farm growing herbs and microgreens year-round.",
    image: "https://psdchallenge.psd.gov.sg/images/default-source/challenge-library/Article-Image/challenge-2015-jul-013.jpg",
    location: "Westside",
    address: "456 Innovation Blvd, Westside, City",
    phone: "(555) 987-6543",
    email: "info@verticalharvestfarm.com",
    rating: 4.7,
    reviewCount: 38,
    story:
      "Com Crop was founded by a team of engineers and plant scientists who wanted to revolutionize urban agriculture. Our state-of-the-art vertical farming system allows us to grow fresh produce year-round regardless of weather conditions.",
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
    image: "https://www.hometeamns.sg/frontline/wp-content/uploads/2024/03/How-to-start-the-urban-farming-movement-Hero.jpg",
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
export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Heirloom Tomatoes",
    description: "Colorful mix of heritage tomato varieties.",
    price: 4.99,
    unit: "lb",
    farmId: "citiponics-urban-vertical-farm",
    farm: "Citiponics Urban Vertical Farm",
    image: "https://lilysgardenstore.com/cdn/shop/products/TomatoBeefsteakHeirloom.jpg?v=1635383528",
  },
  // com-crop, community-roots
  {
    id: "2",
    name: "Fresh Basil",
    description: "Aromatic basil grown in vertical systems.",
    price: 2.99,
    unit: "bunch",
    farmId: "com-crop",
    farm: "Com Crop",
    image: "https://www.treehugger.com/thmb/o6TcVg9avKc91QadK9QifsiwoDo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-155017585-ce203d1692f64490840f5375a8e2074b.jpg",
  },
  {
    id: "3",
    name: "Baby Bok Choy",
    description: "Tender Asian greens harvested young.",
    price: 3.49,
    unit: "bundle",
    farmId: "community-roots",
    farm: "Community Roots",
    image: "https://images.squarespace-cdn.com/content/v1/5d96d524052c897425394aaf/1736951245568-2RF8M9E0PYIJQBT3IQQX/bok-choy-vs-baby-bok-choy.jpeg?format=1500w",
  },
  {
    id: "4",
    name: "Organic Carrots",
    description: "Sweet and crunchy carrots grown without pesticides.",
    price: 3.29,
    unit: "bunch",
    farmId: "citiponics-urban-vertical-farm",
    farm: "Citiponics Urban Vertical Farm",
    image: "https://www.waangoo.com/cdn/shop/products/0025680_fresh-carrots.jpg?v=1694744711",
  },
  {
    id: "5",
    name: "Microgreens Mix",
    description: "Nutrient-dense assortment of young seedlings.",
    price: 5.99,
    unit: "box",
    farmId: "com-crop",
    farm: "Com Crop",
    image: "https://urbanagrifarms.com/wp-content/uploads/2021/01/MicroGreenMix.jpeg",
  },
  {
    id: "6",
    name: "Butterhead Lettuce",
    description: "Tender lettuce with a buttery texture.",
    price: 2.79,
    unit: "head",
    farmId: "community-roots",
    farm: "Community Roots",
    image: "https://m.media-amazon.com/images/I/61sz7gbBAFL.jpg",
  },
  {
    id: "7",
    name: "Bell Peppers",
    description: "Colorful sweet peppers perfect for salads or cooking.",
    price: 1.99,
    unit: "each",
    farmId: "citiponics-urban-vertical-farm",
    farm: "Citiponics Urban Vertical Farm",
    image: "https://aanmc.org/wp-content/uploads/2023/09/bell-peppers-1200x800-1-1024x683.jpg",
  },
  {
    id: "8",
    name: "Fresh Mint",
    description: "Aromatic mint for teas, cocktails, and cooking.",
    price: 2.49,
    unit: "bunch",
    farmId: "com-crop",
    farm: "Com Crop",
    image: "https://www.freshveggies.sg/cdn/shop/products/Mint-001-FreshVeggiesSGFreshVegetablesOnlineDeliveryinSingapore.jpg?v=1600873096",
  },
  {
    id: "9",
    name: "Japanese Cucumbers",
    description: "Crisp, thin-skinned cucumbers with few seeds.",
    price: 3.99,
    unit: "lb",
    farmId: "community-roots",
    farm: "Community Roots",
    image: "https://quanshuiwetmarket.com/cdn/shop/products/JapaneseCucumbers.jpg?v=1595950784",
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

