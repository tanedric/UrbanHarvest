import ProductCard from "@/components/product-card"
import { dummyProducts } from "@/lib/store"

// const products = [
//   {
//     id: "1",
//     name: "Heirloom Tomatoes",
//     description: "Colorful mix of heritage tomato varieties.",
//     price: 4.99,
//     unit: "lb",
//     farm: "Green Roof Gardens",
//     image: "https://lilysgardenstore.com/cdn/shop/products/TomatoBeefsteakHeirloom.jpg?v=1635383528",
//   },
//   {
//     id: "2",
//     name: "Fresh Basil",
//     description: "Aromatic basil grown in vertical systems.",
//     price: 2.99,
//     unit: "bunch",
//     farm: "Vertical Harvest",
//     image: "https://www.treehugger.com/thmb/o6TcVg9avKc91QadK9QifsiwoDo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-155017585-ce203d1692f64490840f5375a8e2074b.jpg",
//   },
//   {
//     id: "3",
//     name: "Baby Bok Choy",
//     description: "Tender Asian greens harvested young.",
//     price: 3.49,
//     unit: "bundle",
//     farm: "Community Roots",
//     image: "https://images.squarespace-cdn.com/content/v1/5d96d524052c897425394aaf/1736951245568-2RF8M9E0PYIJQBT3IQQX/bok-choy-vs-baby-bok-choy.jpeg?format=1500w",
//   },
//   {
//     id: "4",
//     name: "Organic Carrots",
//     description: "Sweet and crunchy carrots grown without pesticides.",
//     price: 3.29,
//     unit: "bunch",
//     farm: "Green Roof Gardens",
//     image: "https://www.waangoo.com/cdn/shop/products/0025680_fresh-carrots.jpg?v=1694744711",
//   },
//   {
//     id: "5",
//     name: "Microgreens Mix",
//     description: "Nutrient-dense assortment of young seedlings.",
//     price: 5.99,
//     unit: "box",
//     farm: "Vertical Harvest",
//     image: "https://urbanagrifarms.com/wp-content/uploads/2021/01/MicroGreenMix.jpeg",
//   },
//   {
//     id: "6",
//     name: "Butterhead Lettuce",
//     description: "Tender lettuce with a buttery texture.",
//     price: 2.79,
//     unit: "head",
//     farm: "Community Roots",
//     image: "https://m.media-amazon.com/images/I/61sz7gbBAFL.jpg",
//   },
//   {
//     id: "7",
//     name: "Bell Peppers",
//     description: "Colorful sweet peppers perfect for salads or cooking.",
//     price: 1.99,
//     unit: "each",
//     farm: "Green Roof Gardens",
//     image: "https://aanmc.org/wp-content/uploads/2023/09/bell-peppers-1200x800-1-1024x683.jpg",
//   },
//   {
//     id: "8",
//     name: "Fresh Mint",
//     description: "Aromatic mint for teas, cocktails, and cooking.",
//     price: 2.49,
//     unit: "bunch",
//     farm: "Vertical Harvest",
//     image: "https://www.freshveggies.sg/cdn/shop/products/Mint-001-FreshVeggiesSGFreshVegetablesOnlineDeliveryinSingapore.jpg?v=1600873096",
//   },
//   {
//     id: "9",
//     name: "Japanese Cucumbers",
//     description: "Crisp, thin-skinned cucumbers with few seeds.",
//     price: 3.99,
//     unit: "lb",
//     farm: "Community Roots",
//     image: "https://quanshuiwetmarket.com/cdn/shop/products/JapaneseCucumbers.jpg?v=1595950784",
//   },
// ]

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
              {dummyProducts.map((product) => (
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

