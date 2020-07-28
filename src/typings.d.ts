import SuperExpressive from "super-expressive";

declare global {
  interface Window {
    SuperExpressive: typeof SuperExpressive;
  }
}
