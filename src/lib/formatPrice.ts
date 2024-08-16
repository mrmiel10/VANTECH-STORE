export const formatPrice = (amount?:number) => {
    if(amount){
        return new Intl.NumberFormat
        ('en-FR',{
            style:'currency',
            currency:'XAF'
        }).format(amount)
    }
    }
  