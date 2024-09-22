import { create } from "zustand";

export type PublishFrame = {
  file: File | null;
  url: string;
  type: "active" | "draft" | "private";
  title: string;
  handle?: string;
  caption?: string;
};

type State = {
  frameDetails: PublishFrame;
};

type Action = {
  updateFile: ({ url, file }: { url: string; file: File }) => void;
  updateDetails: (details: Partial<PublishFrame>) => void;
  resetDetails: () => void;
};

const defaultDetails: PublishFrame = {
  file: null,
  url: "",
  type: "active",
  title: "",
  handle: "",
  caption: "",
};

export const usePublishStore = create<State & Action>()((set) => ({
  frameDetails: defaultDetails,
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

  resetDetails: () =>
    set(() => ({
      frameDetails: defaultDetails,
    })),
}));
