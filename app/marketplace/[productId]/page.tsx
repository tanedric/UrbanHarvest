// import Link from "next/link"
// import { ArrowLeft, Leaf, MapPin, ShoppingCart, Star } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { dummyProducts } from "@/lib/store"
// import { notFound } from "next/navigation"
// import ProductCard from "@/components/product-card"

// export default function ProductPage({ params }: { params: { productId: string } }) {
//   const product = dummyProducts.find((p) => p.id === params.productId)

//   if (!product) {
//     notFound()
//   }

//   // const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
//   const relatedProducts = dummyProducts.slice(0, 4)
//   return (
//     <div className="container px-4 py-6 md:px-6 md:py-8">
//       <Link
//         href="/marketplace"
//         className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Marketplace
//       </Link>
//       <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
//         <div className="flex justify-center">
//           <img
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             className="rounded-lg object-cover aspect-square w-full max-w-md"
//           />
//         </div>
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <Link
//                 href={`/farms/${product.farmId}`}
//                 className="inline-flex items-center gap-1 text-green-600 hover:underline"
//               >
//                 <Leaf className="h-4 w-4" />
//                 <span className="text-sm font-medium">{product.name}</span>
//               </Link>
//               <div className="inline-flex items-center gap-1 text-amber-500">
//                 <Star className="h-4 w-4 fill-amber-500" />
//                 <span className="text-sm font-medium">{product.rating}</span>
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold">{product.name}</h1>
//             <div className="flex items-center gap-2">
//               <MapPin className="h-4 w-4 text-gray-500" />
//               <span className="text-sm text-gray-500">{product.distance} miles away</span>
//             </div>
//             <div className="text-2xl font-bold text-green-600">
//               ${product.price.toFixed(2)} / {product.unit}
//             </div>
//           </div>
//           <Separator />
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">About this product</h2>
//             <p className="text-gray-500">{product.description}</p>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Harvest Date</p>
//                 <p className="text-sm text-gray-500">{product.harvestDate}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Available Quantity</p>
//                 <p className="text-sm text-gray-500">
//                   {product.availableQuantity} {product.unit}s
//                 </p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Growing Method</p>
//                 <p className="text-sm text-gray-500">{product.growingMethod}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Category</p>
//                 <p className="text-sm text-gray-500">{product.category}</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-4 sm:flex-row">
//             <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
//               <ShoppingCart className="mr-2 h-4 w-4" />
//               Add to Cart
//             </Button>
//             <Button variant="outline" className="w-full sm:w-auto">
//               Contact Farm
//             </Button>
//           </div>
//         </div>
//       </div>
//       <Separator className="my-12" />
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold">Related Products</h2>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {relatedProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

