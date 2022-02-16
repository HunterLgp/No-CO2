import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/templates/Layout";
import Login from "../app/Auth/login";
import Register from "../app/Auth/register";
import Dashboard from "../app/Dashboard";
import Home from "../app/Home";
import PageNotFound from "../app/PageNotFound";
import Project from "../app/Projects";
import Team from "../app/Team";
import RequiredRouter from "./requiredRouter";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="dashboard"
            element={
              <RequiredRouter>
                <Dashboard />
              </RequiredRouter>
            }
          />
          <Route
            path="team"
            element={
              <RequiredRouter>
                <Team />
              </RequiredRouter>
            }
          />
          <Route
            path="projects"
            element={
              <RequiredRouter>
                <Project />
              </RequiredRouter>
            }
          />
          <Route
            path="details"
            element={
              <RequiredRouter>
                <>hahaa</>
              </RequiredRouter>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;
