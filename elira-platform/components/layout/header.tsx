"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Globe, Menu, Heart, GraduationCap } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const languageOptions = [
  { code: "en" as const, name: "English", nativeName: "English" },
  { code: "hi" as const, name: "Hindi", nativeName: "हिंदी" },
  { code: "kn" as const, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta" as const, name: "Tamil", nativeName: "தமிழ்" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()

  const currentLanguage = languageOptions.find((lang) => lang.code === language)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">E</span>
            </div>
            <span className="font-serif font-bold text-xl text-primary">ELIRA</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder={t("searchProducts")} className="pl-10 pr-4" />
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              {t("products")}
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
              {t("community")}
            </Link>
            <Link
              href="/learning"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
            >
              <GraduationCap className="h-4 w-4" />
              {t("learning")}
            </Link>
            <Link href="/sellers" className="text-sm font-medium hover:text-primary transition-colors">
              {t("sellers")}
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center border rounded-lg px-3 py-1 bg-muted/50">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    {currentLanguage?.code.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-purple-50 text-purple-700" : ""}
                    >
                      {lang.nativeName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                2
              </Badge>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">{t("dashboard")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">{t("orders")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/login">{t("login")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder={t("searchProducts")} className="pl-10 pr-4" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t pt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
                {t("products")}
              </Link>
              <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
                {t("community")}
              </Link>
              <Link
                href="/learning"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                {t("learning")}
              </Link>
              <Link href="/sellers" className="text-sm font-medium hover:text-primary transition-colors">
                {t("sellers")}
              </Link>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 mb-2">Language / भाषा</p>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage(lang.code)}
                      className="text-xs"
                    >
                      {lang.nativeName}
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
