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
import SlideTypeBConfirmation from "./SlideTypeADetailConfirmation";
import LoaderImageDetail from "@/shared/components/LoaderImageDetail";
import { SlideTypeADetailInfoProps } from "../../types/prize.types";
import SlideTypeAConfirmation from "./SlideTypeAConfirmation";

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
  const tarjetaId = usePrizesStore((state) => state.tarjetaId);
  const cardId = usePrizesStore((state) => state.cardId);

  const puntos = pointsByStorage === 0 ? details.puntos : pointsByStorage;
  const detailsCanjeado = canExchange !== null ? canExchange : details.canjeado;

  const { canjearPremio } = usePrizesStore.getState();
  const tarjeta = cardId !== "0" ? cardId : tarjetaId;
  const { playSound } = useSoundEffect();
  const fetchImagen = usePrizesStore((state) => state.fetchImagen);
  const [imagen, setImagen] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    const nombre = product.imgProduct?.split(".")[0] ?? "";
    fetchImagen(nombre).then((img) => {
      setImagen(img);
      //setLoadingImg(false);
      setTimeout(() => {
        setLoadingImg(false);
      }, 1000);
    });
  }, [product.imgProduct, fetchImagen]);

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");

  const isOutOfStock = product.stock === 0;

  const handleRedeem = async (regalo: string) => {
    setConfirmation(!confirmation);
    setProductId(product.id);
  };

  const handleRedeemOk = async () => {
    const success = await canjearPremio({
      promocionid: details.id,
      tarjeta: parseInt(insertZeroAfterTwoDigits(tarjeta)),
      regalo: parseInt(productId),
      asset: assetbyStorage === 0 ? generateUniqueNumber(5) : assetbyStorage,
      puntos: puntos,
    });
    if (success) {
      setConfirmation(!confirmation);
      setOpenPrizeRedeem(true);
    }
  };

  const hideConfirmation = () => {
    setConfirmation(!confirmation);
  };

  return (
    <>
      <div className="flex flex-row cursor-pointer gap-2 flex-1">
        <div
          onMouseEnter={handleHover}
          onClick={() => {
            handleClick();
            handleOpenModal?.();
          }}
          className={`relative cursor-pointer  h-full rounded-sm p-[10px] bg-no-repeat  bg-center overflow-hidden flex items-center justify-center transition-all mx-auto w-[40%] ${
            isOutOfStock ? "opacity-40 pointer-events-none" : ""
          }`}
          style={{
            backgroundImage: `url(${marco})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="container w-full h-full rounded-sm  flex items-center justify-center">
            <div className="infoProduct uppercase flex-col flex items-center justify-center gap-1 w-full">
              {loadingImg ? (
                <div className="hiddenx">
                  <LoaderImageDetail />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center min-h-[27px]">
                    <p className="line-clamp-2 text-center font-bold text-[9px] leading-[10px] text-black">
                      {product.nameProduct}
                    </p>
                  </div>
                  <img
                    src={imagen || `/fallback/url/${product.imgProduct}`}
                    alt={product.nameProduct}
                    className="w-[40%]  h-auto object-contain rounded-md"
                  />
                </>
              )}
            </div>
          </div>
          {isOutOfStock && (
            <img
              src={agotado}
              alt="Agotado"
              className="absolute min-w-[100%] xs:ml-[-5px] sm:ml-0"
            />
          )}
          <div
            style={{
              backgroundImage: `url(${bgPts})`,
              backgroundSize: "100px 35px",
            }}
            className="flex items-center justify-center absolute bottom-[-6px]  bg-no-repeat bg-center w-[150px] sm:w-[180px] h-[50px] "
          >
            <p className="font-bold relative top-[7px] text-[10px]">
              {details.puntosMin} PTS
            </p>
          </div>
        </div>
        <div className="flex flex-1 pl-[28px] items-center justify-center">
          <div className="container">
            <div className="flex items-center justify-center min-h-[27px] w-full">
              <p className="line-clamp-2 text-center font-bold text-[12px] leading-[14px] text-white">
                {product.nameProduct}
              </p>
            </div>
            {puntos < details.puntosMin ? (
              <div
                style={{
                  backgroundImage: `url(${bgFaltanPts})`,
                  backgroundSize: "100% 40px",
                }}
                className="mx-auto flex items-center justify-center bg-no-repeat  bg-bottom w-[150px] h-[40px] mt-2"
              >
                <p className="font-bold text-black relative  leading-[12px] text-[11px]">
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
                  className="font-bold text-xl bg-red-900 hover:bg-red-600 p-1 rounded-full overflow-hidden min-w-[150px]  mx-auto transition-all cursor-pointer hover:shadow-xl min-h-[40px] flex"
                >
                  <div className="bg-red-600 text-white min-h-full  flex items-center justify-center rounded-full text-[12px]  font-bold transition-all w-full">
                    <p className="relative top-[2px] px-2">CANJEAR </p>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>
      {openPrizeRedeem && <SlideTypeBConfirmation></SlideTypeBConfirmation>}
      {confirmation && (
        <SlideTypeAConfirmation
          hideConfirmation={hideConfirmation}
          handleRedeemOk={handleRedeemOk}
        ></SlideTypeAConfirmation>
      )}
    </>
  );
};

export default SlideTypeADetailInfo;
