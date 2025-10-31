# 🤠 SheriffGPT - The Quickdraw Conversationalist

A Wild West-themed ChatGPT interface built with Next.js. Chat with an AI sheriff who responds in authentic cowboy style!

## 🌟 Features

- **Old-Timey Western Design**: Vintage wanted poster aesthetic with weathered parchment background
- **Dual API Support**: Automatically falls back from OpenAI to Gemini if OpenAI fails
- **Authentic Cowboy Personality**: AI responds with authentic western slang and humor
- **Responsive Chat Interface**: Beautiful saloon-style chat window with wood borders
- **Real-time Messaging**: Smooth chat experience with auto-scrolling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key OR Google Gemini API key (or both for fallback)

### Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API keys:**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=sk-your-openai-key-here
   GEMINI_API_KEY=your-gemini-key-here
   ```
   
   **Getting API Keys:**
   - **OpenAI**: Get your key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - **Gemini**: Get your key from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ How It Works

### Architecture

This is a Next.js application with the following structure:

```
ai-chatgpt/
├── pages/
│   ├── index.js          # Main chat interface
│   ├── api/
│   │   └── chat.js       # API route handler
│   ├── _app.js           # Next.js app wrapper
│   ├── _document.js      # HTML document structure
│   └── _error.js         # Error page
├── public/
│   └── images/
│       ├── BurntParchment.png    # Background image
│       └── WoodBorder.png        # Chat box border
└── .env.local            # API keys (not in git)
```

### Request Flow

1. **User sends a message** → Frontend (`pages/index.js`)
2. **Frontend makes POST request** → `/api/chat`
3. **API route handler** (`pages/api/chat.js`):
   - Tries OpenAI first
   - If OpenAI fails → Falls back to Gemini
   - Returns AI response
4. **Frontend displays** the response in the chat

### API Fallback Logic

The chat API uses a smart fallback system:

```javascript
1. Try OpenAI API
   ├─ Success → Return response
   └─ Failure → Go to step 2

2. Try Gemini API
   ├─ Success → Return response
   └─ Failure → Return error message
```

This ensures your chat keeps working even if one API has issues!

### Western Personality System

The AI is configured with a detailed personality prompt that makes it:
- Use authentic cowboy slang (partner, pardner, varmint, dagnabbit, reckon, etc.)
- Reference western life (saloons, cattle drives, duels, frontier, etc.)
- Speak in a folksy, wise manner
- Use Old West metaphors ("faster than a rattlesnake", "slicker than a greased pig")
- Maintain helpfulness while staying in character

## 📁 Key Files Explained

### `pages/index.js`
The main chat interface component. Handles:
- Message state management
- User input handling
- API communication
- UI rendering with western theme

### `pages/api/chat.js`
The API route that:
- Receives chat messages
- Routes to OpenAI or Gemini
- Handles errors gracefully
- Returns formatted responses

### `pages/_document.js`
Custom HTML document with western-themed fonts:
- Special Elite (monospace)
- Uncial Antiqua (decorative headers)
- Old Standard TT (serif)

## 🎨 Customization

### Changing the Background

Replace `public/images/BurntParchment.png` with your own image.

### Adjusting Transparency

In `pages/index.js`, modify the wanted poster opacity:
```javascript
background: "linear-gradient(135deg, rgba(244, 228, 188, 0.6) ..."
// Change 0.6 to adjust transparency (0.0 = fully transparent, 1.0 = opaque)
```

### Modifying the Personality

Edit the system prompt in `pages/api/chat.js`:
```javascript
const systemPrompt = "You are SheriffGPT, a weathered old-west lawman...";
```

## 🐛 Troubleshooting

### "API key not configured" Error

- Make sure `.env.local` exists in the root directory
- Verify the API key is correct (no extra spaces)
- Restart the dev server after changing `.env.local`

### Chat Not Working

1. Check browser console (F12) for errors
2. Check terminal/server logs for API errors
3. Verify at least one API key is set correctly
4. Ensure the dev server is running: `npm run dev`

### Image Not Showing

- Make sure images are in `public/images/` directory
- Check file names match exactly (case-sensitive)
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔒 Security Notes

- **Never commit `.env.local`** to git (it's in `.gitignore`)
- Keep your API keys secret
- API keys are server-side only (not exposed to browser)

## 🎯 Features Breakdown

### Western Theme Elements
- ✅ Wanted poster header with torn corners
- ✅ Parchment background texture
- ✅ Wood border frame around chat
- ✅ Western fonts (Uncial Antiqua, Special Elite)
- ✅ Cowboy emoji and styling
- ✅ Authentic western color palette

### Technical Features
- ✅ Next.js 14 with Pages Router
- ✅ React hooks (useState, useEffect, useRef)
- ✅ Dual API support with fallback
- ✅ Error handling and logging
- ✅ Responsive design
- ✅ Auto-scrolling chat

## 🤝 Contributing

Feel free to fork and customize for your own western-themed projects!

## 📄 License

Free to use and modify for your projects.

---

**Made with 🤠 by the frontier**

*"Faster than a rattlesnake strike!"*

