// src/libs/altenar.ts

type DisplayListener = (data: any) => void;

export class IViewCoreService {
  private displayListener: DisplayListener | null = null;
  private eventListener: (event: MessageEvent) => void;

  constructor() {
    this.eventListener = (event) => this.handleIncomingMessage(event);
    this.register();
  }

  private register() {
    window.addEventListener("message", this.eventListener);
  }

  private handleIncomingMessage(event: MessageEvent) {
    const eventData = event.data;
    if (eventData.cmd) {
      const eventType = eventData.cmd.toLowerCase();
      if (eventType === "update-corevariables") {
        console.log("DATA =", eventData.data);
        if (this.displayListener) {
          this.displayListener(eventData.data);
        }
      }
    }
  }

  addListener(listener: DisplayListener) {
    this.displayListener = listener;
  }

  removeListener() {
    this.displayListener = null;
  }

  fireAction(url: string) {
    const data: Record<string, string> = {};
    url = url.slice(1);
    const paramIdx = url.indexOf("?");

    if (paramIdx !== -1) {
      const queryParams = url.slice(paramIdx + 1);
      url = url.slice(0, paramIdx);
      const urlParams = new URLSearchParams(queryParams);
      urlParams.forEach((v, k) => {
        data[k] = v;
      });
    }

    this.sendToServer(url, data);
  }

  private sendToServer(eventName: string, data: Record<string, string>) {
    this.sendToParent({
      $type: eventName,
      ...data,
    });
  }

  private sendToParent(data: any) {
    window.parent.postMessage(
      {
        name: window.name,
        cmd: "sendToCore",
        data: data,
      },
      "*"
    );
  }

  dispose() {
    window.removeEventListener("message", this.eventListener);
  }
}
