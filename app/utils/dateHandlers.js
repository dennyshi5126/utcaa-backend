/**
 * Adds days to a date.
 * @param {Date} date the Date to add days on.
 * @param {Number} daysToAdd the number of days to add on top of date.
 */
export function addDays(date, daysToAdd) {
  return new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
}

/**
 * Adds hours to a date.
 * @param {Date} date the Date to add horus on.
 * @param {Number} hoursToAdd the number of hours to add on top of date.
 */
export function addHours(date, hoursToAdd) {
  return new Date(date.getTime() + hoursToAdd * 1000 * 60 * 60);
}

/**
 * Return true if first date is after the second data, or false otherwise.
 * @param {Date} firstDate
 * @param {Number} secondDate
 */
export function firstIsAfterSecondDate(firstDate, secondDate) {
  return firstDate > secondDate;
}
