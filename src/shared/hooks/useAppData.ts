import { useEffect, useState } from "react";
import { usePrizesStore } from "../store/prizesStore";

export const useAppData = (tarjeta: string) => {
  const [ready, setReady] = useState(false);
  const fetchPremios = usePrizesStore((state) => state.fetchPremios);
  const setOpenPrizeDetail = usePrizesStore(
    (state) => state.setOpenPrizeDetail
  );
  const setOpenPrizeRedeem = usePrizesStore(
    (state) => state.setOpenPrizeRedeem
  );
  const setCardId = usePrizesStore((state) => state.setCardId);
  const setNroAsset = usePrizesStore((state) => state.setNroAsset);
  const setNroPoint = usePrizesStore((state) => state.setNroPoint);
  const setCanExchange = usePrizesStore((state) => state.setCanExchange);

  useEffect(() => {
    const loadData = async () => {
      // Reiniciar flags al inicio
      setOpenPrizeDetail(false);
      setOpenPrizeRedeem(false);
      setCardId("0");
      setNroPoint(0);
      setCanExchange(null);
      await Promise.all([fetchPremios(tarjeta)]);
      setReady(true);
    };
    loadData();
  }, [tarjeta]);

  return ready;
};
