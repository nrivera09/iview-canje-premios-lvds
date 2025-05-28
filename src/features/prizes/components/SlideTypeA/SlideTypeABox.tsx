import React, { useEffect, useState } from "react";
import { usePrizesStore } from "@/shared/store/prizesStore";

import { useSoundEffect } from "@/shared/hooks/useSoundEffect";

import marco from "@/shared/assets/img/marco_producto3.png";
import agotado from "@/shared/assets/img/23.png";

import slotLoading from "@/shared/assets/lotties/loading_slot3.json";
import LoaderImageDetail from "@/shared/components/LoaderImageDetail";
import { SlideTypeABoxProps } from "../../types/prize.types";

const SlideTypeABox: React.FC<SlideTypeABoxProps> = ({
  product,
  handleOpenModal,
}) => {
  const { playSound } = useSoundEffect();
  const fetchImagen = usePrizesStore((state) => state.fetchImagen);
  const [imagen, setImagen] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = () => playSound("pin");
  const handleClick = () => playSound("button");
  const handleError = () => playSound("error");

  const isOutOfStock = product.stock === 0;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: slotLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let mounted = true;
    const nombre = product.imgProduct?.split(".")[0] ?? "";

    fetchImagen(nombre).then((base64) => {
      if (mounted) {
        setImagen(base64);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });

    return () => {
      mounted = false;
    };
  }, [product.imgProduct, fetchImagen]);

  return (
    <div
      data-id-product={product.id}
      onMouseEnter={handleHover}
      onClick={() => {
        isOutOfStock ? handleError() : handleClick();
        !isOutOfStock && handleOpenModal?.();
      }}
      className={`relative cursor-pointer  bg-white w-full min-h-[70%] xs:w-full  sm:w-full  rounded-xl  bg-no-repeat  bg-center flex items-center justify-center transition-all ${
        isOutOfStock ? "opacity-40 " : ""
      }, ${!loading && "p-[10px]"}`}
      style={{ backgroundImage: `url(${marco})`, backgroundSize: "100% 100%" }}
    >
      <div className="container w-full h-full rounded-sm overflow-hidden flex items-center justify-center flex-col">
        <div className="infoProduct uppercase flex-col flex items-center justify-center gap-1 w-full overflow-hidden">
          {loading ? (
            <LoaderImageDetail />
          ) : (
            <>
              <div className="flex items-center justify-center min-h-[27px]">
                <p className="line-clamp-2 text-center font-bold text-[9px] leading-[10px]">
                  SET DE 01 JARRA Y 6 VASOS DE VIDRIO (7 PIEZAS)
                </p>
              </div>

              <img
                src={imagen || `/fallback/url/${product.imgProduct}`}
                alt={product.nameProduct}
                className="w-[40%]  h-auto object-contain rounded-md"
              />
            </>
          )}
        </div>
      </div>

      {isOutOfStock && (
        <img
          src={agotado}
          alt="Agotado"
          className="absolute min-w-[230px] xs:min-w-[180px] sm:min-w-[200px] xs:ml-[-5px] sm:ml-0"
        />
      )}
    </div>
  );
};

export default SlideTypeABox;
