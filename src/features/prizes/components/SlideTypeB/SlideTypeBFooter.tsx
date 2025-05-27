import { formatPercentage } from "@/shared/lib/utils";
import React, { FC } from "react";
import { SlideTypeBFooterrops } from "../../types/prize.types";

const SlideTypeBFooter: FC<SlideTypeBFooterrops> = ({ details }) => {
  const calcularPorcentaje = (
    puntos: number = details.puntos,
    puntosMin: number = details.puntosMin
  ): number => {
    if (puntosMin === 0) return 0;
    return (puntos / puntosMin) * 100;
  };

  const porcentaje = calcularPorcentaje();
  const formattedPoints = formatPercentage(porcentaje);

  return (
    <div className="footer w-full bg-blue-900 text-center min-h-[30px] flex flex-col items-center justify-center py-1 sm:py-0">
      <div className="container flex flex-row w-full gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 min-h-[20px] w-[66%] justify-center items-center">
          <div className="w-[50%] text-center">
            <p className="font-bold text-white font-mobile-12px leading-none relative top-[.5px]">
              USTED TIENE:
            </p>
          </div>
          <div className="w-[50%] text-center ">
            <p className="text-white font-mobile-12px leading-none relative top-[.5px]">
              {details.puntos} PTS
            </p>
          </div>
        </div>
        <div className="range w-[33.3%] flex-1 flex items-center justify-center flex-row h-[20px]">
          <div className="range bg-white rounded-full p-[2px] min-h-[8px] w-full flex items-center justify-start">
            <div
              className="min-h-[15px] rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#b77b2e] via-[#ffdd55] to-[#f8f852]"
              style={{ width: `${formattedPoints}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTypeBFooter;
