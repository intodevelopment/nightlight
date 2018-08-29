export class DateUtil {
  
  /**
   * Subtract two dates and return the time in ms.
   * @param date1 
   * @param date2 
   * @returns The difference in ms
   */
  public static subtract(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  /**
   * Check if a date and time is within a certain range assuming the same date
   * @returns {boolean} True if dateAndTime is >= startDate and dateTime <= endDate, otherwise false
   */
  public static isWithinTimeRange(dateAndTime: Date, startDate: Date, endDate: Date): boolean {
    return dateAndTime.getHours() > startDate.getHours() && dateAndTime.getHours() < endDate.getHours()
      || (dateAndTime.getHours() === startDate.getHours() && dateAndTime.getMinutes() >= startDate.getMinutes())
      || (dateAndTime.getHours() === endDate.getHours() && dateAndTime.getMinutes() < endDate.getMinutes());
  }

  /**
   * Parse a time string and return the current date with the parsed time
   * @param str A time string in the form of 23:59
   */
  public static parseTime(str: string): Date | null{
    if(str !== null){
      let time = str.split(':');
      if(time.length === 2){
        let date = new Date();
        let hours = parseInt(time[0]);
        if(hours >= 0 && hours <= 23){
          date.setHours(hours);
          let minutes = parseInt(time[1]);
          if(minutes >= 0 && minutes <= 59){
            date.setMinutes(minutes);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
          }
        }
      }
    }
    return null;
  }

}