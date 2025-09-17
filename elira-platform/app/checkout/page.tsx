import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapPin, CreditCard, Smartphone, Building, Wallet, Package, Shield, Truck } from "lucide-react"

export default async function CheckoutPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get cart items
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

  // Get user addresses
  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })

  if (!cartItems || cartItems.length === 0) {
    redirect("/cart")
  }

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.products.price * item.quantity
  }, 0)

  const deliveryFee = subtotal > 500 ? 0 : 50
  const taxAmount = subtotal * 0.18
  const total = subtotal + deliveryFee + taxAmount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {addresses && addresses.length > 0 ? (
                  <RadioGroup defaultValue={addresses[0].id} className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={address.id} className="cursor-pointer">
                            <div className="p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{address.full_name}</span>
                                <div className="flex space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {address.type.toUpperCase()}
                                  </Badge>
                                  {address.is_default && (
                                    <Badge className="text-xs bg-green-100 text-green-800">DEFAULT</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {address.address_line_1}, {address.address_line_2 && `${address.address_line_2}, `}
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
                    <p className="text-gray-600 mb-4">Add a delivery address to continue</p>
                    <Button variant="outline" className="bg-transparent">
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="upi" className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center cursor-pointer">
                      <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                      UPI (PhonePe, Google Pay, Paytm)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                      <Building className="w-5 h-5 mr-2 text-purple-600" />
                      Net Banking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                      <Wallet className="w-5 h-5 mr-2 text-orange-600" />
                      Digital Wallets
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                      <Package className="w-5 h-5 mr-2 text-gray-600" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.products.name}</h4>
                        <p className="text-sm text-gray-600">
                          by {item.products.profiles?.business_name || item.products.profiles?.full_name}
                        </p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.products.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
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

                <div className="space-y-3 pt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-green-600" />
                    Secure payment with SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-blue-600" />
                    Estimated delivery: 3-5 business days
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6">
                  Place Order - ₹{total.toFixed(2)}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
