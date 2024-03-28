import { create } from "zustand";
import { nanoid } from "nanoid";

type FrameData = {
  fileUrl: string;
  title: string;
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
  frameData: {
    fileUrl: "",
    title: "",
    urlHandle: nanoid(12).toLowerCase(),
    caption: "",
  },

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
