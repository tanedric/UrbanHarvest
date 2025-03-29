import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Heirloom Tomatoes",
    description: "Colorful mix of heritage tomato varieties.",
    price: 4.99,
    unit: "lb",
    farm: "Green Roof Gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Fresh Basil",
    description: "Aromatic basil grown in vertical systems.",
    price: 2.99,
    unit: "bunch",
    farm: "Vertical Harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Baby Bok Choy",
    description: "Tender Asian greens harvested young.",
    price: 3.49,
    unit: "bundle",
    farm: "Community Roots",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Organic Carrots",
    description: "Sweet and crunchy carrots grown without pesticides.",
    price: 3.29,
    unit: "bunch",
    farm: "Green Roof Gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    name: "Microgreens Mix",
    description: "Nutrient-dense assortment of young seedlings.",
    price: 5.99,
    unit: "box",
    farm: "Vertical Harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    name: "Butterhead Lettuce",
    description: "Tender lettuce with a buttery texture.",
    price: 2.79,
    unit: "head",
    farm: "Community Roots",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    name: "Bell Peppers",
    description: "Colorful sweet peppers perfect for salads or cooking.",
    price: 1.99,
    unit: "each",
    farm: "Green Roof Gardens",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    name: "Fresh Mint",
    description: "Aromatic mint for teas, cocktails, and cooking.",
    price: 2.49,
    unit: "bunch",
    farm: "Vertical Harvest",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "9",
    name: "Japanese Cucumbers",
    description: "Crisp, thin-skinned cucumbers with few seeds.",
    price: 3.99,
    unit: "lb",
    farm: "Community Roots",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-200">
                  Urban Farm Marketplace
                </h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Browse fresh, locally grown produce from urban farms in your area. All products are harvested to order
                  to ensure maximum freshness and minimum waste.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  unit={product.unit}
                  farm={product.farm}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

