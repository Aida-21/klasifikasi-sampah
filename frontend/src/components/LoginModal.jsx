import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function LoginModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  async function handleSubmit() {
    let url = "";
    let body = {};

    if (mode === "login") {
      url = `${API_URL}/api/auth/login`;
      body = { email, password };
    }

    if (mode === "register") {
      url = `${API_URL}/api/auth/register`;
      body = { name, email, password };
    }

    if (mode === "verifyOtp") {
      url = `${API_URL}/api/auth/verify-otp`;
      body = { email, otp };
    }
    if (mode === "forgotPassword") {
      url = `${API_URL}/api/auth/forgot-password`;
      body = { email };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      if (mode === "register") {
        alert("Register berhasil. Silakan cek email untuk kode OTP.");
        setMode("verifyOtp");
        setPassword("");
        return;
      }

      if (mode === "verifyOtp") {
        alert("Email berhasil diverifikasi. Silakan login.");
        setMode("login");
        setOtp("");
        setPassword("");
        return;
      }
      if (mode === "forgotPassword") {
        alert("Link reset password telah dikirim ke email.");
        setMode("login");
        setPassword("");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user);
      onClose();
    } catch (error) {
      console.log(error);
      alert("Gagal login/register");
    }
  }

  async function handleResendOtp() {
    try {
      if (!email) {
        alert("Email wajib diisi");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("OTP baru berhasil dikirim ke email");
    } catch (error) {
      console.log(error);
      alert("Gagal mengirim ulang OTP");
    }
  }

  function handleSwitchMode() {
    setMode(mode === "login" ? "register" : "login");
    setName("");
    setPassword("");
    setOtp("");
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "350px",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {mode === "login" && "Login"}
          {mode === "register" && "Register"}
          {mode === "verifyOtp" && "Verifikasi OTP"}
          {mode === "forgotPassword" && "Lupa Password"}
        </h2>

        {mode === "register" && (
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={mode === "verifyOtp"}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          style={{
            ...inputStyle,
            backgroundColor: mode === "verifyOtp" ? "#f3f4f6" : "white",
          }}
        />
        {mode === "forgotPassword" && (
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginTop: "-5px",
              marginBottom: "20px",
              lineHeight: "1.5",
            }}
          >
            Masukkan email akun Anda. Kami akan mengirimkan link reset password ke email tersebut.
          </p>
        )}

        {(mode === "login" || mode === "register") && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              style={{
                ...inputStyle,
                marginBottom: mode === "login" ? "8px" : "20px",
              }}
            />

            {mode === "login" && (
              <div
                style={{
                  textAlign: "right",
                  marginBottom: "18px",
                }}
              >
                <span
                  onClick={() => setMode("forgotPassword")}
                  style={{
                    color: "#10b981",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Lupa Password?
                </span>
              </div>
            )}
          </>
        )}

        {mode === "verifyOtp" && (
          <>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                marginTop: "-5px",
                marginBottom: "15px",
                lineHeight: "1.5",
              }}
            >
              Masukkan kode OTP yang dikirim ke email Anda.
            </p>

            <input
              type="text"
              placeholder="Masukkan OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              style={{
                ...inputStyle,
                textAlign: "center",
                letterSpacing: "4px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            />
          </>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {mode === "login" && "Login"}
          {mode === "register" && "Register"}
          {mode === "verifyOtp" && "Verifikasi OTP"}
          {mode === "forgotPassword" && "Kirim Link Reset"}
        </button>

        {mode === "verifyOtp" && (
          <button
            onClick={handleResendOtp}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #10b981",
              color: "#10b981",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Kirim Ulang OTP
          </button>
        )}

        {mode !== "verifyOtp" && mode !== "forgotPassword" && (
          <button
            onClick={handleSwitchMode}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #10b981",
              color: "#10b981",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            {mode === "login"
              ? "Belum punya akun? Register"
              : "Sudah punya akun? Login"}
          </button>
        )}
        {mode === "forgotPassword" && (
          <button
            onClick={() => {
              setMode("login");
              setPassword("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #10b981",
              color: "#10b981",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Kembali ke Login
          </button>
        )}

        {mode === "verifyOtp" && (
          <button
            onClick={() => {
              setMode("login");
              setOtp("");
              setPassword("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "white",
              border: "1px solid #10b981",
              color: "#10b981",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Kembali ke Login
          </button>
        )}

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#eee",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};

export default LoginModal;