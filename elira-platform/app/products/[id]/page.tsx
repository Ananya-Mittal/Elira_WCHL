import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Heart, Star, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/products/add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Get product details
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      profiles!seller_id (
        full_name,
        business_name,
        bio,
        city,
        state
      )
    `)
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-24 h-24 text-gray-400" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">by {product.profiles?.business_name || product.profiles?.full_name}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-purple-600">₹{product.price}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-xl text-gray-500 line-through">₹{product.original_price}</span>
              )}
            </div>
            {product.original_price && product.original_price > product.price && (
              <Badge className="bg-red-500">
                {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">(4.8) • 124 reviews</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Stock:</span>
              <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                {product.stock_quantity > 0 ? `${product.stock_quantity} available` : "Out of stock"}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <AddToCartButton productId={product.id} price={product.price} stockQuantity={product.stock_quantity} />
            <Button variant="outline" className="w-full py-6 bg-transparent">
              <Heart className="w-5 h-5 mr-2" />
              Add to Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Free delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Secure payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description || "No description available for this product."}
          </p>
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seller Information */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">About the Seller</h2>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {(product.profiles?.business_name || product.profiles?.full_name || "S")[0]}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {product.profiles?.business_name || product.profiles?.full_name}
              </h3>
              {product.profiles?.city && product.profiles?.state && (
                <p className="text-gray-600">
                  {product.profiles.city}, {product.profiles.state}
                </p>
              )}
              {product.profiles?.bio && <p className="text-gray-700 mt-2">{product.profiles.bio}</p>}
              <Button variant="outline" className="mt-4 bg-transparent">
                View Store
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
