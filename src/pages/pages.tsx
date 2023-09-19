import { Home } from "./Home";
import { AuthLogout, AuthLogin, AuthCallback } from "./Auth";
import { Dashboard } from "./Dashboard";
import { createBrowserRouter, redirect } from "react-router-dom";
import { checkUserAuthentication } from "../common";
import { getToolRoutes } from "./Dashboard/tools/tools";

async function protectedLoader(): Promise<Response | null> {
  const isAuthenticated = await checkUserAuthentication();

  if (!isAuthenticated) {
    return redirect("/auth/login");
  }
  return null;
}

const pages = createBrowserRouter([
  {
    id: "root",
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "auth/login",
        Component: AuthLogin,
      },
      {
        path: "auth/callback",
        Component: AuthCallback,
        loader: async function authLoader() {
          return redirect("/dashboard");
        },
      },
      {
        path: "auth/logout",
        Component: AuthLogout,
      },
      {
        path: "dashboard",
        loader: protectedLoader,
        Component: Dashboard,
        children: getToolRoutes(),
      },
    ],
  },
]);

export default pages;
