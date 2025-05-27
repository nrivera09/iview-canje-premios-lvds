import { PrizeGroup } from "../features/types/types";

export type RouteKey = "prize" | "prizeDetail";

export interface RouteConfig {
  key: RouteKey;
  component: React.FC;
}

export interface SlideRendererProps {
  slide: PrizeGroup;
}

export interface RouterState {
  currentRoute: RouteKey;
  params: Record<string, any>;
  navigate: (route: RouteKey, params?: Record<string, any>) => void;
}

export interface HackIviewProps {
  hideIviewHack: () => void;
}

export interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
