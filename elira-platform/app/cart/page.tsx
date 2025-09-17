import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get cart items with product details
  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (
        *,
        profiles!seller_id (
          full_name,
          business_name
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const subtotal =
    cartItems?.reduce((sum, item) => {
      return sum + item.products.price * item.quantity
    }, 0) || 0

  const deliveryFee = subtotal > 500 ? 0 : 50
  const taxAmount = subtotal * 0.18 // 18% GST
  const total = subtotal + deliveryFee + taxAmount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <ShoppingCart className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{item.products.name}</h3>
                            <p className="text-gray-600 text-sm">
                              by {item.products.profiles?.business_name || item.products.profiles?.full_name}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-bold text-purple-600">₹{item.products.price}</span>
                            {item.products.original_price && item.products.original_price > item.products.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.products.original_price}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <Badge variant="outline">Stock: {item.products.stock_quantity}</Badge>
                          <span className="font-semibold text-gray-900">
                            Subtotal: ₹{(item.products.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">₹{total.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery!
                    </p>
                  )}
                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Discover amazing products from women entrepreneurs</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
