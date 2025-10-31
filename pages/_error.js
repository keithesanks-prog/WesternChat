import { useRouter } from 'next/router';

function Error({ statusCode }) {
  const router = useRouter();

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
        {statusCode
          ? `Dagnabbit! A ${statusCode} error occurred on the server`
          : "Well, partner, an error occurred on the client"}
      </h2>
      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        Something went wrong on the trail. Mind tryin' again?
      </p>
      <button
        onClick={() => router.push('/')}
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
