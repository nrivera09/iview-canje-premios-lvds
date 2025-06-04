import React, { useEffect, useState } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import slotMachine from "@/shared/assets/img/slotmachine.png";
import { useIsDevEnv } from "./shared/hooks/useIsDevEnv";
import HackIview from "./shared/components/HackIview";
import { useSoundEffect } from "./shared/hooks/useSoundEffect";
import { useStockSignalR } from "./shared/hooks/useStockSignalR";
import { usePrizesStore } from "./shared/store/prizesStore";
import { useURLParams } from "./shared/hooks/useURLParams";

const App: React.FC = () => {
  useURLParams();

  const isDevEnv = useIsDevEnv();
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const tarjetaId = usePrizesStore((state) => state.tarjetaId);
  const { playSound } = useSoundEffect();

  const [showInput, setShowInput] = useState(false);
  const ready = useAppData(tarjetaId);

  useStockSignalR((data) => {
    console.log("📦 Actualización de stock:", data);
    fetchPremios(tarjetaId);
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
        <div className="absolute bottom-0 left-0 mr-1 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              playSound("button");
              setShowInput(!showInput);
            }}
            className="  p-1 border-none hover:inset-0"
          >
            <img src={slotMachine} alt="" className="w-[30px]" />
          </button>
        </div>
      )}

      {showInput && <HackIview hideIviewHack={hideIviewHack}></HackIview>}
    </>
  );
};

export default App;
