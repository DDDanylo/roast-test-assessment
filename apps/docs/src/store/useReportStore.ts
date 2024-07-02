import { create } from "zustand";

type ReportStore = {
  photos: File[];
  bulkSetImages: (photos: File[]) => void;
  resetImages: () => void;
};

const initialState = { photos: [] };

export const useReportStore = create<ReportStore>((set, _) => ({
  ...initialState,
  bulkSetImages: (photos: File[]) => {
    set({ photos });
  },
  resetImages: () => set({ photos: [] }),
}));
