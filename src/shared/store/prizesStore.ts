import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildUrl } from "@/shared/lib/config";
import { API_PATHS } from "@/shared/lib/apiPaths";
import {
  CanjeRequest,
  DetailsPrize,
  PrizeGroup,
} from "@/features/shared/features/types/types";
import { PrizesStore } from "@/features/prizes/types/prize.types";

export const usePrizesStore = create<PrizesStore>()(
  persist(
    (set, get) => ({
      premios: [],
      isLoading: false,
      fetchPremios: async (tarjeta: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.REGALOS)}?tarjeta=${tarjeta}`
          );
          if (!response.ok)
            throw new Error("Error de red al obtener datos: REGALOS");
          const data = await response.json();

          const groups: PrizeGroup[] = await Promise.all(
            data.map(async (promo: any) => {
              const products = await Promise.all(
                (promo.lista_Regalos || []).map(async (regalo: any) => {
                  const nombre = regalo.nombreImagen?.split(".")[0] || "";
                  //const img = nombre ? await get().fetchImagen(nombre) : null;

                  return {
                    id: regalo.id.toString(),
                    nameProduct: regalo.nombre,
                    imgProduct: regalo.nombreImagen,
                    stock: regalo.stock,
                  };
                })
              );

              const detailSlide: DetailsPrize = {
                id: promo.id,
                puntos: promo.puntos,
                puntosFalta: promo.puntos_Falta,
                puntosMin: promo.puntos_Min,
                canjeado: promo.canjeado,
              };

              return {
                type: promo.tipo === "Canje" ? "A" : "B",
                products,
                detailSlide,
              };
            })
          );

          set({ premios: groups });
        } catch (error) {
          console.error("Error fetching premios:", error);
        } finally {
          set({ isLoading: false });
        }
      },
      fetchImagen: async (nombre: string) => {
        try {
          const response = await fetch(
            `${buildUrl(API_PATHS.REGALOS_IMAGEN)}?nombre=${nombre}`
          );

          const blob = await response.blob();

          return await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Error fetching imagen:", error);
          return null;
        }
      },
      canjearPremio: async (payload: CanjeRequest): Promise<boolean> => {
        try {
          const response = await fetch(`${buildUrl(API_PATHS.CANJEAR)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) throw new Error("Error en el canje del premio");

          const result = await response.json();

          if (result === true) {
            // Refrescar la data tras un canje exitoso
            //await get().fetchPremios(payload.tarjeta.toString());
          }

          return result === true;
        } catch (error) {
          console.error("Error al canjear premio:", error);
          return false;
        }
      },
      openPrizeDetail: false,
      openPrizeRedeem: false,
      tarjetaId: "0",
      cardId: "0",
      nroAsset: 0,
      nroPoint: 0,
      canExchange: null,
      view: "DM",
      setOpenPrizeDetail: (value) => set({ openPrizeDetail: value }),
      setOpenPrizeRedeem: (value) => set({ openPrizeRedeem: value }),
      setTarjetaId: (value) => set({ tarjetaId: value }),
      setCanExchange: (value: any) => set({ canExchange: value }),
      setCardId: (value) => set({ cardId: value }),
      setNroAsset: (value) => set({ nroAsset: value }),
      setView: (value) => set({ view: value }),
      setNroPoint: (value) => set({ nroPoint: value }),
    }),
    {
      name: "prizes-storage",
      version: 2,
      migrate: (persistedState, version) => {
        return {
          ...(persistedState || {}),
          openPrizeDetail: false,
          openPrizeRedeem: false,
          tarjetaId: "0",
          cardId: "0",
          nroPoint: 0,
          canExchange: null,
          nroAsset: 0,
          view: "",
        } as PrizesStore;
      },
    }
  )
);
