import { isEnvBrowser } from "@/utils/misc";

export class Post<T = unknown> {
  private eventName: string;
  private data?: unknown;
  private mockData?: T;

  private constructor(eventName: string, data?: unknown, mockData?: T) {
    this.eventName = eventName;
    this.data = data;
    this.mockData = mockData;
  }

  public static async create<T>(
    eventName: string,
    data?: unknown,
    mockData?: T,
  ): Promise<T> {
    const instance = new Post(eventName, data, mockData);
    return instance.execute();
  }

  private async execute(): Promise<T> {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(this.data),
    };

    if (isEnvBrowser() && this.mockData) {
      return this.mockData;
    }

    const resourceName = (window as any).GetParentResourceName
      ? (window as any).GetParentResourceName()
      : "nui-frame-app";

    try {
      const resp = await fetch(
        `https://${resourceName}/${this.eventName}`,
        options,
      );
      const respFormatted = await resp.json();
      return respFormatted;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
