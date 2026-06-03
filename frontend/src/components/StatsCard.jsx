function StatsCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "16px",
        width: "220px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          color: "gray",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatsCard;