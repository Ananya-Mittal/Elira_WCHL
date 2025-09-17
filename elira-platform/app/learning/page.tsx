"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Clock, Search, Filter, GraduationCap, Users, TrendingUp, DollarSign, Smartphone } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const courses = [
  {
    id: 1,
    title: "Starting Your Business: Complete Guide for Women Entrepreneurs",
    description: "Learn the fundamentals of starting and running a successful business",
    category: "businessBasics",
    level: "beginner",
    duration: 45,
    videoId: "bO9y756oVy8", // Business basics video
    thumbnail: "/business-planning-women-entrepreneur.jpg",
    instructor: "Priya Sharma",
    views: "12.5K",
  },
  {
    id: 2,
    title: "Digital Marketing Mastery for Small Business Owners",
    description: "Master social media, SEO, and online advertising to grow your business",
    category: "digitalMarketing",
    level: "intermediate",
    duration: 38,
    videoId: "nU-IIXBWlS4", // Digital marketing for small business
    thumbnail: "/digital-marketing-social-media.png",
    instructor: "Anjali Gupta",
    views: "8.2K",
  },
  {
    id: 3,
    title: "Financial Planning and Management for Women Entrepreneurs",
    description: "Learn budgeting, cash flow management, and investment strategies",
    category: "financialPlanning",
    level: "intermediate",
    duration: 52,
    videoId: "HcqpanDadyQ", // Financial planning for entrepreneurs
    thumbnail: "/financial-planning-budget-calculator.png",
    instructor: "Meera Patel",
    views: "15.3K",
  },
  {
    id: 4,
    title: "How to Use ELIRA Platform: Complete Seller Guide",
    description: "Step-by-step guide to setting up your store and maximizing sales on ELIRA",
    category: "platformGuide",
    level: "beginner",
    duration: 25,
    videoId: "dQw4w9WgXcQ", // Platform tutorial placeholder
    thumbnail: "/ecommerce-platform-tutorial-dashboard.jpg",
    instructor: "ELIRA Team",
    views: "22.1K",
  },
  {
    id: 5,
    title: "Building Your Brand: Marketing Strategies That Work",
    description: "Create a strong brand identity and effective marketing campaigns",
    category: "digitalMarketing",
    level: "advanced",
    duration: 41,
    videoId: "3Ek1sR4CVem", // Brand building and marketing
    thumbnail: "/brand-building-logo-design-marketing.jpg",
    instructor: "Kavya Reddy",
    views: "9.7K",
  },
  {
    id: 6,
    title: "Understanding GST and Tax Planning for Small Businesses",
    description: "Navigate Indian tax system and optimize your business finances",
    category: "financialPlanning",
    level: "intermediate",
    duration: 35,
    videoId: "Lp7E973zozc", // GST and tax planning
    thumbnail: "/gst-tax-calculator-indian-business.jpg",
    instructor: "Ritu Agarwal",
    views: "11.4K",
  },
]

const categories = [
  { key: "all", label: "All Courses", icon: GraduationCap },
  { key: "businessBasics", label: "Business Basics", icon: Users },
  { key: "digitalMarketing", label: "Digital Marketing", icon: TrendingUp },
  { key: "financialPlanning", label: "Financial Planning", icon: DollarSign },
  { key: "platformGuide", label: "Platform Guide", icon: Smartphone },
]

export default function LearningPage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<(typeof courses)[0] | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="h-4 w-4" />
            {t("learning")}
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 text-balance">{t("learningTitle")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">{t("learningSubtitle")}</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t("categories")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.key}
                      variant={selectedCategory === category.key ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.key)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.key === "all" ? category.label : t(category.key)}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCourse ? (
              /* Video Player */
              <div className="space-y-6">
                <Button variant="outline" onClick={() => setSelectedCourse(null)} className="mb-4">
                  ← Back to Courses
                </Button>

                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedCourse.videoId}`}
                        title={selectedCourse.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-t-lg"
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getLevelColor(selectedCourse.level)}>{t(selectedCourse.level)}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {selectedCourse.duration} {t("minutes")}
                        </Badge>
                      </div>
                      <h1 className="text-2xl font-bold mb-3">{selectedCourse.title}</h1>
                      <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Instructor: {selectedCourse.instructor}</span>
                        <span>{selectedCourse.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Course Grid */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory === "all" ? t("allCourses") : t(selectedCategory)}
                  </h2>
                  <span className="text-gray-500">{filteredCourses.length} courses</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-t-lg flex items-center justify-center">
                            <Button
                              size="lg"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setSelectedCourse(course)}
                            >
                              <Play className="h-5 w-5 mr-2" />
                              {t("watchNow")}
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getLevelColor(course.level)}>{t(course.level)}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration} {t("minutes")}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{course.instructor}</span>
                            <span>{course.views} views</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
