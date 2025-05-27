import React, { useState } from "react";
import SlideTypeABox from "./SlideTypeABox";
import { usePrizesStore } from "@/shared/store/prizesStore";
import SlideTypeADetail from "./SlideTypeADetail";
import { SlideTypeAGridProps } from "../../types/prize.types";

const SlideTypeAGrid: React.FC<SlideTypeAGridProps> = ({
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
        <div className="container max-w-[400px] xs:max-w-[340px] h-auto grid grid-cols-2 gap-x-0 gap-y-3 xs:gap-x-0 xs:gap-y-3 sm:gap-x-0 sm:gap-y-4 place-items-center">
          {visibleProducts.map((product, index) => (
            <SlideTypeABox
              key={product.id}
              product={product}
              handleOpenModal={() => handleOpenModal(index)}
            />
          ))}
        </div>
      </div>
      {openPrizeDetail && selectedIndex !== null && (
        <SlideTypeADetail
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

export default SlideTypeAGrid;
