/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GL2oV0nB1Dc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <h1 className="text-2xl font-bold tracking-tight">Explore Our Product Categories</h1>
          <p className="text-muted-foreground md:text-lg">
            Browse through our wide range of product categories to find the perfect fit for your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Apparel</h3>
              <p className="text-sm text-muted-foreground">Discover the latest fashion trends.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Electronics</h3>
              <p className="text-sm text-muted-foreground">Upgrade your tech with our latest gadgets.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Home &amp; Garden</h3>
              <p className="text-sm text-muted-foreground">Transform your living space with our home essentials.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Sports &amp; Outdoors</h3>
              <p className="text-sm text-muted-foreground">Gear up for your next adventure.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Beauty &amp; Personal Care</h3>
              <p className="text-sm text-muted-foreground">Pamper yourself with our premium products.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Toys &amp; Games</h3>
              <p className="text-sm text-muted-foreground">Discover the perfect playtime essentials.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Automotive</h3>
              <p className="text-sm text-muted-foreground">Keep your ride in top shape.</p>
            </div>
          </div>
          <div className="relative group rounded-lg overflow-hidden">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Category</span>
            </Link>
            <img
              src="/placeholder.svg"
              alt="Category Image"
              width={400}
              height={300}
              className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg font-semibold">Books &amp; Media</h3>
              <p className="text-sm text-muted-foreground">Expand your horizons with our curated selection.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}