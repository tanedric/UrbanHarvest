import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ArrowRight, Leaf, ShoppingBasket, TruckIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import FarmHighlights from "@/components/farm-highlights"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UrbanHarvest - Fresh Urban Produce",
  description: "Connect with local urban farms, reduce food waste, and enjoy the freshest produce in your community.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <div className="flex flex-col min-h-screen">
      
      </div>
      <body className={inter.className}>
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">UrbanHarvest</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/marketplace" className="text-sm font-medium hover:underline underline-offset-4">
              Marketplace
            </Link>
            <Link href="/farms" className="text-sm font-medium hover:underline underline-offset-4">
              Farms
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Browse Products
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
        {children}</body>
    </html>
  )
}



import './globals.css'