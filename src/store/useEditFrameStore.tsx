import { create } from "zustand";

type State = {
  data: {
    id?: string;
    title?: string;
    handle?: string;
    imgUrl?: string;
    caption?: string | null;
  };
};

type Action = {
  updateEditData: (data: State["data"]) => void;
};

export const useEditFrameStore = create<State & Action>()((set) => ({
  data: {},
  updateEditData: (data) => set(() => ({ data })),
}));
