import React, { useEffect, useState } from "react";
import { usePrizesStore } from "@/shared/store/prizesStore";

import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import marco from "@/shared/assets/img/marco_producto.png";
import agotado from "@/shared/assets/img/23.png";
import bgPts from "@/shared/assets/img/47.png";
import bgFaltanPts from "@/shared/assets/img/53.png";
import {
  generateUniqueNumber,
  insertZeroAfterTwoDigits,
} from "@/shared/lib/utils";
import { useUserStore } from "@/shared/store/userStore";
import SlideTypeADetailConfirmation from "../SlideTypeA/SlideTypeADetailConfirmation";
import LoaderImageDetail from "@/shared/components/LoaderImageDetail";
import { SlideTypeADetailInfoProps } from "../../types/prize.types";
import SlideTypeBDetailConfirmation from "./SlideTypeBDetailConfirmation";

const SlideTypeADetailInfo: React.FC<SlideTypeADetailInfoProps> = ({
  product,
  details,
  handleOpenModal,
}) => {
  const pointsByStorage = usePrizesStore((state) => state.nroPoint);
  const canExchange = usePrizesStore((state) => state.canExchange);
  const assetbyStorage = usePrizesStore((state) => state.nroAsset);
  const openPrizeRedeem = usePrizesStore((state) => state.openPrizeRedeem);
  const setOpenPrizeRedeem = usePrizesStore(
    (state) => state.setOpenPrizeRedeem
  );

  const puntos = pointsByStorage === 0 ? details.puntos : pointsByStorage;
  const detailsCanjeado = canExchange !== null ? canExchange : details.canjeado;

  const { canjearPremio } = usePrizesStore.getState();
  const tarjeta = useUserStore((state) => state.tarjeta);
  const { playSound } = useSoundEffect();
  const fetchImagen = usePrizesStore((state) => state.fetchImagen);
  const [imagen, setImagen] = useState<string | null>(null);
  const [loadingImg, setLoadingImg] = useState(true);

  useEffect(() => {
    const nombre = product.imgProduct?.split(".")[0] ?? "";
    fetchImagen(nombre).then((img) => {
      setImagen(img);
      //setLoadingImg(false);
      setTimeout(() => {
        setLoadingImg(false);
      }, 0);
    });
  }, [product.imgProduct, fetchImagen]);

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");

  const isOutOfStock = product.stock === 0;

  const handleRedeem = async (regalo: string) => {
    const success = await canjearPremio({
      promocionid: details.id,
      tarjeta: parseInt(insertZeroAfterTwoDigits(tarjeta)),
      regalo: parseInt(regalo),
      asset: assetbyStorage === 0 ? generateUniqueNumber(5) : assetbyStorage,
      puntos: puntos,
    });
    if (success) {
      setOpenPrizeRedeem(true);
    }
  };

  return (
    <>
      <div className="flex flex-col cursor-pointer">
        <div
          onMouseEnter={handleHover}
          onClick={() => {
            handleClick();
            handleOpenModal?.();
          }}
          className={`relative cursor-pointer w-[300px] h-[300px] xs:w-[200px] xs:h-[200px] sm:w-[350px] sm:h-[350px] rounded-sm p-[10px] bg-no-repeat bg-contain bg-center overflow-hidden flex items-center justify-center transition-all mx-auto ${
            isOutOfStock ? "opacity-40 pointer-events-none" : ""
          }`}
          style={{ backgroundImage: `url(${marco})` }}
        >
          <div className="container w-full h-full rounded-sm  flex items-center justify-center">
            <div className="infoProduct uppercase flex-col flex items-center justify-center gap-2 w-full">
              <p className="text-center font-bold text-[14px] xs:text-[11px] leading-4 min-h-[32px] flex items-center justify-center truncate-2-lines w-full text-black line-clamp-2 truncate-2-lines">
                {product.nameProduct}
              </p>
              {loadingImg ? (
                <div className="hiddenx">
                  <LoaderImageDetail />
                </div>
              ) : (
                <>
                  <img
                    src={imagen || `/fallback/url/${product.imgProduct}`}
                    alt={product.nameProduct}
                    className="w-[150px] sm:w-[200px] xs:w-[100px] h-auto object-contain rounded-md"
                  />
                </>
              )}
            </div>
          </div>
          {isOutOfStock && (
            <img
              src={agotado}
              alt="Agotado"
              className="absolute min-w-[100%] xs:w-[160px] sm:min-w-[400px] xs:ml-[-5px] sm:ml-0"
            />
          )}
          <div
            style={{ backgroundImage: `url(${bgPts})` }}
            className="flex items-center justify-center absolute bottom-[16px] xs:bottom-[8px] sm:bottom-[23px] bg-cover bg-no-repeat bg-center w-[150px] sm:w-[180px] h-[50px] "
          >
            <p className="font-bold relative top-[7px] font-mobile-12px">
              {details.puntosMin} PTS
            </p>
          </div>
        </div>
        {puntos < details.puntosMin ? (
          <div
            style={{ backgroundImage: `url(${bgFaltanPts})` }}
            className="mx-auto flex items-center justify-center bg-no-repeat bg-cover bg-bottom w-[200px] h-[70px] xs:w-[200px] xs:h-[70px] sm:w-[260px] sm:h-[89px] relative  xs:top-[-8px] top-[-8px] sm:top-[-10px]"
          >
            <p className="font-bold text-black relative  leading-5 font-mobile-12px">
              LE FALTAN {details.puntosFalta} PTS <br />
              PARA CANJEAR
            </p>
          </div>
        ) : (
          !isOutOfStock &&
          !detailsCanjeado &&
          puntos >= details.puntosMin && (
            <button
              onClick={() => handleRedeem(product.id)}
              className="font-bold text-xl bg-red-900 hover:bg-red-600 p-1 rounded-full overflow-hidden xs:min-w-[150px] min-w-[200px] sm:min-w-[300px] mx-auto transition-all cursor-pointer hover:shadow-xl"
            >
              <div className="bg-red-600 text-white h-[45px]  flex items-center justify-center rounded-full text-[20px] sm:text-[25px] font-bold transition-all ">
                <p className="relative top-[2px] px-2">CANJEAR </p>
              </div>
            </button>
          )
        )}
      </div>
      {openPrizeRedeem && <SlideTypeBDetailConfirmation />}
    </>
  );
};

export default SlideTypeADetailInfo;
