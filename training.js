var formatDateToLocal = function (dateStr, locale) {
    if (locale === void 0) { locale = 'fr-FR'; }
    var date = new Date(dateStr);
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    var formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};
var date = new Date();
var dateFormat = formatDateToLocal(date.toDateString());
console.log(dateFormat);
console.log(date.getDate, date.getDay());
