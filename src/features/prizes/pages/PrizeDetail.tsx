import { useRouterStore } from "@/app/store/routerStore";
import React from "react";

const PrizeDetail = () => {
  const { navigate } = useRouterStore();
  return <button onClick={() => navigate("prize")}>irx</button>;
};

export default PrizeDetail;
