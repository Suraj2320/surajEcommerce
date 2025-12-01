"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, ChevronDown, ChevronUp, LogOut, Package, Heart, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "../ui/sheet.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../context/CartContext.jsx";
import { categories } from "../../data/products.js";
import { useToast } from "../../hooks/use-toast.js";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { getItemCount } = useCart();
  const { toast } = useToast();
  const itemCount = getItemCount();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin": return "/admin";
      case "seller": return "/seller";
      default: return "/account";
    }
  };

  const initialCategories = categories.slice(0, 10);
  const moreCategories = categories.slice(10);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 h-16 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-background to-muted/50">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/10 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm">
                    <Link href="/">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-lg" />
                          <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-md" />
                          <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-yellow-100 rounded-sm flex items-center justify-center">
                            <span className="text-xl font-black bg-gradient-to-br from-orange-600 to-red-700 bg-clip-text text-transparent">S</span>
                          </div>
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent" data-testid="link-logo-mobile">SurajHub</span>
                      </div>
                    </Link>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground/70 uppercase tracking-widest px-3 mb-4">🛍️ Categories</p>
                    {initialCategories.map((category) => (
                      <SheetClose asChild key={category.id}>
                        <Link href={`/category/${category.slug}`}>
                          <div
                            className="block px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-500/30 cursor-pointer transition-all duration-200 border border-transparent backdrop-blur-sm"
                            data-testid={`link-category-mobile-${category.slug}`}
                          >
                            <span className="font-medium text-sm">{category.name}</span>
                          </div>
                        </Link>
                      </SheetClose>
                    ))}

                    <div
                      className="block px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-500/30 cursor-pointer transition-all duration-200 border border-transparent backdrop-blur-sm flex items-center justify-between"
                      onClick={() => setIsMoreExpanded(!isMoreExpanded)}
                      data-testid="button-more-categories-mobile"
                    >
                      <span className="font-medium text-sm">More</span>
                      {isMoreExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>

                    {isMoreExpanded && (
                      <div className="pl-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                        {moreCategories.map((category) => (
                          <SheetClose asChild key={category.id}>
                            <Link href={`/category/${category.slug}`}>
                              <div
                                className="block px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-500/30 cursor-pointer transition-all duration-200 border border-transparent backdrop-blur-sm"
                                data-testid={`link-category-mobile-${category.slug}`}
                              >
                                <span className="font-medium text-sm">{category.name}</span>
                              </div>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    )}
                  </nav>
                  <div className="p-4 border-t border-white/10 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm space-y-2">
                    <p className="text-xs font-bold text-muted-foreground/70 uppercase">Quick Links</p>
                    <SheetClose asChild>
                      <Link href="/support">
                        <div className="text-sm text-muted-foreground hover:text-primary transition-colors">📞 Help Center</div>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <div className="flex items-center gap-2.5 group">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-lg group-hover:shadow-2xl group-hover:shadow-orange-500/50 transition-all duration-300" />
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-md" />
                  <div className="absolute inset-2 bg-gradient-to-br from-white/80 to-yellow-100 rounded-sm flex items-center justify-center">
                    <span className="text-2xl font-black bg-gradient-to-br from-orange-600 to-red-700 bg-clip-text text-transparent">S</span>
                  </div>
                </div>
                <span className="hidden sm:block text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-red-500 transition-all" data-testid="link-logo">SurajHub</span>
              </div>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands and more..."
                className="w-full pl-10 pr-4 bg-white/5 backdrop-blur-sm border-white/20 rounded-full focus:bg-white/10 focus:border-primary/50 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/20 transition-colors" onClick={() => router.push("/search")} data-testid="button-search-mobile">
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/cart">
              <div className="relative group cursor-pointer">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all" size="default" data-testid="button-cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline font-semibold">Cart</span>
                  {itemCount > 0 && (
                    <Badge
                      className="absolute -top-3 -right-3 h-7 w-7 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-600 to-pink-600 shadow-xl font-bold text-white border-2 border-background rounded-full"
                      data-testid="badge-cart-count"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  )}
                </Button>
                {itemCount > 0 && (
                  <div className="absolute top-full right-0 mt-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 rounded-lg p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
                  </div>
                )}
              </div>
            </Link>

            {isLoading ? (
              <div className="h-10 px-4 rounded-lg bg-gradient-to-r from-muted to-muted/50 animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 px-3 bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 border border-primary/30 shadow-md hover:shadow-lg transition-all" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-xs font-bold text-primary">Welcome</span>
                      <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {user.firstName || "User"}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden lg:inline ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gradient-to-br from-background to-muted/50 border-white/10 backdrop-blur-sm">
                  <div className="px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-white/10">
                    <p className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>
                      <div className="flex items-center gap-2 w-full cursor-pointer" data-testid="link-dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        {user.role === "admin" ? "Admin Dashboard" : user.role === "seller" ? "Seller Dashboard" : "My Account"}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      <div className="flex items-center gap-2 w-full cursor-pointer" data-testid="link-orders">
                        <Package className="h-4 w-4" />
                        My Orders
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">
                      <div className="flex items-center gap-2 w-full cursor-pointer" data-testid="link-wishlist">
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button
                      onClick={async () => {
                        await logout();
                        toast({ title: "Logged out", description: "You have been logged out successfully" });
                        router.push("/");
                      }}
                      className="flex items-center gap-2 w-full cursor-pointer text-destructive"
                      data-testid="button-logout"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg font-bold text-white" asChild data-testid="button-login">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
