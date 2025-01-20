import { create } from "zustand";

const useProfileStore = create((set) => ({
  profileImage: "default",
  setProfileImage: (newImage) => set({ profileImage: newImage }),
}));

export default useProfileStore;
