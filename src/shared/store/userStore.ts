import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildUrl } from "@/shared/lib/config";
import { API_PATHS } from "@/shared/lib/apiPaths";
import { UserStore } from "@/features/shared/features/types/types";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      promociones: [],
      isLoading: false,
      tarjeta: "",
      setTarjeta: (t: string) => set({ tarjeta: t }),
      fetchPromociones: async (tarjeta: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.PROMOCIONES)}?tarjeta=${tarjeta}`
          );
          if (!response.ok)
            throw new Error("Error de red al obtener datos: PROMOCIONES");
          const data = await response.json();
          set({ promociones: data });
        } catch (error) {
          console.error("Error fetching promociones:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
