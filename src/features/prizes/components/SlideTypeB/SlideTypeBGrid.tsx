import React, { useState } from "react";
import SlideTypeBBox from "./SlideTypeBBox";
import { usePrizesStore } from "@/shared/store/prizesStore";
import SlideTypeBDetail from "./SlideTypeBDetail";
import { SlideTypeBGridProps } from "../../types/prize.types";

const SlideTypeBGrid: React.FC<SlideTypeBGridProps> = ({
  products,
  details,
}) => {
  const openPrizeDetail = usePrizesStore((state) => state.openPrizeDetail);
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const visibleProducts = products.slice(0, 4);

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenPrizeDetail(true);
    //setOpenModal(true);
  };

  return (
    <>
      <div
        data-slide={details.id}
        className="contenido flex flex-1 items-center justify-center w-full"
      >
        <div className="container max-w-[420px] xs:max-w-[340px] h-auto grid grid-cols-2 gap-x-0 gap-y-3 xs:gap-x-0 xs:gap-y-3 sm:gap-x-0 sm:gap-y-4 place-items-center">
          <div>Lorem.</div>
          <div className="flex flex-col">
            <div className="relative   w-[160px] h-[130px] xs:w-[130px] xs:h-[130px] sm:w-[160px] sm:h-[130px] rounded-xl p-[10px] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all flex-col ">
              <div className="flex flex-1 w-full justify-center items-center flex-col ">
                <p
                  className="flex flex-col relative top-[12px] font-bold items-center text-white"
                  style={{ lineHeight: "25px" }}
                >
                  <span className="text-[45px]">200</span>
                  <span className="uppercase text-[20px]">puntos</span>
                </p>
              </div>
              <p
                className="text-white h-[20px] text-[9px] sm:text-[11px] text-center  font-light"
                style={{ lineHeight: "13px" }}
              >
                Acumula y canjea tu regalo <br /> de 8 AM a 4 AM (del lunes){" "}
              </p>
              <div className="w-full absolute top-[-6px] z-10">
                <p className="bg-gradient-to-r from-[#b77b2e] via-[#ffdd55] to-[#f8f852] overflow-hidden rounded-full uppercase font-bold text-[11px] sm:text-[15px] text-white text-center">
                  <span className="relative top-[2px]">11 de MAYO</span>
                </p>
              </div>
            </div>
          </div>
          {visibleProducts.map((product, index) => (
            <SlideTypeBBox
              key={product.id}
              product={product}
              handleOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
      </div>
      {openPrizeDetail && selectedIndex !== null && (
        <SlideTypeBDetail
          products={visibleProducts}
          details={details}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          handleOpenModal={() => setOpenPrizeDetail(false)}
        />
      )}
    </>
  );
};

export default SlideTypeBGrid;
