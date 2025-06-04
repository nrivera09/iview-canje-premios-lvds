import {
  CanjeRequest,
  DetailsPrize,
  PrizeGroup,
  PrizeProduct,
} from "@/features/shared/features/types/types";

export interface SlideTypeABoxProps {
  product: PrizeProduct;
  handleOpenModal?: () => void;
}

export interface SlideTypeADetailProps {
  products: PrizeProduct[];
  details: DetailsPrize;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handleOpenModal: () => void;
}

export interface SlideTypeADetailFooterProps {
  stock: number;
}

export interface SlideTypeADetailInfoProps {
  product: PrizeProduct;
  details: DetailsPrize;
  handleOpenModal?: () => void;
}

export interface SlideTypeAFooterrops {
  details: DetailsPrize;
}

export interface SlideTypeAGridProps {
  products: PrizeProduct[];
  details: DetailsPrize;
}

export interface SlideTypeBProps {
  slide: PrizeGroup;
}

export interface SlideTypeBBoxProps {
  product: PrizeProduct;
  handleOpenModal?: () => void;
}

export interface SlideTypeBDetailProps {
  products: PrizeProduct[];
  details: DetailsPrize;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handleOpenModal: () => void;
}

export interface SlideTypeBDetailFooterProps {
  stock: number;
}

export interface SlideTypeBDetailInfoProps {
  product: PrizeProduct;
  details: DetailsPrize;
  handleOpenModal?: () => void;
}

export interface SlideTypeBFooterrops {
  details: DetailsPrize;
}

export interface SlideTypeBGridProps {
  products: PrizeProduct[];
  details: DetailsPrize;
}

export interface PrizesStore {
  premios: PrizeGroup[];
  isLoading: boolean;
  fetchPremios: (tarjeta: string) => Promise<void>;
  fetchImagen: (nombreImagen: string) => Promise<string | null>;
  canjearPremio: (data: CanjeRequest) => Promise<boolean>;
  openPrizeDetail: boolean;
  openPrizeRedeem: boolean;
  setOpenPrizeDetail: (value: boolean) => void;
  setOpenPrizeRedeem: (value: boolean) => void;
  tarjetaId: string;
  cardId: string;
  nroAsset: number;
  nroPoint: number;
  canExchange: any;
  view: string;
  setCanExchange: (value: any) => void;
  setTarjetaId: (value: string) => void;
  setCardId: (value: string) => void;
  setNroAsset: (value: number) => void;
  setNroPoint: (value: number) => void;
  setView: (value: string) => void;
}
