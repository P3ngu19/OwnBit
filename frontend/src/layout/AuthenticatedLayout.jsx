import { Outlet } from "react-router-dom";

import "./AuthenticatedLayout.css";

function AuthenticatedLayout() {
  return (
    <div className="authenticated-app">
      <main className="app-page">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthenticatedLayout;