export default function Custom404() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "'Special Elite', monospace",
        background: "linear-gradient(135deg, #8B4513 0%, #654321 50%, #3E2723 100%)",
        color: "#f4e4bc",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "1rem 0" }}>🤠</h1>
      <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
        Well, partner, this page has gone missin'!
      </h2>
      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        Looks like you've wandered off the trail. There ain't nothin' here.
      </p>
      <button
        onClick={() => window.location.href = "/"}
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "#8B0000",
          color: "#f4e4bc",
          border: "3px solid #654321",
          borderRadius: "4px",
          fontFamily: "'Uncial Antiqua', cursive",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        Head Back to Town
      </button>
    </div>
  );
}

