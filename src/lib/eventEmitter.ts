import { EventEmitter } from 'events';

// Prevent multiple instances in development
const globalForEvents = global as unknown as { ticketEventEmitter: EventEmitter };

export const ticketEventEmitter = globalForEvents.ticketEventEmitter || new EventEmitter();

if (process.env.NODE_ENV !== 'production') {
  globalForEvents.ticketEventEmitter = ticketEventEmitter;
}
