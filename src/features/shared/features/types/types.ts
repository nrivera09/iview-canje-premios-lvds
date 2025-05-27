export type PrizeGroupType = "A" | "B" | "C";

export interface PrizeProduct {
  id: string;
  nameProduct: string;
  imgProduct: string;
  stock: number;
  imagenBase64?: string;
}

export interface DetailsPrize {
  id: number;
  puntos: number;
  puntosFalta: number;
  puntosMin: number;
  canjeado: boolean;
}

export interface PrizeGroup {
  type: PrizeGroupType;
  products: PrizeProduct[];
  detailSlide: DetailsPrize;
}

export interface CanjeRequest {
  promocionid: number;
  tarjeta: number;
  regalo: number;
  asset: number;
  puntos: number;
}

export interface SlideTypeAProps {
  slide: PrizeGroup;
}

export interface UserPromotion {
  promocion: string;
  puntos: number;
  puntos_Falta: number;
  puntos_Min: number;
  canjeado: boolean;
  promocion_Tipo_Id: number;
}

export interface UserStore {
  promociones: UserPromotion[];
  isLoading: boolean;
  tarjeta: string;
  setTarjeta: (t: string) => void;
  fetchPromociones: (tarjeta: string) => Promise<void>;
}