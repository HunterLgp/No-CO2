import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequiredRouter from "./requiredRouter";
import { FC, useMemo } from "react";
import router, { RouteValue } from "./constanst";

const renderChildrenRoute = (routers: RouteValue[]) => {
  return routers.map((value: RouteValue, index) => {
    return (
      <Route
        key={index}
        path={value.path}
        element={
          value.required ? (
            <RequiredRouter>
              <value.component />
            </RequiredRouter>
          ) : (
            <value.component />
          )
        }
      >
        {value.children ? renderChildrenRoute(value.children) : <></>}
      </Route>
    );
  }, []);
};

const AppRouter: FC = () => {
  const route = useMemo(() => {
    return renderChildrenRoute(router);
  }, []);
  return (
    <Router>
      <Routes>{route}</Routes>
    </Router>
  );
};
export default AppRouter;

