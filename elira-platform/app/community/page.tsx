import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, Search, Plus, TrendingUp, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function CommunityPage() {
  const supabase = await createClient()

  // Get community posts with author information
  const { data: posts } = await supabase
    .from("community_posts")
    .select(`
      *,
      profiles!author_id (
        full_name,
        business_name,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false })
    .limit(20)

  // Get featured posts
  const { data: featuredPosts } = await supabase
    .from("community_posts")
    .select(`
      *,
      profiles!author_id (
        full_name,
        business_name,
        avatar_url
      )
    `)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">ELIRA Community</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Connect with fellow women entrepreneurs, share your journey, and inspire others
        </p>
        <Link href="/community/new">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </Link>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search community posts..." className="pl-10" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Featured Posts */}
          {featuredPosts && featuredPosts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Featured Stories</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-2 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {(post.profiles?.business_name || post.profiles?.full_name || "U")[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-600">
                            {post.profiles?.business_name || post.profiles?.full_name}
                          </span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-6">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          {(post.profiles?.business_name || post.profiles?.full_name || "U")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {post.profiles?.business_name || post.profiles?.full_name}
                            </h3>
                            <p className="text-sm text-gray-600">{new Date(post.created_at).toLocaleDateString()}</p>
                          </div>
                          {post.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-6">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-500">
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes_count}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments_count}
                          </Button>
                          <Link href={`/community/${post.id}`}>
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to share your entrepreneurial journey!</p>
                  <Link href="/community/new">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Trending Topics</h3>
              </div>
              <div className="space-y-2">
                {[
                  "#WomenInBusiness",
                  "#HandmadeWithLove",
                  "#SustainableFashion",
                  "#StartupStory",
                  "#MomEntrepreneur",
                ].map((tag) => (
                  <Button key={tag} variant="ghost" className="w-full justify-start text-left p-2 h-auto">
                    <span className="text-purple-600 font-medium">{tag}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Be respectful and supportive</li>
                <li>• Share authentic experiences</li>
                <li>• No spam or self-promotion</li>
                <li>• Help fellow entrepreneurs</li>
                <li>• Celebrate each other's success</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
