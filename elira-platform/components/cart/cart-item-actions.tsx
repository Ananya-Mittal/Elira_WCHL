"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItemActionsProps {
  itemId: string
  currentQuantity: number
  maxStock: number
  onUpdate: () => void
}

export function CartItemActions({ itemId, currentQuantity, maxStock, onUpdate }: CartItemActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxStock) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("id", itemId)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error
      onUpdate()
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity(currentQuantity - 1)}
        disabled={isLoading || currentQuantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="w-12 text-center font-medium">{currentQuantity}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateQuantity(currentQuantity + 1)}
        disabled={isLoading || currentQuantity >= maxStock}
      >
        <Plus className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={removeItem}
        disabled={isLoading}
        className="text-red-600 hover:text-red-700 ml-4"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
