import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import check from "@/shared/assets/lotties/check.json";
import fireworks from "@/shared/assets/lotties/confetti.json";
import { usePrizesStore } from "@/shared/store/prizesStore";
import { MdOutlineRedeem } from "react-icons/md";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { useStockSignalR } from "@/shared/hooks/useStockSignalR";

const SlideTypeADetailConfirmation = () => {
  const { playSound } = useSoundEffect();
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  const setOpenPrizeRedeem = usePrizesStore(
    (state) => state.setOpenPrizeRedeem
  );

  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );

  const handleHover = () => playSound("pin");

  const handleGoBack = () => {
    playSound("button");
    setOpenPrizeRedeem(false);
    setOpenPrizeDetail(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: check,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptionsOk = {
    loop: false,
    autoplay: true,
    animationData: fireworks,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const eventListeners: { eventName: "complete"; callback: () => void }[] = [
    {
      eventName: "complete",
      callback: () => setShowAnimation(false),
    },
  ];

  return (
    <>
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-[100dvh] shadow-xl   z-50 bg-black/80 backdrop-blur-sm">
        <div className="container ">
          <div className="bg-white rounded-xl shadow-md w-[500px] max-w-full px-4 py-6 mx-auto">
            <div className="container">
              <div className="overflow-hidden flex items-center justify-center w-[270px] mx-auto h-[50px]">
                <div className="absolute mt-[-60px] left-0 w-full">
                  <Lottie options={defaultOptions} height={300} width={270} />
                </div>
              </div>
              <p className="font-bold text-[25px] sm:text-[32px] mb-5 leading-7 sm:leading-10 text-black">
                ¡SE REALIZÓ SU CANJE EXITOSAMENTE!
              </p>
              <span className="text-black block mb-5   text-[15px] leading-5 sm:text-[20px] sm:leading-5 font-normal ">
                Su regalo ha sido reservado para usted en Counter, no olvide
                recogerlo antes de reitrarse ¡Gracias!
              </span>
              <button
                onMouseEnter={handleHover}
                onClick={handleGoBack}
                className="mx-auto bg-blue-950 h-[50px] sm:h-[55px] px-5 flex items-center justify-center border border-white rounded-md "
              >
                <p className="gap-3 text-[20px] flex items-center justify-center sm:text-[20px] font-bold text-white">
                  <MdOutlineRedeem className="text-[35px]" />

                  <span>IR AL INICIO</span>
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAnimation && (
        <div className="absolute left-0 top-0 w-full h-[100dvh] flex items-center justify-center z-50">
          <Lottie
            options={defaultOptionsOk}
            height={`100%`}
            width={`100%`}
            speed={1.1}
            eventListeners={eventListeners}
          />
        </div>
      )}
    </>
  );
};

export default SlideTypeADetailConfirmation;
