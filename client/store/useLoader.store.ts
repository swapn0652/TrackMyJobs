import { create } from "zustand";

type LoaderState = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));
