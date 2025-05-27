import React from "react";
import SlideTypeBGrid from "./SlideTypeBGrid";
import bgmain from "@/shared/assets/img/Fondo-regalo-solo.jpg";
import { SlideTypeBProps } from "../../types/prize.types";

const SlideTypeB: React.FC<SlideTypeBProps> = ({ slide }) => {
  return (
    <div
      className="main flex flex-1 flex-col bg-cover bg-no-repeat bg-center"
      data-slide={slide.type}
      style={{ backgroundImage: `url(${bgmain})` }}
    >
      <SlideTypeBGrid products={slide.products} details={slide.detailSlide!} />
    </div>
  );
};

export default SlideTypeB;
