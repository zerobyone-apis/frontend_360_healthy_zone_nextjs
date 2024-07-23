/*
    This function will parse a date string and return a formatted date string
    from the server date, example: 2024-07-13T21:09:51.439543Z
    in the format of "July 13, 2024"
    @param date: string - the date string to parse    
*/

export default function parseServerDate (date: string): string {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const dateObj = new Date(date);
        const month = months[dateObj.getMonth()];
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`;
    };