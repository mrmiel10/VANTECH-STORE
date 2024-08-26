export const formatPrice = (amount:number) => {
    
        return new Intl.NumberFormat
        ('en-FR',{
            style:'currency',
            currency:'XAF'
        }).format(amount)
   
    }
  