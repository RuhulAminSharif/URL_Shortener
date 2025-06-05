import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { homePageRoute } from "./homepage";
import { authRoute } from "./auth.route";
import { dasboardRoute } from "./dasboard";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dasboardRoute,
]);
