import React from "react";
import Lottie from "react-lottie";
import slotLoading from "@/shared/assets/lotties/loading_slot5.json";

const LoaderImageDetail = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: slotLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center justify-center h-full flex-col w-full">
      <div className="overflow-hidden ">
        <Lottie
          options={defaultOptions}
          style={{ width: "100%", height: "auto" }}
          speed={3}
        />
      </div>
      <p className="text-[14px] font-normal tracking-normal capitalize !hidden">
        Cargando ...
      </p>
    </div>
  );
};

export default LoaderImageDetail;
