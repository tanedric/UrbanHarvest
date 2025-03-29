"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, LogOut } from "lucide-react"
import { useCartStore, useAuthStore } from "@/lib/store"
import { usePathname, useRouter } from "next/navigation"

export function SiteHeader() {
  const { items } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const pathname = usePathname()
  const router = useRouter()
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const showCartIcon = pathname === "/marketplace" || pathname === "/farms" || pathname.startsWith("/farms/")
  const isFarmer = user?.role === "farmer"

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg
            className=" h-6 w-6 text-green-600"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.4 18 12 9l8.6 9" />
            <path d="M7 21h10" />
            <path d="M7 3.6 12 9l5-5.4" />
          </svg>
          <span className="text-xl font-bold text-green-800 dark:text-green-200">UrbanHarvest</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
          >
            Home
          </Link>

          {!isFarmer && (
            <>
              <Link
                href="/marketplace"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                Marketplace
              </Link>
              <Link
                href="/farms"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                Farms
              </Link>
            </>
          )}

          {isFarmer && (
            <Link
              href="/farm-dashboard"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated && !isFarmer && (
            <Link
              href="/orders"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
            >
              My Orders
            </Link>
          )}

        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {showCartIcon && !isFarmer && (
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              {showCartIcon ? (
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              ) : (
                <Link href="/marketplace">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Browse Products</Button>
                </Link>
              )}

              <Link href="/signin">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

