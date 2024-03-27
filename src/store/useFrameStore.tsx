import { create } from "zustand";

type FrameData = {
  fileUrl: string;
  urlHandle?: string;
  caption?: string;
};

type State = {
  currentTab: string;
  frameData: FrameData;
};

type Action = {
  updateCurrentTab: (tab: string) => void;
  updateFileUrl: (url: string) => void;
  updateDetails: (details: Omit<FrameData, "fileUrl">) => void;
};

export const useFrameStore = create<State & Action>()((set) => ({
  currentTab: "frame",
  frameData: { fileUrl: "", urlHandle: "", caption: "" },

  updateCurrentTab: (tab) => set(() => ({ currentTab: tab })),
  updateFileUrl: (url) =>
    set((state) => ({
      frameData: {
        ...state.frameData,
        fileUrl: url,
      },
    })),
  updateDetails: (details) =>
    set((state) => ({
      frameData: {
        ...state.frameData,
        ...details,
      },
    })),
}));
