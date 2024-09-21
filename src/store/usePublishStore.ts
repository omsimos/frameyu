import { create } from "zustand";

type Frame = {
  file: File | null;
  url: string;
  type: "active" | "draft" | "private";
  title: string;
  handle: string;
  caption?: string;
};

type State = {
  frameDetails: Frame;
};

type Action = {
  updateFile: ({ url, file }: { url: string; file: File }) => void;
  updateDetails: (details: Partial<Frame>) => void;
  reset: () => void;
};

export const usePublishStore = create<State & Action>()((set) => ({
  frameDetails: {
    file: null,
    url: "",
    type: "active",
    title: "",
    handle: "",
    caption: "",
  },

  updateFile: ({ url, file }) =>
    set((state) => ({
      frameDetails: {
        ...state.frameDetails,
        url,
        file,
      },
    })),

  updateDetails: (details) =>
    set((state) => ({
      frameDetails: {
        ...state.frameDetails,
        ...details,
      },
    })),

  reset: () =>
    set(() => ({
      frameDetails: {
        file: null,
        url: "",
        type: "active",
        title: "",
        caption: "",
        handle: "",
      },
    })),
}));
