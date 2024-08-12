import React from 'react'
import { Card } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
const AdminSearchItems = ({placeholder}:{
    placeholder:string
}) => {
  return (
    <Card className="px-16 py-8 flex">
            <div className="relative  w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={placeholder}
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </Card>
  )
}

export default AdminSearchItems