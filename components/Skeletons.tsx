import { Skeleton } from '@/components/ui/skeleton'
export const ProductFeaturesLoading = () =>{
    return (
    <div className='container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-10 md:px-6 lg:max-w-7xl' >
    <Skeleton className=''/>
    <div className="grid gap-4">
              <div className="grid gap-2 ">
                <div className="flex items-center gap-8 text-muted-foreground">
                  <div className="space-x-2">
                  <Skeleton className='size-16' />
                  <Skeleton className='size-12' />
                
                  </div>
                
                  <div className="space-x-2">
                  <Skeleton className='size-16' />
                  <Skeleton className='size-12' />
                
                  </div>
                
                </div>
                <div className="space-y-3 h-auto">
                <Skeleton className='w-full h-8' />
                <Skeleton className='w-full h-20' />
                
                </div>
    
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex flex-col  gap-0.5">
                  <Skeleton className='w-8 h-8' />
                    <div className="flex items-center">
                    <Skeleton className='w-16 h-8' />
                    <Skeleton className='w-8 h-8' />
                    </div>
                   
                  </div>
                </div>
                <Skeleton className='w-8 h-12' />
              </div>
              <div className="grid gap-4">
               
               <div className='flex items-center gap-2'>
                <Skeleton className='size-8' />
                <div className='flex items-center gap-2'>
                    <Skeleton className='size-8' />
                    <Skeleton className='size-8' />
                    <Skeleton className='size-8' />
                </div>
               </div>
        
                 
    <Skeleton className='w-full h-8' />
                 
                 
              
              </div>
            </div>
    
    </div>
   ) }
    export const ProductCardLoading = () =>{
        return (
    <ProductFeaturesLoading />
    )
    }
    