import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Search, Filter, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function ProductsPage() {
  const supabase = await createClient()

  // Get all active products
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      profiles!seller_id (
        full_name,
        business_name
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Discover Amazing Products</h1>
        <p className="text-gray-600">Shop from talented women entrepreneurs across India</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                {product.original_price && product.original_price > product.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-medium text-lg line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    by {product.profiles?.business_name || product.profiles?.full_name || "Seller"}
                  </p>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description || "No description available"}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
                    )}
                  </div>
                  {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Only {product.stock_quantity} left
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-600">Check back soon for amazing products from our sellers!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
