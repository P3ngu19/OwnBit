import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/layout";

import Home from "./pages/Home";

import Marketplace from "./pages/Marketplace/Marketplace";

import Explore from "./pages/Explore/Explore.jsx";

import About from "./pages/About/About";

import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import AuthenticatedLayout from "./layout/AuthenticatedLayout";

import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";

import {
  Dashboard,
  Portfolio,
  Wallet,
  Transactions,
  Certificates,
  Profile,
} from "./pages/Authenticated/AppPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            SHARED OWNBIT LAYOUT
        ========================= */}
        <Route element={<MainLayout />}>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />

          {/* Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/portfolio" element={<Portfolio />} />

              <Route path="/wallet" element={<Wallet />} />

              <Route path="/transactions" element={<Transactions />} />

              <Route path="/certificates" element={<Certificates />} />

              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* Authentication pages don't need Navbar/Profile */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
