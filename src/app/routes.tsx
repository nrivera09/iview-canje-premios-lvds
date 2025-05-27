import Prizes from "@/features/prizes/pages/Prizes";
import PrizeDetail from "@/features/prizes/pages/PrizeDetail";
import { RouteConfig, RouteKey } from "@/features/shared/app/types";

export const ROUTES: Record<RouteKey, RouteConfig> = {
  prize: {
    key: "prize",
    component: Prizes,
  },
  prizeDetail: {
    key: "prizeDetail",
    component: PrizeDetail,
  },
};
export type { RouteKey };
