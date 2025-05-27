import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RouteKey, ROUTES } from "../routes";
import { RouterState } from "@/features/shared/app/types";

const enablePersistence = true; // Cambia a false si no deseas persistencia

const isValidRoute = (route: any): route is RouteKey => {
  return route in ROUTES;
};

export const useRouterStore = create<RouterState>()(
  enablePersistence
    ? persist(
        (set, get) => ({
          currentRoute: "prize",
          params: {},
          navigate: (route, params = {}) => {
            if (isValidRoute(route)) {
              set({ currentRoute: route, params });
            } else {
              console.warn(`Ruta inválida: ${route}`);
              set({ currentRoute: "prize", params: {} });
            }
          },
        }),
        {
          name: "router-storage",
          version: 1,
          migrate: (persistedState: any) => {
            if (!isValidRoute(persistedState?.currentRoute)) {
              return { currentRoute: "prize", params: {} };
            }
            return persistedState;
          },
        }
      )
    : (set) => ({
        currentRoute: "prize",
        params: {},
        navigate: (route, params = {}) => {
          if (isValidRoute(route)) {
            set({ currentRoute: route, params });
          } else {
            console.warn(`Ruta inválida: ${route}`);
            set({ currentRoute: "prize", params: {} });
          }
        },
      })
);
