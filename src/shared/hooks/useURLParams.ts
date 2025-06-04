import { useEffect } from "react";
import { usePrizesStore } from "../store/prizesStore";

export const useURLParams = () => {
  const setTarjetaId = usePrizesStore((s) => s.setTarjetaId);
  const setNroAsset = usePrizesStore((s) => s.setNroAsset);
  const setView = usePrizesStore((s) => s.setView);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const card = params.get("id") ?? "100007777";
    const assetStr = params.get("asset") ?? "1103";
    const asset = parseInt(assetStr);
    const view = (params.get("iview") ?? "DM").toUpperCase();

    // 🚨 Solo actualizar si la URL trae algo diferente a lo guardado
    setTarjetaId(card);
    setNroAsset(asset);
    setView(view);
  }, []);
};
