import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { usePrizesStore } from "@/shared/store/prizesStore";
import { FC } from "react";
import bgmain from "@/shared/assets/img/Fondo-regalo-solo.jpg";
import imgHome from "@/shared/assets/img/58.png";
import ArrowRight from "@/shared/assets/img/61.png";
import ArrowLeft from "@/shared/assets/img/64.png";
import SlideTypeBDetailFooter from "./SlideTypeBDetailFooter";
import SlideTypeBDetailInfo from "./SlideTypeBDetailInfo";
import { SlideTypeBDetailProps } from "../../types/prize.types";

const SlideTypeBDetail: FC<SlideTypeBDetailProps> = ({
  products,
  details,
  currentIndex,
  setCurrentIndex,
  handleOpenModal,
}) => {
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );

  const { playSound } = useSoundEffect();
  const product = products[currentIndex];

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      playSound("button");
      setCurrentIndex(currentIndex + 1);
    } else {
      playSound("error");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      currentIndex === 0 ? playSound("error") : playSound("button");
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleHover = () => {
    playSound("pin");
  };

  return (
    <section className="fixed left-0 z-10 w-full h-[100dvh] bg-no-repeat bg-cover mx-auto flex flex-col overflow-hidden">
      <main
        className="flex flex-1 flex-col items-center justify-center"
        style={{ backgroundImage: `url(${bgmain})` }}
      >
        <div className="text-white text-center flex flex-1 flex-col items-center justify-center">
          <div className="container flex flex-row items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <img
                src={ArrowLeft}
                alt=""
                className="object-contain w-[45px] min-w-[40px] min-h-[45px]"
              />
            </button>
            <SlideTypeBDetailInfo
              product={product}
              details={details}
            ></SlideTypeBDetailInfo>
            <button
              onClick={handleNext}
              disabled={currentIndex === products.length - 1}
              className="disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <img
                src={ArrowRight}
                alt=""
                className="object-contain w-[45px] min-w-[40px] min-h-[45px]"
              />
            </button>
          </div>
        </div>
        <SlideTypeBDetailFooter stock={product.stock}></SlideTypeBDetailFooter>
      </main>

      <nav className="nav flex min-h-[70px] items-center justify-center gap-2">
        <button
          onMouseEnter={handleHover}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="group bg-blue-950 w-[70px] h-[50px] sm:h-[55px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:bg-[#6a7492] disabled:cursor-not-allowed"
        >
          <RiArrowDropLeftLine className="group-disabled:opacity-40 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => {
            playSound("button");
            setOpenPrizeDetail(false);
          }}
          className="bg-blue-950 h-[50px] sm:h-[55px] px-5 flex items-center justify-center border border-white rounded-md"
        >
          <span className="text-[25px] sm:text-[30px] font-bold text-white">
            VOLVER
          </span>
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={handleNext}
          disabled={currentIndex === products.length - 1}
          className="group bg-blue-950 w-[70px] h-[50px] sm:h-[55px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:bg-[#6a7492] disabled:cursor-not-allowed"
        >
          <RiArrowDropRightLine className="group-disabled:opacity-40 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>
      </nav>
      <img
        onMouseEnter={handleHover}
        onClick={() => {
          playSound("button");
          handleOpenModal();
        }}
        src={imgHome}
        alt=""
        className="w-[60px] h-auto  absolute top-o right-0 z-20 mt-2 mr-2 cursor-pointer"
      />
    </section>
  );
};

export default SlideTypeBDetail;
