/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5pVSk8UOkDe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LucideFilter } from "lucide-react"
export default function PageProduct1() {
    type typeSelectedFilters = {
        category:string[],
        // price:{
        //     min:number, max: number
        // },
        size: string[],
    color: string[],
    }
  const [ selectedFilters, setSelectedFilters] = useState<typeSelectedFilters>({
    category: [],
    // price: { min: 0, max: 1000 },
    size: [],
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
    // } else if (type === "price") {
    //   setSelectedFilters({
    //     ...selectedFilters,
    //     price: Number(value),
    //   })
    } 
    else if (type === "size") {
      setSelectedFilters({
        ...selectedFilters,
        size: selectedFilters.size.includes(value)
          ? selectedFilters.size.filter((item) => item !== value)
          : [...selectedFilters.size, value],
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
  const handleClearFilters = () => {
    setSelectedFilters({
      category: [],
    //   price: { min: 0, max: 1000 },
      size: [],
      color: [],
    })
  }
  const products = [
    {
      id: 1,
      name: "T-shirt en coton",
      price: 19.99,
      image: "/placeholder.svg",
      category: "Vêtements",
      size: "M",
      color: "Noir",
    },
    {
      id: 2,
      name: "Pantalon en lin",
      price: 49.99,
      image: "/placeholder.svg",
      category: "Vêtements",
      size: "L",
      color: "Beige",
    },
    {
      id: 3,
      name: "Robe d'été",
      price: 29.99,
      image: "/placeholder.svg",
      category: "Vêtements",
      size: "S",
      color: "Bleu",
    },
    {
      id: 4,
      name: "Chaussures de sport",
      price: 59.99,
      image: "../public/blackShoe.jpg",
      category: "Chaussures",
      size: "42",
      color: "Blanc",
    },
    {
      id: 5,
      name: "Sac à dos",
      price: 39.99,
      image: "/placeholder.svg",
      category: "Accessoires",
      size: "Unique",
      color: "Gris",
    },
    {
      id: 6,
      name: "Chapeau de soleil",
      price: 14.99,
      image: "/placeholder.svg",
      category: "Accessoires",
      size: "Unique",
      color: "Beige",
    },
  ]
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false
      }
    //   if (selectedFilters.price.min > product.price || selectedFilters.price.max < product.price) {
    //     return false
    //   }
      if (selectedFilters.size.length > 0 && !selectedFilters.size.includes(product.size)) {
        return false
      }
      if (selectedFilters.color.length > 0 && !selectedFilters.color.includes(product.color)) {
        return false
      }
      return true
    })
  }, [selectedFilters])
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Produits</h1>
        {Object.values(selectedFilters).some((value) => value.length > 0 
        ) && (
          <Button variant="outline" onClick={handleClearFilters}>
            Effacer les filtres
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="grid gap-6">
          <Accordion type="single" collapsible className="">
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Catégorie</AccordionTrigger>
              <AccordionContent>
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
                      checked={selectedFilters.category.includes("Chaussures")}
                      onCheckedChange={() => handleFilterChange("category", "Chaussures")}
                    />                
                    Chaussures
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.category.includes("Accessoires")}
                      onCheckedChange={() => handleFilterChange("category", "Accessoires")}
                    />
                    Accessoires
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="price">
              <AccordionTrigger className="text-base">Prix</AccordionTrigger>
              <AccordionContent>
                <div />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="size">
              <AccordionTrigger className="text-base">Taille</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.size.includes("S")}
                      onCheckedChange={() => handleFilterChange("size", "S")}
                    />
                    S
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.size.includes("M")}
                      onCheckedChange={() => handleFilterChange("size", "M")}
                    />
                    M
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.size.includes("L")}
                      onCheckedChange={() => handleFilterChange("size", "L")}
                    />
                    L
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.size.includes("XL")}
                      onCheckedChange={() => handleFilterChange("size", "XL")}
                    />
                    XL
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="color">
              <AccordionTrigger className="text-base">Couleur</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("Noir")}
                      onCheckedChange={() => handleFilterChange("color", "Noir")}
                    />
                    Noir
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("Blanc")}
                      onCheckedChange={() => handleFilterChange("color", "Blanc")}
                    />
                    Blanc
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("Bleu")}
                      onCheckedChange={() => handleFilterChange("color", "Bleu")}
                    />
                    Bleu
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("Beige")}
                      onCheckedChange={() => handleFilterChange("color", "Beige")}
                    />
                    Beige
                  </Label>
                  <Label className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={selectedFilters.color.includes("Gris")}
                      onCheckedChange={() => handleFilterChange("color", "Gris")}
                    />
                    Gris
                  </Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="grid gap-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="grid gap-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    <Button variant="outline">Ajouter au panier</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}