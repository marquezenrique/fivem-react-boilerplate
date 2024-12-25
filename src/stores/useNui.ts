import { create } from "zustand";

type Data = object;

interface NuiFrame {
  current: Data;
  set: (current: Data) => void;
}

export const useNui = create<NuiFrame>((set: any) => ({
  current: {},
  set: (current: Data) => set({ current }),
}));
