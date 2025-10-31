import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

// quick sanity print when the file loads
console.log("=== MODULE LOAD: chat.js ===");
console.log("At module load time:");
console.log("  OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
console.log("  OPENAI_API_KEY length:", process.env.OPENAI_API_KEY?.length);
console.log("  GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("  GEMINI_API_KEY length:", process.env.GEMINI_API_KEY?.length);

export default async function handler(req, res) {
  console.log("🔥 /api/chat HIT");
  console.log("OPENAI_API_KEY length at request time:", process.env.OPENAI_API_KEY?.length);
  console.log("GEMINI_API_KEY length at request time:", process.env.GEMINI_API_KEY?.length);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const systemPrompt =
    "You are SheriffGPT, a weathered old-west lawman from the 1870s frontier. Speak like a genuine cowboy, full of slang and humor, but stay helpful and accurate.";

  // Try OpenAI first, fallback to Gemini
  try {
    // Try OpenAI
    if (process.env.OPENAI_API_KEY) {
      console.log("🤠 Attempting OpenAI...");
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
      });

      const reply = completion.choices[0].message.content;
      console.log("✅ OpenAI success!");
      return res.status(200).json({ reply, provider: "openai" });
    } else {
      throw new Error("OpenAI API key not configured");
    }
  } catch (openaiError) {
    console.error("❌ OpenAI failed:", openaiError.message);
    
    // Fallback to Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        console.log("🤠 Falling back to Gemini...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Convert messages to Gemini format
        const geminiMessages = messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));

        // Gemini needs the system prompt as part of the first user message or as a separate instruction
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
            {
              role: "model",
              parts: [{ text: "Howdy partner! I'm SheriffGPT, ready to help you with whatever you need." }],
            },
          ],
        });

        // Get the last user message
        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = result.response;
        const reply = response.text();

        console.log("✅ Gemini success!");
        return res.status(200).json({ reply, provider: "gemini" });
      } catch (geminiError) {
        console.error("❌ Gemini also failed:", geminiError.message);
        return res.status(500).json({
          error: `Both APIs failed. OpenAI: ${openaiError.message}, Gemini: ${geminiError.message}`,
        });
      }
    } else {
      // No Gemini key, return OpenAI error
      return res.status(500).json({
        error: `OpenAI API failed: ${openaiError.message}. Gemini API key not configured.`,
      });
    }
  }
}
