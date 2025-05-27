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
        }, 3500);
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
      className={`relative cursor-pointer  bg-white w-[170px] h-[170px] xs:w-[130px] xs:h-[130px] sm:w-[170px] sm:h-[170px] rounded-xl p-[10px] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all ${
        isOutOfStock ? "opacity-40 " : ""
      }`}
      style={{ backgroundImage: `url(${marco})` }}
    >
      <div className="container w-full h-full rounded-sm overflow-hidden flex items-center justify-center">
        <div className="infoProduct uppercase flex-col flex items-center justify-center gap-2 w-full">
          {loading ? (
            <LoaderImageDetail />
          ) : (
            <>
              <p className="text-center font-bold text-[14px] xs:text-[11px] leading-4 min-h-[32px] flex items-center justify-center truncate-2-lines">
                {product.nameProduct}
              </p>
              <img
                src={imagen || `/fallback/url/${product.imgProduct}`}
                alt={product.nameProduct}
                className="w-[100px] xs:w-[70px] h-auto object-contain rounded-md"
              />
            </>
          )}
        </div>
      </div>

      {isOutOfStock && (
        <img
          src={agotado}
          alt="Agotado"
          className="absolute min-w-[230px] xs:min-w-[180px] sm:min-w-[240px] xs:ml-[-5px] sm:ml-0"
        />
      )}
    </div>
  );
};

export default SlideTypeABox;
