import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "../../pages/usersPages/Login";
import PageNotFound from "../../pages/PageNotFound";

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
