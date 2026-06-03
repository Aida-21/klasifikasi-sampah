import { useState } from "react";

function UploadBox() {
  const [image, setImage] = useState(null);

  function handleImage(event) {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  return (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
        paddingBottom: "50px",
      }}
    >
      <label
        style={{
          backgroundColor: "#10b981",
          color: "white",
          padding: "14px 24px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Pilih Gambar

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }}
        />
      </label>

      {image && (
        <div style={{ marginTop: "30px" }}>
          <img
            src={image}
            alt="preview"
            style={{
              width: "300px",
              borderRadius: "16px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadBox;