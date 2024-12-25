import { NuiDebugEventFrame } from "@/types";
import { isEnvBrowser } from "./misc";

export class Debugger {
  private events: NuiDebugEventFrame[];
  private timer: number = 1000;

  constructor(events: NuiDebugEventFrame[], timer?: number) {
    this.events = events;
    if (timer) {
      this.timer = timer;
    }
    if (isEnvBrowser()) {
      this.startProcessing();
    }
  }

  private startProcessing(): void {
    this.events.forEach((event) => {
      setTimeout(() => {
        this.handleEvent(event);
      }, this.timer);
    });
  }

  private handleEvent(event: NuiDebugEventFrame): void {
    console.log("Processing event:", event);
    setTimeout(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: { ...event },
        }),
      );
    });
  }
}
