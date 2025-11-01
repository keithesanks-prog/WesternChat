import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY not found in environment variables");
      console.log("💡 Set it in your .env.local file");
      return;
    }

    console.log("🎨 Generating wood frame image with Gemini...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    cartoonish uneven wooden border made of roughly nailed logs,
    rustic and imperfect, isolated on a pure green background (#00FF00)
    with no shadows, only wood pieces visible.
    `;

    const result = await model.generateImage({
      prompt,
      size: "1024x1024",
    });

    const imageBase64 = result.data[0].b64_json;
    fs.writeFileSync("wood_frame_green.png", Buffer.from(imageBase64, "base64"));
    console.log("✅ Saved 'wood_frame_green.png' (solid green background)");
    console.log("💡 Run 'npm run process-frame' to remove the background");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();
