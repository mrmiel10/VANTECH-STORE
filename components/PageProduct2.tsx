/**
 * v0 by Vercel.
 * @see https://v0.dev/t/c5lef3hv1lt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { LucideFilter } from "lucide-react"
import { LucideFilterX } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
export default function PageProduct2() {
  const products = [
    {
      id: 1,
      name: "Chemise en coton bio",
      description: "Chemise décontractée en coton biologique",
      price: 49.99,
      color: "blanc",
      category: "Vêtements",
    },
    {
      id: 2,
      name: "Pantalon en lin",
      description: "Pantalon léger et fluide en lin",
      price: 69.99,
      color: "beige",
      category: "Vêtements",
    },
    {
      id: 3,
      name: "Robe fleurie",
      description: "Robe d'été à motifs floraux",
      price: 79.99,
      color: "bleu",
      category: "Vêtements",
    },
    {
      id: 4,
      name: "Sac à dos en toile",
      description: "Sac à dos en toile durable",
      price: 39.99,
      color: "noir",
      category: "Accessoires",
    },
    {
      id: 5,
      name: "Paire de lunettes de soleil",
      description: "Lunettes de soleil avec protection UV",
      price: 29.99,
      color: "marron",
      category: "Accessoires",
    },
    {
      id: 6,
      name: "Tapis en jute",
      description: "Tapis en jute naturel",
      price: 59.99,
      color: "beige",
      category: "Maison",
    },
  ]
  type SelectedFilters = {
    category:string[],
    color:string[]
  }
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: [],
    color: [],
  })
  const handleFilterChange = (type:string, value:string) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      })
    } else if (type === "color") {
      setSelectedFilters({
        ...selectedFilters,
        color: selectedFilters.color.includes(value)
          ? selectedFilters.color.filter((item) => item !== value)
          : [...selectedFilters.color, value],
      })
    }
  }
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false
      }
      if (selectedFilters.color.length > 0 && !selectedFilters.color.includes(product.color)) {
        return false
      }
      return true
    })
  }, [selectedFilters])
  const handleClearFilters = () => {
    setSelectedFilters({
      category: [],
      color: [],
    })
  }
  return (
    <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-[270px_1fr] gap-10 items-start">
      <div className="grid gap-6">
        <Card >
          <CardHeader className="p-6 md:p-3 space-y-3" >
            <CardTitle>
                <div className="flex items-center gap-4">
                <Badge variant={"defaultBtn"} className="antialiased px-4 py-2 text-sm"><LucideFilter className="size-4" />Filtres</Badge>
                <Button className="ml-auto hover:text-blue-500 ease duration-150 transition" variant="outline" onClick={handleClearFilters}>
              clear All Filters
              <LucideFilterX className="size-4" />
            </Button>
                </div>
               
                </CardTitle>
                <Separator orientation="horizontal"/>
          </CardHeader>
          <CardContent className="p-6 md:p-3">
            <div className="grid gap-4 h-[500px] md:overflow-y-auto">
              <div>
                <h3 className="text-base font-medium mb-2">Catégorie</h3>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("V\u00EAtements")}
                      onCheckedChange={() => handleFilterChange("category", "V\u00EAtements")}
                    />
                    Vêtements
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Accessoires")}
                      onCheckedChange={() => handleFilterChange("category", "Accessoires")}
                    />
                    Accessoires
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Maison")}
                      onCheckedChange={() => handleFilterChange("category", "Maison")}
                    />
                    Maison
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">Couleur</h3>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("blanc")}
                      onCheckedChange={() => handleFilterChange("color", "blanc")}
                    />
                    Blanc
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("beige")}
                      onCheckedChange={() => handleFilterChange("color", "beige")}
                    />
                    Beige
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("bleu")}
                      onCheckedChange={() => handleFilterChange("color", "bleu")}
                    />
                    Bleu
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("noir")}
                      onCheckedChange={() => handleFilterChange("color", "noir")}
                    />
                    Noir
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("marron")}
                      onCheckedChange={() => handleFilterChange("color", "marron")}
                    />
                    Marron
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">Couleur</h3>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("blanc")}
                      onCheckedChange={() => handleFilterChange("color", "blanc")}
                    />
                    Blanc
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("beige")}
                      onCheckedChange={() => handleFilterChange("color", "beige")}
                    />
                    Beige
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("bleu")}
                      onCheckedChange={() => handleFilterChange("color", "bleu")}
                    />
                    Bleu
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("noir")}
                      onCheckedChange={() => handleFilterChange("color", "noir")}
                    />
                    Noir
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("marron")}
                      onCheckedChange={() => handleFilterChange("color", "marron")}
                    />
                    Marron
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
           
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Collection Été</h1>
            <p className="text-muted-foreground">Découvrez notre collection estivale tendance et confortable !</p>
          </div>
        </div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <li key={product.id} className="relative group">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">Voir</span>
              </Link>
              <img
                src="../public/brownShoe.jpg"
                alt="Image de couverture"
                width={200}
                height={200}
                className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
              />
              <div className="flex-1 py-4">
                <h3 className="font-semibold tracking-tight">
                  {product.name} ({product.color})
                </h3>
                <small className="text-sm leading-none text-muted-foreground">{product.description}</small>
                <h4 className="font-semibold">${product.price}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}