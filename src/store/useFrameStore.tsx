import { create } from "zustand";

type State = {
  currentTab: string;
  imgFileUrl: string;
};

type Action = {
  updateCurrentTab: (tab: string) => void;
  updateImgFileUrl: (url: string) => void;
};

export const useFrameStore = create<State & Action>()((set) => ({
  currentTab: "frame",
  imgFileUrl: "",

  updateCurrentTab: (tab) => set(() => ({ currentTab: tab })),
  updateImgFileUrl: (url) => set(() => ({ imgFileUrl: url })),
}));
