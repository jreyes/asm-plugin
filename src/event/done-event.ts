import { Event } from './event';

export class DoneEvent implements Event {
  public name: string = 'done';

  constructor(public selector?: string) {
  }
}
