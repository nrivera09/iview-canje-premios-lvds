import { useEffect } from "react";
import { usePrizesStore } from "../store/prizesStore";

export const useURLParams = () => {
  const setTarjetaId = usePrizesStore.getState().setTarjetaId;
  const setNroAsset = usePrizesStore.getState().setNroAsset;
  const setView = usePrizesStore.getState().setView;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    /*const card = params.get("playerId") ?? "100007777";
    const assetRaw = params.get("machineId") ?? "1103";
    const asset = Number(assetRaw);
    const view = (params.get("layout") ?? "DM").toUpperCase();*/
    const card = params.get("id") ?? "100007777";
    const assetRaw = params.get("asset") ?? "1103";
    const asset = Number(assetRaw);
    const view = (params.get("iview") ?? "DM").toUpperCase();

    setTarjetaId(card);
    setNroAsset(asset);
    setView(view);
  }, [setNroAsset, setTarjetaId, setView]);
};
