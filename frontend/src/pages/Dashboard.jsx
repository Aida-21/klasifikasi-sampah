import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";


const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CaptureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LeafIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const RecycleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <polyline points="23 20 23 14 17 14" />
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
  </svg>
);

const ChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const PackageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 8 12 12 14 14" />
    <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
    <polyline points="3 3 3 9 9 9" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f7f4;
    --surface: #ffffff;
    --surface2: #eef4ee;
    --border: #dce7dd;
    --accent: #2f855a;
    --accent2: #38a169;
    --accent3: #9ae6b4;
    --text: #173322;
    --text2: #5f7468;
    --text3: #8ca196;
    --error: #dc2626;
    --radius: 18px;
    --radius-sm: 12px;
    --font: 'Sora', sans-serif;
    --mono: 'Space Mono', monospace;
    --shadow: 0 18px 45px rgba(18, 64, 39, 0.08);
    --shadow-sm: 0 10px 28px rgba(18, 64, 39, 0.06);
  }

  .dash-root {
    font-family: var(--font);
    background:
      radial-gradient(circle at top left, rgba(47, 133, 90, 0.12), transparent 34%),
      linear-gradient(180deg, #f8fbf7 0%, var(--bg) 100%);
    min-height: 100vh;
    color: var(--text);
    overflow-x: hidden;
  }

  .hero {
    position: relative;
    padding: 140px 24px 78px;
    text-align: center;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -180px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 720px;
    background: radial-gradient(circle, rgba(47, 133, 90, 0.12) 0%, transparent 68%);
    pointer-events: none;
  }

  .hero-badge {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(47, 133, 90, 0.09);
    border: 1px solid rgba(47, 133, 90, 0.18);
    border-radius: 999px;
    padding: 7px 17px;
    font-size: 13px;
    color: var(--accent);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
    font-weight: 600;
  }

  .hero h1 {
    position: relative;
    z-index: 1;
    font-size: clamp(34px, 5.4vw, 62px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin-bottom: 20px;
    max-width: 820px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero h1 span {
    background: linear-gradient(135deg, var(--accent) 0%, #68b684 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    position: relative;
    z-index: 1;
    font-size: 17px;
    color: var(--text2);
    margin-bottom: 40px;
    max-width: 540px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.75;
  }

  .btn-group {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-outline,
  .btn-capture {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: var(--radius-sm);
    font-family: var(--font);
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    padding: 14px 28px;
    background: var(--accent);
    color: #ffffff;
    border: none;
    font-weight: 600;
    box-shadow: 0 12px 28px rgba(47, 133, 90, 0.22);
  }

  .btn-primary:hover {
    background: var(--accent2);
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(47, 133, 90, 0.28);
  }

  .btn-outline {
    padding: 14px 28px;
    background: rgba(255, 255, 255, 0.7);
    color: var(--accent);
    border: 1px solid var(--border);
    font-weight: 600;
    backdrop-filter: blur(10px);
  }

  .btn-outline:hover {
    background: #ffffff;
    border-color: rgba(47, 133, 90, 0.35);
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  .btn-capture {
    margin-top: 18px;
    padding: 13px 26px;
    background: var(--accent);
    color: #ffffff;
    border: none;
    font-weight: 600;
    box-shadow: 0 12px 28px rgba(47, 133, 90, 0.2);
  }

  .btn-capture:hover:not(:disabled) {
    background: var(--accent2);
    transform: translateY(-1px);
  }

  .btn-capture:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .camera-wrapper {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .camera-video {
    width: 390px;
    max-width: 90%;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    background: #000000;
  }

  .status-loading,
  .status-error {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
    padding: 12px 22px;
    border-radius: 999px;
    font-size: 14px;
  }

  .status-loading {
    background: rgba(47, 133, 90, 0.08);
    border: 1px solid rgba(47, 133, 90, 0.18);
    color: var(--accent);
  }

  .loader {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(47, 133, 90, 0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .status-error {
    background: rgba(220, 38, 38, 0.08);
    border: 1px solid rgba(220, 38, 38, 0.2);
    color: var(--error);
  }

  .stats-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    padding: 0 32px 60px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }

  .stat-card:hover {
    border-color: rgba(47, 133, 90, 0.35);
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    background: rgba(47, 133, 90, 0.09);
    border-radius: 14px;
    color: var(--accent);
    margin-bottom: 18px;
  }

  .stat-value {
    font-family: var(--mono);
    font-size: 38px;
    font-weight: 700;
    color: var(--text);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 13px;
    color: var(--text2);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .section-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 32px;
    margin-bottom: 32px;
  }

  .section-divider h2 {
    font-size: 22px;
    font-weight: 700;
    color: var(--text);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-divider h2 svg { color: var(--accent); }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .result-section {
    padding: 0 32px 60px;
    scroll-margin-top: 90px;
  }

  .result-card {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    display: flex;
    gap: 32px;
    align-items: flex-start;
    box-shadow: var(--shadow);
  }

  .result-img {
    width: 210px;
    min-width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface2);
  }

  .result-info { flex: 1; }

  .result-label {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text3);
    margin-bottom: 8px;
    font-weight: 700;
  }

  .result-type {
    font-size: 32px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  .confidence-bar-wrap { margin-bottom: 20px; }

  .confidence-bar-label {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-size: 13px;
    color: var(--text2);
    margin-bottom: 8px;
    font-weight: 600;
  }

  .confidence-bar-track {
    height: 7px;
    background: var(--surface2);
    border-radius: 999px;
    overflow: hidden;
  }

  .confidence-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #74c69d);
    border-radius: 999px;
    transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .result-desc {
    font-size: 15px;
    color: var(--text2);
    line-height: 1.75;
    padding: 16px;
    background: rgba(47, 133, 90, 0.06);
    border-left: 4px solid var(--accent);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  .history-section { padding: 0 32px 80px; }

  .history-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 18px;
  }

  .history-card {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
  }

  .history-card:hover {
    border-color: rgba(47, 133, 90, 0.35);
    transform: translateY(-3px);
    box-shadow: var(--shadow);
  }

  .history-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--surface2);
  }

  .history-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s;
  }

  .history-card:hover .history-img { transform: scale(1.04); }

  .history-badge {
    position: absolute;
    bottom: 9px;
    left: 9px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(47, 133, 90, 0.2);
    border-radius: 999px;
    padding: 5px 11px;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
  }

  .history-body { padding: 15px 16px 17px; }

  .history-result {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 4px;
  }

  .history-confidence {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--accent);
    margin-bottom: 8px;
  }

  .history-desc {
    font-size: 12px;
    color: var(--text2);
    line-height: 1.6;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text3);
    font-size: 15px;
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.62);
  }

  .empty-state svg {
    margin-bottom: 16px;
    opacity: 0.45;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 700px) {
    .hero { padding: 120px 18px 60px; }
    .stats-section,
    .result-section,
    .history-section,
    .section-divider { padding-left: 18px; padding-right: 18px; }
    .result-card { flex-direction: column; align-items: center; padding: 24px; }
    .result-img { width: 100%; min-width: 0; max-width: 280px; height: 240px; }
    .result-info { width: 100%; }
    .section-divider h2 { font-size: 19px; }
  }
`;

function Dashboard() {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const resultRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const [history, setHistory] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return [];

    const savedHistory = localStorage.getItem("scanHistory");
    try {
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
      return parsedHistory.filter(
        (item) => item && item.image && item.result && item.confidence
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [education, setEducation] = useState(null);
  const [top3, setTop3] = useState([]);
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  useEffect(() => {
    async function getHistories() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/histories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data.success) {
          const formattedHistory = data.histories.map((item) => ({
            image: `http://localhost:5000/uploads/${item.image_url}`,
            result: item.prediction,
            confidence: item.confidence,
          }));

          setHistory(formattedHistory);
          localStorage.setItem("scanHistory", JSON.stringify(formattedHistory));
        }
      } catch (error) {
        console.log(error);
      }
    }

    getHistories();
  }, [user]);

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  function getDescription(result) {
    if (result === "Kardus") {
      return "Kardus termasuk sampah yang dapat didaur ulang. Lipat dan simpan dalam kondisi kering sebelum diserahkan ke bank sampah atau fasilitas daur ulang.";
    }

    if (result === "Kertas") {
      return "Kertas dapat didaur ulang menjadi produk baru. Pastikan kertas tidak tercampur minyak, makanan, atau cairan lainnya.";
    }

    if (result === "Logam") {
      return "Logam memiliki nilai ekonomi tinggi dan dapat didaur ulang berkali-kali. Pisahkan dari sampah lain sebelum dikumpulkan.";
    }

    if (result === "Plastik") {
      return "Plastik dapat didaur ulang jika dipilah dengan benar. Bersihkan dan keringkan sebelum dibuang ke tempat daur ulang.";
    }

    if (result === "Kaca") {
      return "Kaca dapat didaur ulang menjadi produk baru. Buang dengan hati-hati untuk menghindari risiko cedera.";
    }

    if (result === "Residu") {
      return "Sampah residu merupakan sampah yang sulit atau tidak dapat didaur ulang sehingga perlu dibuang ke tempat pembuangan yang sesuai.";
    }

    return "Hasil klasifikasi tidak tersedia.";
  }

  function saveHistory(newHistory) {
    const updatedHistory = [newHistory, ...history];
    setHistory(updatedHistory);

    if (user) {
      localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
    }
  }

  async function handleCameraClick() {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOpen(true);

      setTimeout(async () => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      }, 100);
    } catch (error) {
      console.log(error);
      setError("Kamera tidak bisa diakses. Pastikan izin kamera sudah diberikan.");
    }
  }

  async function handleCaptureImage() {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);

    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/png");
    setPreview(imageUrl);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);

    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    setCameraOpen(false);

    canvas.toBlob(async (blob) => {
      const file = new File([blob], "camera-capture.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("image", file);

      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

          const headers = {};

          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }

          const response = await fetch("http://localhost:5000/api/classify", {
            method: "POST",
            headers,
            body: formData,
          });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.message || "Gagal memproses gambar dari kamera.");
          return;
        }

        setPrediction(data.prediction);
        setConfidence(data.confidence);
        setEducation(data.education);
        console.log("DATA BACKEND:", data);
        console.log("EDUCATION:", data.education);
        console.log("TOP3:", data.top3);
        console.log("DISCLAIMER:", data.disclaimer);
        setTop3(data.top3 || []);
        setDisclaimer(data.disclaimer || "");

        saveHistory({
          image: `http://localhost:5000/uploads/${data.filename}`,
          result: data.prediction,
          confidence: data.confidence,
        });
      } catch (error) {
        console.log(error);
        setError("Gagal memproses gambar dari kamera.");
      } finally {
        setLoading(false);
      }
    }, "image/png");
  }

  async function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    setError("");
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

        const headers = {};

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:5000/api/classify", {
          method: "POST",
          headers,
          body: formData,
        });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Gagal menghubungkan ke backend.");
        return;
      }

      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setEducation(data.education);
      setTop3(data.top3 || []);
      setDisclaimer(data.disclaimer || "");

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

      saveHistory({
        image: `http://localhost:5000/uploads/${data.filename}`,
        result: data.prediction,
        confidence: data.confidence,
      });
    } catch (error) {
      console.log(error);
      setError("Gagal menghubungkan ke backend.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  const totalScans = history.length;

  const anorganikCount = history.filter((item) =>
    ["Kardus", "Kertas", "Logam", "Plastik", "Kaca"].includes(item.result)
  ).length;

  const residuCount = history.filter(
    (item) => item.result === "Residu"
  ).length;

  const recyclableCount = history.filter((item) =>
    ["Kardus", "Kertas", "Logam", "Plastik", "Kaca"].includes(item.result)
  ).length;

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        <Navbar
          user={user}
          onLogin={(loggedInUser) => setUser(loggedInUser)}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("scanHistory");
            setUser(null);
            setHistory([]);
            setPreview(null);
            setPrediction("");
            setConfidence("");
            setError("");
          }}
        />

        {/* HERO */}
        <section className="hero">
          <h1>
            Pilah Sampah Lebih Mudah<br />
            dengan <span>Smart Waste Scanner</span>
          </h1>

          <p>
            Unggah atau ambil foto sampah untuk membantu mengenali jenisnya dan mendapatkan saran pengelolaan yang sesuai.
          </p>

          <div className="btn-group">
            <button className="btn-primary" onClick={handleUploadClick}>
              <UploadIcon />
              Upload Gambar
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImage}
              style={{ display: "none" }}
            />

            <button className="btn-outline" onClick={handleCameraClick}>
              <CameraIcon />
              Gunakan Kamera
            </button>
          </div>

          {cameraOpen && (
            <div className="camera-wrapper">
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <button className="btn-capture" onClick={handleCaptureImage} disabled={!cameraOpen}>
                <CaptureIcon />
                Ambil Gambar
              </button>
            </div>
          )}

          {loading && (
            <div className="status-loading">
              <span className="loader" />
              Sedang memproses gambar...
            </div>
          )}

          {error && (
            <div className="status-error">
              <AlertIcon />
              {error}
            </div>
          )}
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stat-card">
          <div className="stat-icon"><ChartIcon /></div>
          <div className="stat-value">{totalScans}</div>
          <div className="stat-label">Total Pemeriksaan</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><LeafIcon /></div>
          <div className="stat-value">{residuCount}</div>
          <div className="stat-label">Residu</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><PackageIcon /></div>
          <div className="stat-value">{anorganikCount}</div>
          <div className="stat-label">Anorganik</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><RecycleIcon /></div>
          <div className="stat-value">{recyclableCount}</div>
          <div className="stat-label">Dapat Didaur Ulang</div>
        </div>
        </section>

        {/* RESULT */}
        {preview && (
          <>
            <div className="section-divider">
              <h2><SparkleIcon />Hasil Pemeriksaan</h2>
              <div className="divider-line" />
            </div>

            <section className="result-section" ref={resultRef}>
              <div className="result-card">
                <img src={preview} alt="preview" className="result-img" />

                <div className="result-info">
                  <p className="result-label">Jenis Sampah</p>
                  <h2 className="result-type">{prediction || "—"}</h2>

                  {confidence && (
                    <div className="confidence-bar-wrap">
                      <div className="confidence-bar-label">
                        <span>Akurasi Deteksi</span>
                        <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>
                          {confidence}%
                        </span>
                      </div>
                      <div className="confidence-bar-track">
                        <div className="confidence-bar-fill" style={{ width: `${confidence}%` }} />
                      </div>
                    </div>
                  )}

                  <p className="result-desc">
                    {education?.pengelolaan || getDescription(prediction)}
                  </p>

                  {education && (
                    <div
                      style={{
                        marginTop: "18px",
                        padding: "16px",
                        borderRadius: "14px",
                        backgroundColor: "#f9fafb",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <h3 style={{ marginBottom: "8px", color: "#173322" }}>
                        {education.jenis || "Informasi Sampah"}
                      </h3>

                      <p style={{ color: "#5f7468", lineHeight: "1.7" }}>
                        {education.pengelolaan}
                      </p>
                    </div>
                  )}

                  {top3.length > 0 && (
                    <div
                      style={{
                        marginTop: "18px",
                        padding: "16px",
                        borderRadius: "14px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <h3 style={{ marginBottom: "12px", color: "#173322" }}>
                        Alternatif Prediksi
                      </h3>

                      {top3.map((item, index) => {
                        const score =
                          item.confidence <= 1
                            ? item.confidence * 100
                            : item.confidence;

                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "8px",
                              color: "#5f7468",
                              fontSize: "14px",
                            }}
                          >
                            <span>
                              {index + 1}. {item.label}
                            </span>
                            <strong>{Number(score).toFixed(2)}%</strong>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {disclaimer && (
                    <p
                      style={{
                        marginTop: "14px",
                        fontSize: "13px",
                        color: "#8ca196",
                        lineHeight: "1.6",
                      }}
                    >
                      {disclaimer}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* HISTORY */}
        <div className="section-divider">
          <h2><HistoryIcon />Riwayat Pemeriksaan</h2>
          <div className="divider-line" />
        </div>

        <section className="history-section">
          {history.length === 0 ? (
            <div className="empty-state">
              <HistoryIcon />
              <p>Belum ada riwayat pemeriksaan.</p>
            </div>
          ) : (
            <div className="history-grid">
              {history.slice(0, 5).map((item, index) => (
                <div key={index} className="history-card">
                  <div className="history-img-wrap">
                    <img src={item.image} alt="history" className="history-img" />
                    <span className="history-badge">{item.result}</span>
                  </div>

                  <div className="history-body">
                    <p className="history-result">{item.result}</p>
                    <p className="history-confidence">{item.confidence}% akurasi</p>
                    <p className="history-desc">{getDescription(item.result)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Dashboard;
