import React, { FC } from "react";
import { SlideTypeBDetailFooterProps } from "../../types/prize.types";

const SlideTypeBDetailFooter: FC<SlideTypeBDetailFooterProps> = ({ stock }) => {
  return (
    <div className="footer w-full bg-blue-900 text-center min-h-[30px] flex flex-col items-center justify-center py-1 sm:py-0">
      <div className="container flex flex-row w-full gap-2 justify-center items-center">
        <p className="font-bold text-white font-mobile-12px leading-none relative top-[.5px]">
          STOCK: {stock} UNIDADES
        </p>
      </div>
    </div>
  );
};

export default SlideTypeBDetailFooter;
