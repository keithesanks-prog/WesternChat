import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    console.log('=== FRONTEND: sendMessage called ===');
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) {
      console.log('Early return: input empty or loading');
      return;
    }
    
    const userMessage = input.trim();
    console.log('User message:', userMessage);
    const newMessages = [...messages, { role: "user", content: userMessage }];
    console.log('Total messages:', newMessages.length);
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Making fetch request to /api/chat...');
      console.log('Request body:', JSON.stringify({ messages: newMessages }, null, 2));
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      console.log('Response received');
      console.log('Status:', res.status);
      console.log('Status text:', res.statusText);
      console.log('OK:', res.ok);
      console.log('Headers:', Object.fromEntries(res.headers.entries()));

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      console.log('Content-Type:', contentType);
      
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("=== ERROR: Non-JSON response ===");
        console.error("Response text:", text.substring(0, 500));
        throw new Error(`Server returned ${res.status} ${res.statusText}. Make sure the Next.js dev server is running and the API route is accessible.`);
      }

      console.log('Parsing JSON response...');
      const data = await res.json();
      console.log('Parsed data:', data);
      
      if (!res.ok) {
        console.error('=== ERROR: Response not OK ===');
        console.error('Error data:', data);
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }
      
      if (data.reply) {
        console.log('✓ Success! Reply received, length:', data.reply.length);
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        console.warn('Warning: No reply in response');
        setMessages([...newMessages, { role: "assistant", content: "Well, partner, I'm havin' some trouble on my end. Give me another shot, will ya?" }]);
      }
      console.log('=== FRONTEND: sendMessage SUCCESS ===');
    } catch (error) {
      console.error("=== FRONTEND ERROR ===");
      console.error("Error type:", error.constructor.name);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      const errorMessage = error.message || "Unknown error occurred";
      
      let userFriendlyMessage = "Dagnabbit! Something went wrong on the trail.";
      
      if (errorMessage.includes("404") || errorMessage.includes("Server returned")) {
        userFriendlyMessage = "Partner, I can't find that API route. Make sure you're runnin' the dev server with 'npm run dev' and it's started up proper.";
      } else if (errorMessage.includes("API key")) {
        userFriendlyMessage = "Dagnabbit! Your OPENAI_API_KEY ain't set right. Check your .env.local file, partner.";
      } else {
        userFriendlyMessage = `Dagnabbit! ${errorMessage}`;
      }
      
      console.error("User-friendly message:", userFriendlyMessage);
      
      setMessages([...newMessages, { 
        role: "assistant", 
        content: userFriendlyMessage
      }]);
      console.log('=== FRONTEND: sendMessage ERROR END ===');
    } finally {
      setIsLoading(false);
      console.log('Loading state set to false');
    }
  };


  return (
    <div
      style={{
        backgroundImage: "url('/images/BurntParchment.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Special Elite', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <div style={{ maxWidth: 800, margin: "auto", position: "relative", zIndex: 1 }}>
        {/* Wanted Poster Header */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(244, 228, 188, 0.6) 0%, rgba(232, 213, 163, 0.6) 100%)",
            border: "8px double #8B4513",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(139,69,19,0.1)",
            transform: "rotate(-1.5deg)",
            position: "relative",
            backdropFilter: "blur(1px)",
            clipPath: "polygon(5% 0%, 95% 2%, 98% 8%, 100% 15%, 98% 92%, 95% 98%, 5% 100%, 2% 95%, 0% 5%, 2% 2%)",
          }}
        >
          <div style={{ transform: "rotate(1.2deg)" }}>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "'Uncial Antiqua', cursive",
                fontSize: "3rem",
                color: "#8B0000",
                margin: "0 0 0.5rem 0",
                textShadow: "3px 3px 0px #654321, 6px 6px 0px rgba(0,0,0,0.2)",
                letterSpacing: "0.1em",
              }}
            >
              ⚠️ WANTED ⚠️
            </h1>
            <h2
              style={{
                textAlign: "center",
                fontFamily: "'Old Standard TT', serif",
                fontSize: "2rem",
                color: "#654321",
                margin: "0.5rem 0",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              SheriffGPT
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
                color: "#5D4037",
                margin: "0.5rem 0 0 0",
                fontStyle: "italic",
              }}
            >
              "The Quickdraw Conversationalist"
            </p>
            <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#795548", marginTop: "1rem" }}>
              For: Answerin' questions faster than a rattlesnake strike
            </p>
          </div>
        </div>

        {/* Saloon Chat Window */}
        <div
          style={{
            padding: "200px 100px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            position: "relative",
          }}
        >
          {/* Wood frame overlay - positioned on top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url('/images/wood_frame.png'), url('/images/WoodBorder.png')",
              backgroundSize: "400% 800%, cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
          
          {/* All interactive content below the wood frame */}
          <div style={{ position: "relative", zIndex: 10 }}>
            {/* Black backdrop - slightly larger than chat box, behind it */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                left: "-40px",
                right: "-40px",
                bottom: "-40px",
                backgroundColor: "black",
                borderRadius: "8px",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                zIndex: 1,
              }}
            />
            
            <div
              style={{
                background: "linear-gradient(135deg, #f4e4bc 0%, #e8d5a3 100%)",
                padding: "1.5rem",
                boxShadow: "inset 0 0 30px rgba(139,69,19,0.1)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Wood grain effect */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23d4af37' fill-opacity='0.03'/%3E%3Cpath d='M0 20h100v2H0z' fill='%238B4513' fill-opacity='0.05'/%3E%3Cpath d='M0 40h100v2H0z' fill='%238B4513' fill-opacity='0.05'/%3E%3Cpath d='M0 60h100v2H0z' fill='%238B4513' fill-opacity='0.05'/%3E%3Cpath d='M0 80h100v2H0z' fill='%238B4513' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  border: "3px solid #8B4513",
                  padding: "1.5rem",
                  minHeight: "400px",
                  maxHeight: "600px",
                  overflowY: "auto",
                  backgroundColor: "rgba(244, 228, 188, 0.8)",
                  boxShadow: "inset 0 0 20px rgba(139,69,19,0.2)",
                  position: "relative",
                }}
              >
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", color: "#5D4037", padding: "2rem", fontStyle: "italic" }}>
                <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>🤠 Howdy, partner!</p>
                <p>Step right up and ask ol' SheriffGPT anything. I'm here to help, frontier-style!</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    backgroundColor: m.role === "user" ? "rgba(139, 69, 19, 0.1)" : "rgba(212, 175, 55, 0.1)",
                    borderLeft: `4px solid ${m.role === "user" ? "#8B4513" : "#D4AF37"}`,
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <strong
                    style={{
                      color: m.role === "user" ? "#8B0000" : "#654321",
                      fontFamily: "'Old Standard TT', serif",
                      fontSize: "1.1rem",
                      display: "block",
                      marginBottom: "0.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.role === "user" ? "🏜️ You" : "🤠 SheriffGPT"}
                  </strong>
                  <p style={{ color: "#3E2723", lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </p>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ textAlign: "center", color: "#5D4037", fontStyle: "italic" }}>
                <p>🤠 SheriffGPT is thinkin'...</p>
              </div>
            )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={sendMessage} style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", position: "relative", zIndex: 100 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "1rem",
                borderRadius: "4px",
                border: "3px solid #8B4513",
                backgroundColor: "#f4e4bc",
                color: "#3E2723",
                fontFamily: "'Special Elite', monospace",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              }}
              placeholder="Ask the Sheriff somethin'..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                backgroundColor: isLoading ? "#9E9E9E" : "#8B0000",
                color: "#f4e4bc",
                padding: "1rem 2rem",
                border: "3px solid #654321",
                borderRadius: "4px",
                fontFamily: "'Uncial Antiqua', cursive",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                boxShadow: isLoading ? "none" : "0 4px 8px rgba(0,0,0,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && input.trim()) {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = isLoading ? "none" : "0 4px 8px rgba(0,0,0,0.3)";
              }}
            >
              {isLoading ? "..." : "Draw!"}
            </button>
          </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            color: "#f4e4bc",
            marginTop: "2rem",
            fontSize: "0.9rem",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          ⚠️ Dead or Alive - Answers Guaranteed ⚠️
        </p>
      </div>
    </div>
  );
}
