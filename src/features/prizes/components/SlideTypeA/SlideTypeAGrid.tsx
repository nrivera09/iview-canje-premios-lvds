import React, { useEffect, useRef, useState } from "react";
import SlideTypeABox from "./SlideTypeABox";
import { usePrizesStore } from "@/shared/store/prizesStore";
import SlideTypeADetail from "./SlideTypeADetail";
import { SlideTypeAGridProps } from "../../types/prize.types";
import imgPlayBack from "@/shared/assets/img/64.png";
import imgPlayNext from "@/shared/assets/img/61.png";

const SlideTypeAGrid: React.FC<SlideTypeAGridProps> = ({
  products,
  details,
}) => {
  const openPrizeDetail = usePrizesStore((state) => state.openPrizeDetail);
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [itemWidth, setItemWidth] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleProducts = products; // mostrar todos, pero se verán de 3 en 3 por scroll

  const handleOpenModal = (index: number) => {
    setSelectedIndex(index);
    setOpenPrizeDetail(true);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: itemWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current) {
        const fullWidth = scrollRef.current.clientWidth;
        setItemWidth(fullWidth / 3); // divide en 3 columnas exactas
      }
    };

    updateWidth(); // calcular al cargar

    window.addEventListener("resize", updateWidth); // recalcular al redimensionar
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        const isAtStart = el.scrollLeft <= 0;
        const isAtEnd =
          Math.abs(el.scrollWidth - el.scrollLeft - el.clientWidth) < 1;

        setCanScrollLeft(!isAtStart);
        setCanScrollRight(!isAtEnd);
      }
    };

    checkScroll(); // inicial

    // ⏳ Esperar a que termine de montar (productos/imágenes)
    const timeout = setTimeout(() => {
      checkScroll();
    }, 500); // puedes ajustar el delay según tu carga

    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      clearTimeout(timeout);
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row flex-1">
        <div className="min-w-[50px]"></div>
        <div
          data-slide={details.id}
          className="flex-1 w-full overflow-hidden items-center justify-center"
        >
          <div
            ref={scrollRef}
            className="flex items-center justify-start overflow-x-auto scrollbar-hidden scroll-smooth h-full"
          >
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: itemWidth, paddingInline: 8 }}
              >
                <SlideTypeABox
                  product={product}
                  handleOpenModal={() => handleOpenModal(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-[50px]"></div>
      </div>
      <div className="scrolleableButtons pointer-events-none">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 mt-[2.5rem] transform -translate-y-1/2 ml-2 transition-opacity duration-300 pointer-events-auto ${
            !canScrollLeft ? "hidden" : ""
          }`}
        >
          <img src={imgPlayBack} alt="Anterior" className="w-7" />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 mt-[2.5rem] transform -translate-y-1/2 mr-2 transition-opacity duration-300 pointer-events-auto ${
            !canScrollRight ? "hidden" : ""
          }`}
        >
          <img src={imgPlayNext} alt="Siguiente" className="w-7" />
        </button>
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
