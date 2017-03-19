import { Event } from './event';

/**
 * An event handler.
 */
export type EventHandler<T extends Event> = (event: T) => void;
