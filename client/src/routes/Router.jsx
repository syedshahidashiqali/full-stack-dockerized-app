import React from "react";
import { Routes, Route, useMatch, Outlet } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Index";
import routes from "./routes";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Profile from "../Pages/Profile/Index";
import ContactUs from "../Pages/AboutUs/Index";

export default function Router() {
  const match = useMatch(window.location.pathname);

  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.login} element={<AuthGuard><Login /></AuthGuard>} />
      <Route path={routes.signup} element={<AuthGuard><Signup /></AuthGuard>} />
      <Route path={routes.myProfile} element={<Profile />} />
      <Route path={routes.aboutUs} element={<ContactUs />} />
    </Routes>
  );
}