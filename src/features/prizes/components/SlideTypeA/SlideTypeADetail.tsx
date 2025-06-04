import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { usePrizesStore } from "@/shared/store/prizesStore";
import { FC } from "react";
import bgmain from "@/shared/assets/img/Fondo-regalo-solo.jpg";
import imgHome from "@/shared/assets/img/58.png";
import ArrowRight from "@/shared/assets/img/61.png";
import ArrowLeft from "@/shared/assets/img/64.png";
import SlideTypeADetailFooter from "./SlideTypeADetailFooter";
import SlideTypeBDetailInfo from "./SlideTypeADetailInfo";
import { SlideTypeADetailProps } from "../../types/prize.types";
import { FaUndo } from "react-icons/fa";

const SlideTypeADetail: FC<SlideTypeADetailProps> = ({
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
        <div className="flex flex-row flex-1 items-end pb-2 justify-center gap-4">
          <div className="min-w-[35px]"></div>
          <div className="text-white text-center flex flex-1 flex-row items-center justify-center ">
            <div className=" flex flex-row items-end justify-center   w-full gap-1">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <img src={ArrowLeft} alt="" className="w-[28px]" />
              </button>
              <SlideTypeBDetailInfo
                product={product}
                details={details}
              ></SlideTypeBDetailInfo>
              <button
                onClick={handleNext}
                disabled={currentIndex === products.length - 1}
                className="disabled:opacity-40 disabled:cursor-not-allowed absolute ml-[-35px]"
              >
                <img src={ArrowRight} alt="" className="w-[28px]" />
              </button>
            </div>
            <div className=" flex-1 !hidden">x</div>
          </div>
          <div className="min-w-[35px]"></div>
        </div>
        <SlideTypeADetailFooter stock={product.stock}></SlideTypeADetailFooter>
      </main>

      <nav className="nav flex min-h-[0px] items-center justify-center gap-2 !hidden">
        <button
          onMouseEnter={handleHover}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-blue-950 w-[35px] h-[50px] sm:h-[50px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed absolute top-1/2 left-0 -mt-7"
          style={{
            borderLeft: "0",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
        >
          <RiArrowDropLeftLine className="group-disabled:opacity-40 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={() => {
            playSound("button");
            setOpenPrizeDetail(false);
          }}
          className="font-bold text-xl bg-red-600 hover:bg-red-900 p-1 rounded-md overflow-hidden   mx-auto transition-all cursor-pointer hover:shadow-xl h-[30px] sm:h-[30px] w-[30px] sm:w-[30px] items-center justify-center absolute top-0 right-0 mt-1 mr-1
"
        >
          <FaUndo className="text-white mx-auto font-bold text-[15px]" />
        </button>

        <button
          onMouseEnter={handleHover}
          onClick={handleNext}
          disabled={currentIndex === products.length - 1}
          style={{
            borderRight: "0",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "0",
          }}
          className="bg-blue-950 w-[35px] h-[50px] sm:h-[50px] flex items-center justify-center border border-gray-300 rounded-md overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed absolute top-1/2 right-0 -mt-7"
        >
          <RiArrowDropRightLine className="group-disabled:opacity-40 w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] text-white" />
        </button>
      </nav>
      <img
        onMouseEnter={handleHover}
        onClick={() => {
          playSound("button");
          setOpenPrizeDetail(false);
        }}
        src={imgHome}
        alt=""
        className="w-[40px] h-auto  absolute top-o right-0 z-20 mt-0 mr-11 cursor-pointer"
      />
    </section>
  );
};

export default SlideTypeADetail;
