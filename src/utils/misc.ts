import clsx from "clsx";
import { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;
export const noop = () => {};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
