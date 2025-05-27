import React from "react";
import SlideTypeA from "./SlideTypeA/SlideTypeA";
import SlideTypeB from "./SlideTypeB/SlideTypeB";
import SlideTypeC from "./SlideTypeC/SlideTypeC";
import { SlideRendererProps } from "@/features/shared/app/types";

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case "A":
      return <SlideTypeA slide={slide} />;
    case "B":
      return <SlideTypeB slide={slide} />;
    case "C":
      return <SlideTypeC />;
    default:
      return <div>No se reconoce el tipo de slide</div>;
  }
};

export default SlideRenderer;
