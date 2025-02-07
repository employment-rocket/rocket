import { create } from "zustand";

export const useHeaderHeightStore = create((set) => ({
	headerHeight: 0,
	setHeaderHeight: (height) => set({ headerHeight: height }),
}));
