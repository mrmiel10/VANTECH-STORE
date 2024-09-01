export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'fr-FR',
  ) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
  };
  export const formatPrice = (amount:number) => {
    
    return new Intl.NumberFormat
    ('en-FR',{
        style:'currency',
        currency:'XAF'
    }).format(amount)

}
export const formatNumber = (nbr:number) =>{
  return nbr < 10 ? "0" + nbr : nbr
}