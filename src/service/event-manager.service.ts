import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

/**
 * An utily class to manage RX events
 */
@Injectable()
export class EventManager {

  private observable: Observable<any>;
  private observer: Observer<any>;

  constructor() {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    }).share();
  }

  /**
   * Method to broadcast the event to observer
   */
  public broadcast(event: any) {
    if (this.observer != null) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   */
  public subscribe(eventName: any, callback: any) {
    return this.observable.filter((event) => {
      return event.name === eventName;
    }).subscribe(callback);
  }

  /**
   * Method to unsubscribe the subscription
   */
  public destroy(subscriber: Subscription) {
    subscriber.unsubscribe();
  }
}
