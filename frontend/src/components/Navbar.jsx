import { useState } from "react";
import {
  FaHistory,
  FaHome,
  FaLeaf,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import LoginModal from "./LoginModal";
import { useLocation } from "react-router-dom";

function Navbar({ user, onLogin, onLogout }) {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 40px",
          borderBottom: "1px solid #e5e7eb",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 999,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              backgroundColor: "#10b981",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            <FaLeaf />
          </div>

          <h2
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "22px",
              fontWeight: "800",
            }}
          >
            Klasifikasi Sampah
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              style={{
                padding: "11px 22px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#10b981",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
                boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#d1fae5",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              {open ? <FaTimes /> : <FaUser />}
            </button>
          )}

          {open && user && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "58px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                width: "220px",
                overflow: "hidden",
                zIndex: 1000,
                border: "1px solid #eef2f7",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #f1f5f9",
                  backgroundColor: "#f9fafb",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#111827",
                    marginBottom: "4px",
                  }}
                >
                  {user.name || "User"}
                </strong>
                <small
                  style={{
                    color: "#6b7280",
                    wordBreak: "break-word",
                  }}
                >
                  {user.email}
                </small>
              </div>

              <MenuItem
                icon={<FaHome />}
                text="Dashboard"
                active={location.pathname === "/"}
                onClick={() => {
                  window.location.href = "/";
                }}
              />

              <MenuItem
                icon={<FaUser />}
                text="Profil"
                active={location.pathname === "/profile"}
                onClick={() => {
                  window.location.href = "/profile";
                }}
              />

              <MenuItem
                icon={<FaHistory />}
                text="Riwayat"
                active={location.pathname === "/history"}
                onClick={() => {
                  window.location.href = "/history";
                }}
              />

              <div
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  cursor: "pointer",
                  color: "#dc2626",
                  borderTop: "1px solid #f1f5f9",
                  fontWeight: "600",
                }}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(loggedInUser) => {
          onLogin(loggedInUser);
          setShowLogin(false);
        }}
      />
    </>
  );
}

function MenuItem({icon, text, onClick, active, }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        cursor: "pointer",
        color: active ? "#10b981" : "#374151",
        backgroundColor: active
          ? "#ecfdf5"
          : "white",
        fontWeight: active ? "700" : "500",
        borderBottom: "1px solid #f1f5f9",
        transition: "0.2s",
      }}
    >
      <span
        style={{
          color: active
            ? "#10b981"
            : "#6b7280",
          fontSize: "16px",
          display: "flex",
        }}
      >
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

export default Navbar;