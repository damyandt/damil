import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "../../pages/usersPages/Login";
import RegisterPage from "../../pages/usersPages/Register";
import SelftAddingPage from "../../pages/usersPages/SelfAddingPage";
import WelcomePage from "../../pages/usersPages/WelcomePage";

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/add-yourself/:id" element={<SelftAddingPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </>
  )
);
