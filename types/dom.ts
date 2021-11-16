export interface DOMEvent<T extends EventTarget> extends Event {
  target: T
  charCode?: number
}
