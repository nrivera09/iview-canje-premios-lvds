import React, { FC, useState } from "react";
import { useUserStore } from "../store/userStore";
import { usePrizesStore } from "../store/prizesStore";
import { HackIviewProps } from "@/features/shared/app/types";
import { useSoundEffect } from "../hooks/useSoundEffect";

const HackIview: FC<HackIviewProps> = ({ hideIviewHack }) => {
  const { playSound } = useSoundEffect();
  const setCardId = usePrizesStore((state) => state.setCardId);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const setNroAsset = usePrizesStore((state) => state.setNroAsset);
  const setNroPoint = usePrizesStore((state) => state.setNroPoint);
  const setCanExchange = usePrizesStore((state) => state.setCanExchange);

  const canExchange = usePrizesStore((state) => state.canExchange);

  const [tarjeta, setTarjeta] = useState("100007777");
  const [asset, setAsset] = useState("12345");
  const [puntos, setPuntos] = useState("200");
  const [getforzarCanje, setGetForzarCanje] = useState<any>(canExchange);

  const handleUpdate = async () => {
    setCardId(tarjeta);
    setNroAsset(Number(asset));
    setNroPoint(Number(puntos));
    setCanExchange(getforzarCanje);

    await fetchPremios(tarjeta);
    hideIviewHack();
  };

  return (
    <div className="bg-white p-2 rounded shadow flex flex-col items-end">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Nro de tarjeta:</label>
          <input
            type="text"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Nro de asset:</label>
          <input
            type="text"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[12px]">Puntaje:</label>
          <input
            type="text"
            value={puntos}
            onChange={(e) => setPuntos(e.target.value)}
            className="border bg-gray-200 p-1 rounded text-[12px] w-[160px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[12px]">¿Forzar canje?</label>
          <div className="flex gap-4 text-[12px]">
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
          <small className="text-red-500 text-[10px]">
            (sólo si ya ha canjeado puedes forzar esto)
          </small>
        </div>
      </div>
      <div className="flex flex-col w-full">
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
    </div>
  );
};

export default HackIview;
