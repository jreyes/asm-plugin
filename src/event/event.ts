/**
 * An Event Bus event.
 *
 * Subclasses must define a unique and immutable 'name'.
 */
export interface Event {
  name: string;
}

export abstract class AbstractEvent implements Event {
  public abstract name: string;
}
