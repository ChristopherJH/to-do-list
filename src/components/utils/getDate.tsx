/**
 * Formats a specified date as yyyy-mm-dd
 * @param {number} daysFromToday - Number of days from specified/todays date
 * @param {string} specifyDate - Optional date to specify
 * @returns {string}
 */
export function getDate(
  daysFromToday: number,
  specifyDate: string | null = null
): string {
  let someDate;
  if (specifyDate === null) {
    someDate = new Date();
  } else {
    someDate = new Date(specifyDate);
  }
  someDate.setDate(someDate.getDate() + daysFromToday);
  const day = someDate.getDate();
  const isSingleDigitDay = day.toString().length === 1;
  const newDate =
    someDate.getFullYear() +
    "-" +
    (someDate.getMonth() + 1) +
    "-" +
    (isSingleDigitDay ? "0" : "") +
    day;
  return newDate;
}
