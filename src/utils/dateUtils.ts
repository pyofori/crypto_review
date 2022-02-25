
/**
 * This method converts an epoch timestamp to a date string and returns it.
 * @param {string} date
 */
export const getDateFromEpoch = (date: number) => {
        let d = new Date(date  * 1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * This method checks if a string is a valid date
 * @param {string} dateStr
 */
export const isValidDate = (dateStr:string) =>{
    return !isNaN(new Date(dateStr).getDate());
}


