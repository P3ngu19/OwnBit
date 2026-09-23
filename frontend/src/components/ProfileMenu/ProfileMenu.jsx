import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getSession, logout } from "../../services/authService";

import "./ProfileMenu.css";

function ProfileMenu() {
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = getSession()?.user;

  const firstLetter =
    user?.full_name?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleMenuItemClick = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="profile-menu" ref={profileMenuRef}>
      <button
        type="button"
        className="profile-button"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={isProfileOpen}
      >
        <span className="profile-avatar">
          {firstLetter}
        </span>
      </button>

      {isProfileOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-avatar large">
              {firstLetter}
            </div>

            <div className="profile-user-info">
              <strong>
                {user?.full_name || "User"}
              </strong>

              <span>
                {user?.email || ""}
              </span>
            </div>
          </div>

          <div className="profile-divider" />

          <Link
            to="/dashboard"
            onClick={handleMenuItemClick}
          >
            Dashboard
          </Link>

          <Link
            to="/portfolio"
            onClick={handleMenuItemClick}
          >
            Portfolio
          </Link>

          <Link
            to="/wallet"
            onClick={handleMenuItemClick}
          >
            Wallet
          </Link>

          <Link
            to="/transactions"
            onClick={handleMenuItemClick}
          >
            Transactions
          </Link>

          <Link
            to="/certificates"
            onClick={handleMenuItemClick}
          >
            Certificates
          </Link>

          <div className="profile-divider" />

          <Link
            to="/profile"
            onClick={handleMenuItemClick}
          >
            Profile
          </Link>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;