"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Hash } from "lucide-react"
import Link from "next/link"

export default function NewPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error: insertError } = await supabase.from("community_posts").insert({
        author_id: user.id,
        title: formData.title,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim().replace("#", ""))
          .filter(Boolean),
      })

      if (insertError) throw insertError

      router.push("/community")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/community">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900">Share Your Story</h1>
            <p className="text-gray-600 mt-2">Inspire the ELIRA community with your journey</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Share an inspiring title for your story..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Your Story *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Tell us about your entrepreneurial journey, challenges you've overcome, lessons learned, or advice for fellow women entrepreneurs..."
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="WomenInBusiness, StartupStory, HandmadeWithLove"
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-gray-500">Separate tags with commas. Don't include # symbol.</p>
              </div>

              <div className="space-y-4">
                <Label>Add Images (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload images to accompany your story</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                  <Button type="button" variant="outline" className="mt-4 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

              <div className="flex justify-end space-x-4">
                <Link href="/community">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish Story"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Writing Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Writing Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Share your authentic journey - both successes and challenges</li>
              <li>• Include specific examples and lessons learned</li>
              <li>• Offer practical advice for fellow entrepreneurs</li>
              <li>• Use relevant tags to help others discover your story</li>
              <li>• Keep it engaging and inspiring</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
