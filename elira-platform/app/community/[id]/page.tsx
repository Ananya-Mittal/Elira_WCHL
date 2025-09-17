import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CommunityPostPageProps {
  params: Promise<{ id: string }>
}

export default async function CommunityPostPage({ params }: CommunityPostPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Get post details
  const { data: post } = await supabase
    .from("community_posts")
    .select(`
      *,
      profiles!author_id (
        full_name,
        business_name,
        avatar_url,
        bio,
        city,
        state
      )
    `)
    .eq("id", id)
    .single()

  if (!post) {
    notFound()
  }

  // Get comments
  const { data: comments } = await supabase
    .from("community_comments")
    .select(`
      *,
      profiles!author_id (
        full_name,
        business_name,
        avatar_url
      )
    `)
    .eq("post_id", id)
    .is("parent_id", null)
    .order("created_at", { ascending: true })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/community">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Button>
        </Link>

        {/* Main Post */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl">
                  {(post.profiles?.business_name || post.profiles?.full_name || "U")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.profiles?.business_name || post.profiles?.full_name}
                    </h3>
                    {post.profiles?.city && post.profiles?.state && (
                      <p className="text-gray-600">
                        {post.profiles.city}, {post.profiles.state}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {post.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                </div>
                {post.profiles?.bio && <p className="text-gray-600 text-sm">{post.profiles.bio}</p>}
              </div>
            </div>

            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-purple-600 border-purple-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center space-x-6">
                <Button variant="ghost" className="text-gray-600 hover:text-red-500">
                  <Heart className="w-5 h-5 mr-2" />
                  {post.likes_count} Likes
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-500">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {post.comments_count} Comments
                </Button>
              </div>
              <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Comments ({comments?.length || 0})</h2>

            {/* Add Comment Form */}
            <div className="mb-8">
              <Textarea placeholder="Share your thoughts and support..." rows={3} className="mb-4" />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Post Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {(comment.profiles?.business_name || comment.profiles?.full_name || "U")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {comment.profiles?.business_name || comment.profiles?.full_name}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                  <p className="text-gray-600">Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
