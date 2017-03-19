/**
 * Registration objects returned when an event handler is added,
 * used to deregister.
 */
export interface HandlerRegistration {

  /**
   * Deregisters the handler associated with this registration object.
   */
  unregister(): void;
}
