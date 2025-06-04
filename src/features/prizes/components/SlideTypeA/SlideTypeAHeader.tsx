import { usePrizesStore } from "@/shared/store/prizesStore";
import React from "react";

const SlideTypeAHeader = () => {
  const tarjetaId = usePrizesStore((s) => s.tarjetaId);
  const nroAsset = usePrizesStore((s) => s.nroAsset);
  const view = usePrizesStore((s) => s.view);
  return (
    <div className="header min-h-[20px] bg-gradient-to-r from-[#b77b2e] via-[#ffdd55] to-[#f8f852] flex items-center justify-center">
      <div className="container">
        <p className="font-bold text-center text-[12px]">
          USTED PUEDE CANJEAR SU PEDIDO -{" "}
          <small>
            {`tarjeta: ` +
              tarjetaId +
              ` - asset: ` +
              nroAsset +
              ` - view:` +
              view}
          </small>
        </p>
      </div>
    </div>
  );
};

export default SlideTypeAHeader;
