import { create } from "zustand";
import { nanoid } from "nanoid";

type FrameData = {
  file: File | null;
  imgUrl: string;
  title: string;
  urlHandle: string;
  caption?: string;
};

type State = {
  currentTab: string;
  frameData: FrameData;
  isPublishing: boolean;
};

type Action = {
  updateCurrentTab: (tab: string) => void;
  updateFileUrl: (imgUrl: string, file: File) => void;
  updateDetails: (details: Omit<FrameData, "imgUrl" | "file">) => void;
  updateIsPublishing: (isPublishing: boolean) => void;
};

export const useFrameStore = create<State & Action>()((set) => ({
  currentTab: "frame",
  frameData: {
    file: null,
    imgUrl: "",
    title: "",
    urlHandle: nanoid(12).toLowerCase(),
    caption: "",
  },
  isPublishing: false,

  updateCurrentTab: (tab) => set(() => ({ currentTab: tab })),
  updateFileUrl: (imgUrl, file) =>
    set((state) => ({
      frameData: {
        ...state.frameData,
        imgUrl,
        file,
      },
    })),
  updateDetails: (details) =>
    set((state) => ({
      frameData: {
        ...state.frameData,
        ...details,
      },
    })),

  updateIsPublishing: (isPublishing) => set(() => ({ isPublishing })),
}));
