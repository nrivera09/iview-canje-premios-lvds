import React, { useEffect, useState } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import slotMachine from "@/shared/assets/img/slotmachine.png";
import { useIsDevEnv } from "./shared/hooks/useIsDevEnv";
import HackIview from "./shared/components/HackIview";
import { useSoundEffect } from "./shared/hooks/useSoundEffect";
import { useStockSignalR } from "./shared/hooks/useStockSignalR";
import { usePrizesStore } from "./shared/store/prizesStore";

const App: React.FC = () => {
  const isDevEnv = useIsDevEnv();
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const setTarjetaId = usePrizesStore((state) => state.setTarjetaId);

  const [tarjeta, setTarjetaLocal] = useState("100007777");
  setTarjetaId(tarjeta);
  const [showInput, setShowInput] = useState(false);

  const { playSound } = useSoundEffect();

  const ready = useAppData(tarjeta);

  useStockSignalR((data) => {
    console.log("📦 Actualización de stock:", data);
    fetchPremios(tarjeta);
  });

  const hideIviewHack = () => {
    setShowInput(false);
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando datos...
      </div>
    );
  }

  return (
    <>
      <Router />

      {isDevEnv && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 mr-1 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              playSound("clickIview");
              setShowInput(!showInput);
            }}
            className="  p-1 border-none hover:inset-0"
          >
            <img src={slotMachine} alt="" className="w-[30px]" />
          </button>

          {showInput && <HackIview hideIviewHack={hideIviewHack}></HackIview>}
        </div>
      )}
    </>
  );
};

export default App;
