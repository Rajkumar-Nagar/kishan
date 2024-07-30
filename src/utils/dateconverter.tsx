
export const Dateconverter = (dateStr: Date) => {
    const date = new Date(dateStr);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };

    // Convert to desired format
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate
}