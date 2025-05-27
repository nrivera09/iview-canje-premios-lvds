import { ROUTES } from "./routes";
import { useRouterStore } from "./store/routerStore";

export const Router: React.FC = () => {
  const { currentRoute, params } = useRouterStore();

  const routeConfig = ROUTES[currentRoute] || ROUTES["prize"];
  const PageComponent = routeConfig.component;

  return <PageComponent {...params} />;
};
