import { create } from "zustand";

type State = {
  currentTab: string;
};

type Action = {
  updateCurrentTab: (tab: string) => void;
};

export const useFrameStore = create<State & Action>()((set) => ({
  currentTab: "frame",
  updateCurrentTab: (tab) => set(() => ({ currentTab: tab })),
}));
