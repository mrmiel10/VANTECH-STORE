"use client"
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart.store';
import React from 'react'

const CountFavorites = () => {
    const favorites = useCartStore((s) => s.favorites);
  return (
    <Button
    disabled
    variant={"defaultBtn"}
    className="disabled:opacity-75 hover:disabled ml-auto bg-blue-500 rounded-full text-white size-4 p-3"
  >
  {favorites.length}
  </Button>
  )
}

export default CountFavorites