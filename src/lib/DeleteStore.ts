import { create } from "zustand";
import { SchemaSafeImages } from "../../schemas/schema";
import { z } from "zod";
export type ImagesProductType = z.infer<typeof SchemaSafeImages>;
export const useModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}>((set) =>({
  
  isOpen: false,
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export const useDeleteProductModal = create<{
  product: {
    images: ImagesProductType | null;
    idProduct: string | null;
  };

  setProduct: (productId: string, images: ImagesProductType) => void;
}>((set) => ({
  product: {
    images: null,
    idProduct: null,
  },

  setProduct: (idProduct: string, images: ImagesProductType) =>
    set({ product: { idProduct, images } }),
}));
export const useDeleteAdminModal = create<{
 adminId:string | null

  setAdmin: (adminId:string) => void;
}>((set) => ({
  adminId: null,
  setAdmin: (adminId:string) =>
    set({adminId }),
}));
