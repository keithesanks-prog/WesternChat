import fs from "fs";
import { removeBackground } from "@imgly/background-removal-node";

async function makeTransparent() {
  try {
    console.log("🔄 Processing wood frame image...");
    const input = fs.readFileSync("wood_frame_green.png");
    const result = await removeBackground(input);
    fs.writeFileSync("public/images/wood_frame.png", result);
    console.log("✅ Saved 'public/images/wood_frame.png' with transparent background");
    console.log("💡 Update pages/index.js to use '/images/wood_frame.png'");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("💡 Make sure 'wood_frame_green.png' exists in the root directory");
  }
}

makeTransparent();
