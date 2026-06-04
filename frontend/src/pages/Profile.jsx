import { useEffect, useState } from "react";
import {
  FaCamera,
  FaLock,
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
  FaTrash,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const [profile, setProfile] = useState(null);
  const [histories, setHistories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErrorMessage("Token tidak ditemukan. Silakan login ulang.");
          return;
        }

        const response = await fetch(`${API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || "Gagal mengambil data profil");
          return;
        }

        if (data.success) {
          setProfile(data.user);
        } else {
          setErrorMessage(data.message || "Gagal mengambil data profil");
          return;
        }

        const historyResponse = await fetch(
          `${API_URL}/api/histories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const historyData = await historyResponse.json();

        if (historyData.success) {
          setHistories(historyData.histories || []);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("Tidak dapat terhubung ke server");
      }
    }

    getProfile();
  }, []);

  const handleEditClick = () => {
    setEditName(profile.name);
    setEditEmail(profile.email);
    setShowEditModal(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal update profil");
        return;
      }

      setProfile(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      setShowEditModal(false);
      alert("Profil berhasil diperbarui");
    } catch (error) {
      console.log(error);
      alert("Tidak dapat terhubung ke server");
    }
  };

  const handlePhotoUpload = async (event) => {
    try {
      const file = event.target.files[0];

      if (!file) return;

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch(`${API_URL}/api/profile/photo`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal upload foto profil");
        return;
      }

      setProfile(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Foto profil berhasil diperbarui");
    } catch (error) {
      console.log(error);
      alert("Tidak dapat terhubung ke server");
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile/photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal menghapus foto profil");
        return;
      }

      setProfile(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Foto profil berhasil dihapus");
    } catch (error) {
      console.log(error);
      alert("Tidak dapat terhubung ke server");
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Semua field password wajib diisi");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Konfirmasi password tidak sama");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/profile/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal mengganti password");
        return;
      }

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
      alert("Password berhasil diganti");
    } catch (error) {
      console.log(error);
      alert("Tidak dapat terhubung ke server");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      if (!deletePassword) {
        alert("Password wajib diisi");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Gagal menghapus akun");
        return;
      }

      alert("Akun berhasil dihapus");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("scanHistory");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Tidak dapat terhubung ke server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("scanHistory");
    window.location.href = "/";
  };

  if (errorMessage) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4fbf8",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "90px",
            marginBottom: "20px",
          }}
        >
          <FaLock />
        </div>

        <h1
          style={{
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Akses Ditolak
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "24px",
            maxWidth: "450px",
          }}
        >
          Anda harus login terlebih dahulu untuk melihat profil.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "14px 28px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  if (!profile) {
    return <p style={{ padding: "120px 40px" }}>Loading profil...</p>;
  }

  const joinDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum tersedia";

  const totalKlasifikasi = histories.length;

  const mingguIni = histories.filter((item) => {
    const createdAt = new Date(item.created_at);
    const now = new Date();
    const diffTime = now - createdAt;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 7;
  }).length;

  const akurasiRataRata =
    histories.length > 0
      ? Math.round(
          histories.reduce(
            (total, item) => total + Number(item.confidence),
            0
          ) / histories.length
        )
      : "-";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4fbf8" }}>
      <Navbar user={profile} onLogin={() => {}} onLogout={handleLogout} />

      <main style={{ padding: "130px 8% 60px", boxSizing: "border-box", width: "100%"}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          <section
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                height: "150px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                padding: "24px 24px",
                boxSizing: "border-box",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "clamp(28px, 5vw, 42px)",
                  margin: 0,
                  marginBottom: "8px",
                }}
              >
                Profil Saya
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(14px, 3vw, 18px)",
                  lineHeight: "1.4",
                  margin: 0,
                }}
              >
                Kelola informasi profil dan akun Anda
              </p>
            </div>

            <div style={{padding: "0 24px 30px"}}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "125px",
                  marginTop: "-25px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "125px",
                    height: "125px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#10b981",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "48px",
                    fontWeight: "bold",
                    border: "5px solid white",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  {profile.photo ? (
                    <img
                      src={`${API_URL}/uploads/${profile.photo}`}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    profile.name?.charAt(0).toUpperCase()
                  )}

                  <label
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "6px",
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                      fontSize: "15px",
                      border: "2px solid white",
                    }}
                  >
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                {profile.photo && (
                  <button
                    onClick={handleDeletePhoto}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "13px",
                      alignSelf: "center",
                    }}
                  >
                    Hapus Foto
                  </button>
                )}
              </div>

              <div style={{ textAlign: "left" }}>
                <ProfileInfo label="Nama" value={profile.name} />
                <ProfileInfo label="Email" value={profile.email} />
                <ProfileInfo label="Bergabung" value={joinDate} />
              </div>

              <button
                onClick={handleEditClick}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "15px",
                  borderRadius: "14px",
                  border: "none",
                  backgroundColor: "#10b981",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Edit Profil
              </button>
            </div>
          </section>

          <aside>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ marginBottom: "24px" }}>Statistik</h2>

              <StatItem label="Total Klasifikasi" value={totalKlasifikasi} />
              <StatItem label="Minggu Ini" value={mingguIni} />
              <StatItem
                label="Akurasi Rata-rata"
                value={akurasiRataRata === "-" ? "-" : `${akurasiRataRata}%`}
              />
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginBottom: "24px" }}>Pengaturan</h2>

              <div
                onClick={() => {
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowOldPassword(false);
                  setShowNewPassword(false);
                  setShowConfirmPassword(false);
                  setShowPasswordModal(true);
                }}
              >
                <MenuItem text="Ganti Password" icon={<FaLock />} />
              </div>

              <div
                onClick={() => {
                  setDeletePassword("");
                  setShowDeleteAccountModal(true);
                }}
              >
                <MenuItem
                  text="Hapus Akun"
                  icon={<FaTrash />}
                  danger
                />
              </div>

              <div
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  <FaSignOutAlt />
                </span>
                <span>Logout</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {showEditModal && (
        <Modal>
          <h2 style={{ marginBottom: "20px" }}>Edit Profil</h2>

          <Input
            type="text"
            placeholder="Nama"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />

          <button onClick={handleUpdateProfile} style={primaryButtonStyle}>
            Simpan Perubahan
          </button>

          <button
            onClick={() => setShowEditModal(false)}
            style={secondaryButtonStyle}
          >
            Batal
          </button>
        </Modal>
      )}

      {showPasswordModal && (
        <Modal>
          <h2 style={{ marginBottom: "20px" }}>Ganti Password</h2>

          <div
            style={{
              position: "relative",
              marginBottom: "14px",
            }}
          >
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Password lama"
              value={oldPassword}
              autoComplete="new-password"
              onChange={(e) =>
                setOldPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                paddingRight: "45px",
              }}
            />

            <span
              onClick={() =>
                setShowOldPassword(!showOldPassword)
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showOldPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginBottom: "14px",
            }}
          >
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Password baru"
              value={newPassword}
              autoComplete="new-password"
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                paddingRight: "45px",
              }}
            />

            <span
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showNewPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
                paddingRight: "45px",
              }}
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <button onClick={handleChangePassword} style={primaryButtonStyle}>
            Simpan Password
          </button>

          <button
            onClick={() => {
              setShowPasswordModal(false);
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            style={secondaryButtonStyle}
          >
            Batal
          </button>
        </Modal>
      )}
      {showDeleteAccountModal && (
        <Modal>
          <h2
            style={{
              marginBottom: "12px",
              color: "#dc2626",
            }}
          >
            Hapus Akun
          </h2>

          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              lineHeight: "1.5",
              marginBottom: "18px",
            }}
          >
            Tindakan ini akan menghapus akun Anda secara permanen. Masukkan password untuk melanjutkan.
          </p>

          <Input
            type="password"
            placeholder="Masukkan password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />

          <button
            onClick={handleDeleteAccount}
            style={{
              ...primaryButtonStyle,
              backgroundColor: "#dc2626",
            }}
          >
            Hapus Akun
          </button>

          <button
            onClick={() => {
              setShowDeleteAccountModal(false);
              setDeletePassword("");
            }}
            style={secondaryButtonStyle}
          >
            Batal
          </button>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children }) {
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
        zIndex: 2000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "20px",
          width: "360px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "14px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    />
  );
}

const primaryButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "10px",
};

const secondaryButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#eee",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

function ProfileInfo({ label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        padding: "13px 18px",
        borderRadius: "16px",
        marginBottom: "10px",
        textAlign: "left",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          margin: 0,
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      <h3 style={{ margin: 0, wordBreak: "break-word" }}>{value}</h3>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "18px",
        fontSize: "16px",
      }}
    >
      <span style={{ color: "#4b5563" }}>{label}</span>
      <strong style={{ color: "#10b981" }}>{value}</strong>
    </div>
  );
}

function MenuItem({ icon, text, danger }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px",
        borderRadius: "14px",
        cursor: "pointer",
        color: danger ? "#dc2626" : "#374151",
      }}
    >
      <span
        style={{
          color: danger ? "#dc2626" : "#10b981",
          fontSize: "18px",
        }}
      >
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

export default Profile;