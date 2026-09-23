import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import ProfileMenu from "../components/ProfileMenu/ProfileMenu";
import { getSession } from "../services/authService";

function MainLayout() {
  const isLoggedIn = !!getSession()?.token;

  return (
    <>
      <Navbar />

      {isLoggedIn && <ProfileMenu />}

      <Outlet />
    </>
  );
}

export default MainLayout;