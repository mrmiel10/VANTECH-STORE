 const formatDateToLocal = (
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
  const date = new Date()
  const dateFormat = formatDateToLocal(date.toDateString())
  console.log(dateFormat)
  console.log(date.getDate,date.getDay())