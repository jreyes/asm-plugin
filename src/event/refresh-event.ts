import { Event } from './event';

export class RefreshEvent implements Event {
  public name: string = 'refresh';

  constructor(public selector?: string) {
  }
}
