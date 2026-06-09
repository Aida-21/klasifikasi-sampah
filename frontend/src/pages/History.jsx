import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaHistory } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function History() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const anorganikLabels = ["Kardus", "Kertas", "Logam", "Plastik", "Kaca"];

  useEffect(() => {
    async function getHistories() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Silakan login terlebih dahulu");
          return;
        }

        const response = await fetch(`${API_URL}/api/histories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Gagal mengambil riwayat");
          return;
        }

        setHistory(data.histories || []);
      } catch (error) {
        console.log(error);
        setError("Tidak dapat terhubung ke server");
      }
    }

    getHistories();
  }, []);

  const getDescription = (prediction) => {
    if (anorganikLabels.includes(prediction)) {
      return "Sampah ini termasuk anorganik dan dapat dipilah untuk proses daur ulang.";
    }

    if (prediction === "Residu") {
      return "Sampah residu sulit didaur ulang dan perlu dipisahkan dari sampah yang bisa didaur ulang.";
    }

    return "Pisahkan sampah sesuai jenisnya agar lebih mudah dikelola.";
  };

  const filteredHistory = history.filter((item) => {
    const resultText = item.prediction || "";

    const matchFilter =
      filter === "Semua" ||
      resultText === filter ||
      (filter === "Anorganik" && anorganikLabels.includes(resultText));

    const matchSearch = resultText
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const totalAnorganik = history.filter((item) =>
    anorganikLabels.includes(item.prediction)
  ).length;

  const totalResidu = history.filter(
    (item) => item.prediction === "Residu"
  ).length;

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Navbar
        user={user}
        onLogin={setUser}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("scanHistory");

          setUser(null);
          setHistory([]);
          window.location.href = "/";
        }}
      />

      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4fbf8",
          padding: "120px 5% 60px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "36px",
          }}
        >
          <h1
            style={{
              color: "#10b981",
              fontSize: "clamp(30px, 5vw, 42px)",
              marginBottom: "10px",
              lineHeight: "1.2",
            }}
          >
            Riwayat Klasifikasi
          </h1>

          <p
            style={{
              color: "#555",
              fontSize: "clamp(15px, 2vw, 18px)",
              margin: 0,
            }}
          >
            Lihat semua riwayat klasifikasi sampah Anda
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <StatBox title="Total" value={history.length} active />
          <StatBox title="Anorganik" value={totalAnorganik} />
          <StatBox title="Residu" value={totalResidu} />
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            marginBottom: "36px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Cari jenis sampah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 240px",
              minWidth: "0",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              flex: "1 1 260px",
            }}
          >
            {["Semua", "Anorganik", "Residu"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  flex: "1",
                  minWidth: "90px",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: filter === item ? "none" : "1px solid #10b981",
                  backgroundColor: filter === item ? "#10b981" : "white",
                  color: filter === item ? "white" : "#10b981",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "60px 30px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "70px",
                marginBottom: "20px",
              }}
            >
              <FaHistory />
            </div>

            <h2
              style={{
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              Riwayat Tidak Tersedia
            </h2>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "20px",
              }}
            >
              Silakan login untuk melihat riwayat klasifikasi Anda.
            </p>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "12px 24px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              Login Sekarang
            </button>
          </div>
        )}

        {!error && filteredHistory.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "white",
              padding: "40px 20px",
              borderRadius: "20px",
              color: "gray",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            Belum ada riwayat klasifikasi.
          </div>
        ) : (
          !error && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "18px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
                      <img
                        src={item.image_url}
                        alt="history"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <span style={{
                        position: "absolute",
                        bottom: "9px",
                        left: "9px",
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        borderRadius: "999px",
                        padding: "5px 11px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#10b981",
                      }}>
                        {item.prediction}
                      </span>
                    </div>

                    <div style={{ padding: "15px 16px 17px" }}>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>
                        {item.prediction}
                      </p>
                      <p style={{ fontSize: "12px", color: "#10b981", marginBottom: "8px", fontFamily: "monospace" }}>
                        {item.confidence}% akurasi
                      </p>
                      <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}>
                        {getDescription(item.prediction)}
                      </p>
                    </div>
                  </div>

                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontSize: "24px",
                      color: "#111827",
                    }}
                  >
                    {item.prediction}
                  </h2>

                  <p
                    style={{
                      color: "gray",
                      margin: 0,
                    }}
                  >
                    Confidence: {item.confidence}%
                  </p>

                  <p
                    style={{
                      marginTop: "12px",
                      color: "#555",
                      lineHeight: "1.6",
                      fontSize: "15px",
                    }}
                  >
                    {getDescription(item.prediction)}
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
}

function StatBox({ title, value, active }) {
  return (
    <div
      style={{
        backgroundColor: active ? "#10b981" : "white",
        color: active ? "white" : "#222",
        padding: "24px",
        borderRadius: "20px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "16px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          fontSize: "clamp(30px, 5vw, 40px)",
          margin: "10px 0 0",
          color: active ? "white" : "#10b981",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default History;