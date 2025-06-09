import React, { useEffect, useState } from "react";
import { Router } from "./app/Router";
import { useAppData } from "@/shared/hooks/useAppData";
import slotMachine from "@/shared/assets/img/slotmachine.png";
import slotMachineBug from "@/shared/assets/img/bug.png";
import { useIsDevEnv } from "./shared/hooks/useIsDevEnv";
import HackIview from "./shared/components/HackIview";
import { useSoundEffect } from "./shared/hooks/useSoundEffect";
import { useStockSignalR } from "./shared/hooks/useStockSignalR";
import { usePrizesStore } from "./shared/store/prizesStore";
import { useURLParams } from "./shared/hooks/useURLParams";
import { ConsoleOverlay } from "./shared/components/ConsoleOverlay";

const App: React.FC = () => {
  useURLParams();

  const isDevEnv = useIsDevEnv();
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const tarjetaId = usePrizesStore((state) => state.tarjetaId);
  const { playSound } = useSoundEffect();

  const [showInput, setShowInput] = useState<boolean>(false);
  const [showBug, setShowBug] = useState<boolean>(false);
  const ready = useAppData(tarjetaId);

  useStockSignalR((data) => {
    console.log("📦 Actualización de stock:", data);
    fetchPremios(tarjetaId);
  });

  const hideIviewHack = () => {
    setShowInput(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      console.log("Click en:", target.tagName, target.className);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
      <div className="absolute bottom-0 left-[30px] mr-1 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            playSound("button");
            setShowBug(!showBug);
          }}
          className="btn  p-1 border-none hover:inset-0"
        >
          <img src={slotMachineBug} alt="" className="w-[23px]" />
        </button>
      </div>
      {isDevEnv && (
        <div className="absolute bottom-0 left-0 mr-1 flex flex-col items-end gap-2">
          <button
            onClick={() => {
              playSound("button");
              setShowInput(!showInput);
            }}
            className="  p-1 border-none hover:inset-0"
          >
            <img src={slotMachine} alt="" className="w-[20px]" />
          </button>
        </div>
      )}

      {showInput && <HackIview hideIviewHack={hideIviewHack}></HackIview>}
      {showBug && (
        <ConsoleOverlay onClick={() => setShowBug(!showBug)}></ConsoleOverlay>
      )}
    </>
  );
};

export default App;
