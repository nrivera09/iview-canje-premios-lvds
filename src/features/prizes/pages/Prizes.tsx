import React, { useEffect, useState } from "react";
import SlideRenderer from "../components/SlideRenderer";
import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { usePrizesStore } from "@/shared/store/prizesStore";
import { PrizeGroup } from "@/features/shared/features/types/types";
import { FaUndo } from "react-icons/fa";
import { handleCloseClick } from "@/libs/altenarBridge";

const Prizes: React.FC = () => {
  const { playSound } = useSoundEffect();
  const { premios, fetchPremios } = usePrizesStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prizeGroups, setPrizeGroups] = useState<PrizeGroup[]>([]);

  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );

  useEffect(() => {
    if (premios.length > 0) {
      setPrizeGroups(premios); // Ya viene como PrizeGroup[]
    }
  }, [premios]);

  const currentSlide = prizeGroups[currentIndex];

  const handleNext = () => {
    if (currentIndex < prizeGroups.length - 1) {
      playSound("button");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSound("button");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleHover = () => {
    playSound("pin");
  };

  if (!currentSlide) return null;

  return (
    <section className="w-full h-[100dvh] bg-no-repeat bg-cover mx-auto flex flex-col overflow-hidden">
      <SlideRenderer key={currentSlide.type} slide={currentSlide} />
      <nav className="nav flex min-h-[0px] items-center justify-center gap-2">
        <button
          onMouseEnter={handleHover}
          disabled={currentIndex === 0}
          onClick={handlePrev}
          style={{
            borderLeft: "0",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
          className="z-50 bg-blue-950 w-[35px] h-[50px] sm:h-[50px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed absolute top-1/2 left-0 -mt-7"
        >
          <RiArrowDropLeftLine className="min-h-[70px] min-w-[70px] text-white" />
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => {
            playSound("button");
            handleCloseClick();
          }}
          className="z-50 font-bold text-xl bg-red-600 hover:bg-red-900 p-1 rounded-md overflow-hidden   mx-auto transition-all cursor-pointer hover:shadow-xl h-[30px] sm:h-[30px] w-[30px] sm:w-[30px] items-center justify-center absolute top-0 right-0 mt-1 mr-1"
        >
          <FaUndo className="text-white mx-auto font-bold text-[15px]" />
        </button>

        <button
          onMouseEnter={handleHover}
          disabled={currentIndex === prizeGroups.length - 1}
          onClick={handleNext}
          style={{
            borderRight: "0",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
          }}
          className="z-50 bg-blue-950 w-[35px] h-[50px] sm:h-[50px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed absolute top-1/2 right-0 -mt-7"
        >
          <RiArrowDropRightLine className="min-h-[70px] min-w-[70px] text-white" />
        </button>
      </nav>
    </section>
  );
};

export default Prizes;
