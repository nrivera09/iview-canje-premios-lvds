import React, { FC } from "react";
import bgCanjear from "@/shared/assets/img/53.png";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";

interface SlideTypeAConfirmationProps {
  hideConfirmation: () => void;
  handleRedeemOk: () => void;
}

const SlideTypeAConfirmation: FC<SlideTypeAConfirmationProps> = ({
  hideConfirmation,
  handleRedeemOk,
}) => {
  const { playSound } = useSoundEffect();
  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full h-[100dvh] shadow-xl   z-50 bg-black/80 backdrop-blur-sm">
      <div className="container ">
        <div className="bg-white rounded-xl shadow-md w-[500px] max-w-full px-4 py-6 mx-auto">
          <div className="container">
            <p className="font-bold text-[25px] sm:text-[32px] mb-5 leading-7 sm:leading-10 text-black">
              Está seguro de canjear este artículo?
            </p>
            <div className="flex items-center justify-between mt-4 gap-3">
              <button
                onMouseEnter={handleHover}
                onClick={() => {
                  handleClick();
                  hideConfirmation();
                }}
                className="w-[48%] mx-auto bg-blue-200 rounded-full h-[55px] text-[20px] text-black font-bold"
              >
                Volver
              </button>
              <button
                onMouseEnter={handleHover}
                onClick={() => {
                  handleClick();
                  handleRedeemOk();
                }}
                style={{
                  backgroundImage: `url(${bgCanjear})`,
                  backgroundSize: "100% 55px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="w-[48%] flex items-center justify-center mx-auto  h-[55px] text-black font-bold text-[18px]"
              >
                CANJEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTypeAConfirmation;
