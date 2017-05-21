import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

/**
 * An utility service for date.
 */
@Injectable()
export class DateUtils {

  private pattern = 'yyyy-MM-dd';

  constructor(private datePipe: DatePipe) {
  }

  /**
   * Method to convert the date time from server into JS date object
   */
  public convertDateTimeFromServer(date: any) {
    if (date) {
      return new Date(date);
    } else {
      return null;
    }
  }

  /**
   * Method to convert the date from server into JS date object
   */
  public convertLocalDateFromServer(date: any) {
    if (date) {
      let dateString = date.split('-');
      return new Date(dateString[0], dateString[1] - 1, dateString[2]);
    }
    return null;
  }

  /**
   * Method to convert the JS date object into specified date pattern
   */
  public convertLocalDateToServer(date: any, pattern = this.pattern) {
    if (date) {
      let newDate = new Date(date.year, date.month - 1, date.day);
      return this.datePipe.transform(newDate, pattern);
    } else {
      return null;
    }
  }

  /**
   * Method to get the default date pattern
   */
  public dateformat() {
    return this.pattern;
  }

  // TODO Change this method when moving from datetime-local input to NgbDatePicker
  public toDate(date: any): Date {
    if (date === undefined || date === null) {
      return null;
    }
    let dateParts = date.split(/\D+/);
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4]);
  }
}
