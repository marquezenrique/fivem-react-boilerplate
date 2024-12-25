import { MutableRefObject, useEffect, useRef } from "react";

type EventHandlerSignature<T = Event> = (event: T) => void;

class Listener<T extends Event = Event> {
  private event: string;
  private savedHandler: MutableRefObject<EventHandlerSignature<T>>;

  constructor(event: string, handler: EventHandlerSignature<T>) {
    this.event = event;
    this.savedHandler = useRef<EventHandlerSignature<T>>(handler);
  }

  setHandler(handler: EventHandlerSignature<T>) {
    this.savedHandler.current = handler;
  }

  listen(target: EventTarget) {
    const eventListener = (event: Event) => {
      this.savedHandler.current(event as T);
    };
    target.addEventListener(this.event, eventListener);
    return () => target.removeEventListener(this.event, eventListener);
  }
}

export const listen = <T extends Event = Event>(
  event: string,
  handler: EventHandlerSignature<T>,
  target: EventTarget = window,
) => {
  const listener = useRef(new Listener<T>(event, handler));

  useEffect(() => {
    listener.current.setHandler(handler);
  }, [handler]);

  useEffect(() => {
    return listener.current.listen(target);
  }, [event, target]);
};
