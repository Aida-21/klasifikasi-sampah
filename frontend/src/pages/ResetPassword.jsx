import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleResetPassword() {
    try {
      if (!newPassword || !confirmPassword) {
        alert("Password baru dan konfirmasi wajib diisi");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Konfirmasi password tidak sama");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Password berhasil direset. Silakan login.");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Gagal reset password");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4fbf8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "380px",
          maxWidth: "100%",
          backgroundColor: "white",
          padding: "36px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "10px",
            color: "#10b981",
          }}
        >
          Reset Password
        </h2>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          Masukkan password baru untuk akun Anda.
        </p>

        <input
          type="password"
          placeholder="Password baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          style={inputStyle}
        />

        <button
          onClick={handleResetPassword}
          style={{
            width: "100%",
            padding: "13px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#10b981",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Simpan Password
        </button>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            padding: "13px",
            border: "1px solid #10b981",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#10b981",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};

export default ResetPassword;