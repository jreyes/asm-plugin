import { Injectable } from '@angular/core';
import { Event } from './event';
import { EventHandler } from './event-handler';
import { HandlerRegistration } from './handler-registration';

/**
 * Dispatches Events to interested parties.
 *
 * Eases decoupling by allowing objects to interact without having direct
 * dependencies upon one another, and without requiring event sources to
 * deal with maintaining handler lists.
 *
 * There will typically be one EventBus per application, broadcasting
 * events that may be of general interest.
 */
@Injectable()
export class EventBus {

  private handlers = new Map<string, Array<EventHandler<Event>>>();

  /**
   * Adds an event handler to receive events of a given type.
   * Returns a handler registration used to deregister.
   */
  public on<T extends Event>(event: T, handler: EventHandler<T>): HandlerRegistration {

    let h = this.handlers.get(event.name);
    if (h == null) {
      h = [];
      this.handlers.set(event.name, h);
    }

    h.push(handler);
    return {
      unregister: () => {
        let registeredHandlers = this.handlers.get(event.name) || [];
        let index = registeredHandlers.indexOf(handler);
        if (index === -1) {
          throw new Error('Event handler not registered.');
        }
        registeredHandlers.splice(index, 1);
        if (registeredHandlers.length === 0) {
          this.handlers.delete(event.name);
        }
      }
    };
  }

  /**
   * Fires a given event to all handlers listening to it.
   */
  public emit(event: Event) {
    let handlers = this.handlers.get(event.name) || [];
    handlers.forEach((h) => {
      h(event);
    });
  }
}
