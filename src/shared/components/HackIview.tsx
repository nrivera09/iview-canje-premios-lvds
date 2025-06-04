import React, { FC, useState } from "react";
import { usePrizesStore } from "../store/prizesStore";
import { HackIviewProps } from "@/features/shared/app/types";
import { useSoundEffect } from "../hooks/useSoundEffect";
import { IoIosClose } from "react-icons/io";

const HackIview: FC<HackIviewProps> = ({ hideIviewHack }) => {
  const { playSound } = useSoundEffect();

  const tarjetaId = usePrizesStore((s) => s.tarjetaId);
  const nroAsset = usePrizesStore((s) => s.nroAsset);
  const view = usePrizesStore((s) => s.view);

  const setCardId = usePrizesStore((state) => state.setCardId);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const setNroAsset = usePrizesStore((state) => state.setNroAsset);
  const setNroPoint = usePrizesStore((state) => state.setNroPoint);
  const setCanExchange = usePrizesStore((state) => state.setCanExchange);

  const canExchange = usePrizesStore((state) => state.canExchange);

  const [tarjeta, setTarjeta] = useState(tarjetaId);
  const [asset, setAsset] = useState(nroAsset);
  const [puntos, setPuntos] = useState(view);
  const [getforzarCanje, setGetForzarCanje] = useState<any>(canExchange);

  const handleHover = () => {
    playSound("pin");
  };

  const handleUpdate = async () => {
    setCardId(tarjeta);
    setNroAsset(asset);
    setNroPoint(Number(puntos));
    setCanExchange(getforzarCanje);

    await fetchPremios(tarjeta);
    hideIviewHack();
  };

  

  return (
    <div className="w-full flex items-center justify-center  h-[100dvh] top-0 left-0 fixed bg-black/30 backdrop-blur-sm  z-50">
      <div className="container">
        <div className="bg-white max-w-full mx-auto rounded-md p-5 shadow-md flex flex-col gap-2">
          <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-col gap-1 w-[25%]">
              <label className="text-[12px]">Nro de tarjeta:</label>
              <input
                type="text"
                value={tarjeta}
                onChange={(e) => setTarjeta(e.target.value)}
                className="border bg-gray-200 p-1 rounded text-[12px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-[25%]">
              <label className="text-[12px]">Nro de asset:</label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(Number(e.target.value))}
                className="border bg-gray-200 p-1 rounded text-[12px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-[25%]">
              <label className="text-[12px]">Puntaje:</label>
              <input
                type="text"
                onChange={(e) => setPuntos(e.target.value)}
                className="border bg-gray-200 p-1 rounded text-[12px] w-full"
              />
            </div>

            <div className="flex flex-col gap-1 w-[25%]">
              <label className="text-[12px]">¿Forzar canje?</label>
              <div className="flex gap-4 text-[12px] min-h-[28px] items-center justify-start">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="forzarCanje"
                    value="No"
                    checked={getforzarCanje === true}
                    onChange={() => setGetForzarCanje(true)}
                  />
                  No
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="forzarCanje"
                    value="Si"
                    checked={getforzarCanje === false}
                    onChange={() => setGetForzarCanje(false)}
                  />
                  Sí
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-2">
            <button
              onClick={handleUpdate}
              className="mt-2 text-[12px] px-2 py-1 bg-blue-950 w-full text-white rounded"
            >
              Actualizar Iview
            </button>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-[12px] px-2 py-1 bg-red-700 w-full text-white rounded"
            >
              Restalecer
            </button>
          </div>
          <button
            onMouseEnter={handleHover}
            onClick={() => {
              playSound("button");
              hideIviewHack();
            }}
            className="font-bold text-xl bg-red-600 hover:bg-red-900 p-1 rounded-md overflow-hidden   mx-auto transition-all cursor-pointer hover:shadow-xl h-[30px] sm:h-[30px] w-[30px] sm:w-[30px] items-center justify-center absolute top-0 right-0 mt-1 mr-1"
          >
            <IoIosClose className="text-white mx-auto font-bold text-[15px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackIview;
