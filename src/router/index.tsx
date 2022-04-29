import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/templates/Layout";
import Login from "../app/Auth/login";
import Register from "../app/Auth/register";
import Home from "../app/Home";
import PageNotFound from "../app/PageNotFound";

import RequiredRouter from "./requiredRouter";
import { useMemo } from "react";
import Dashboard from "../app/Dashboard";
import Project from "../app/Projects";
import Team from "../app/Team";

interface RouterRender {
  url: string;
  component: () => JSX.Element;
}

const listRouter: RouterRender[] = [
  {
    url: "dashboard",
    component: Dashboard,
  },
  {
    url: "projects",
    component: Project,
  },
  {
    url: "team",
    component: Team,
  },
];
const AppRouter = () => {
  const listRouterRender = useMemo(() => {
    return listRouter.map((router) => (
      <Route
        key={router.url}
        path={router.url}
        element={
          <RequiredRouter>
            <router.component />
          </RequiredRouter>
        }
      />
    ));
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
          {listRouterRender}
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
