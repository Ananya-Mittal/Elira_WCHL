"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Users, ShoppingBag, Award, Heart } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function HomePage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-primary text-primary-foreground border-primary">
                    Exclusively for Women Entrepreneurs
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-serif font-bold text-balance leading-tight">
                    {t("heroTitle")}
                  </h1>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">{t("heroSubtitle")}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8">
                    {t("shopNow")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    {t("learnMore")}
                  </Button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-muted-foreground">Women Sellers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">{t("products")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1M+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <CardContent className="p-4">
                      <img
                        src="/indian-woman-entrepreneur-with-handmade-jewelry.jpg"
                        alt="Handmade jewelry"
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-sm">Handcrafted Jewelry</h3>
                      <p className="text-xs text-muted-foreground">by Priya Sharma</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">4.9</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                    <CardContent className="p-4">
                      <img
                        src="/indian-woman-with-traditional-textiles-and-fabrics.jpg"
                        alt="Traditional textiles"
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-sm">Traditional Textiles</h3>
                      <p className="text-xs text-muted-foreground">by Meera Patel</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">4.8</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Why Choose ELIRA?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                We provide everything you need to succeed as a woman entrepreneur in India
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Women-Only Community</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Connect with like-minded women entrepreneurs and build lasting relationships
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Easy Selling</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Simple tools to list products, manage inventory, and track sales
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Recognition & Badges</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Earn badges and recognition for your achievements and milestones
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Mentorship Support</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Get guidance from experienced sellers and industry experts
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">{t("featuredProducts")}</h2>
                <p className="text-muted-foreground">Discover the latest products from our talented sellers</p>
              </div>
              <Button variant="outline">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={`/indian-handmade-product-.jpg?height=250&width=250&query=Indian handmade product ${i}`}
                        alt={`Product ${i}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        variant="secondary"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">Handcrafted Product {i}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by Seller Name</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">₹{i * 500 + 299}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">4.{8 + i}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-pretty">
              Join thousands of women entrepreneurs who are already building successful businesses on ELIRA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Become a Seller
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                {t("learnMore")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
