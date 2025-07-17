Here's a full `README.md` for your **Weather API + MCP + Gemini (LLM)** project:

---

````md
# 🌤️ WeatherMCP with LLM (Gemini 1.5)

This project demonstrates a full-stack application that integrates:

- **WeatherAPI.com** for live weather data
- **Model Context Protocol (MCP)** via JSON-RPC 2.0
- **Google Gemini 1.5 Flash** LLM for natural language interaction
- **Next.js** React frontend for UI

You can ask questions like:
- _"Is it raining in Toronto?"_
- _"How hot is it in Vancouver?"_
- _"What’s the weather like in Montreal right now?"_

---

## 🧱 Tech Stack

- ✅ Next.js (App or Pages router)
- ✅ JSON-RPC 2.0 (Model Context Protocol - MCP)
- ✅ Google Generative AI SDK (`@google/generative-ai`)
- ✅ WeatherAPI.com
- ✅ TailwindCSS (optional)

---

## 🔧 Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/weather-mcp-llm.git
cd weather-mcp-llm
````

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Create `.env.local`

```env
# .env.local
WEATHER_API_KEY=your_weatherapi_key_here
GOOGLE_API_KEY=your_google_gemini_api_key
```

> 🔑 [Get WeatherAPI Key](https://www.weatherapi.com/signup.aspx)
> 🔑 [Get Google Gemini API Key](https://makersuite.google.com/app/apikey)

---

### 4. Run Dev Server

```bash
npm run dev
```

Open browser at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
components/
  WeatherMCPClient.jsx     // UI for asking LLM + Weather
pages/
  api/
    llm-mcp-weather.js     // JSON-RPC 2.0 MCP server with Gemini
  index.js                 // Entry page using WeatherMCPClient
.env.local                 // API keys
```

---

## ✨ Features

* 🔄 Ask any **natural language query** about the weather
* ⚙️ MCP-compatible API (`/api/llm-mcp-weather`) using JSON-RPC 2.0
* 📡 Live weather data fetched from WeatherAPI.com
* 🧠 Gemini LLM used for:

  * Location extraction
  * Natural summary of raw weather data

---

## 📷 Screenshots

> Add screenshots of:
>
> * UI input box
> * <img width="819" height="443" alt="image" src="https://github.com/user-attachments/assets/c2994f92-4300-43f3-ae47-c70cadb337a6" />

> * LLM response + raw weather
> * <img width="768" height="287" alt="image" src="https://github.com/user-attachments/assets/bbf4906d-9dbd-40b9-be7d-0bf541e5f8cf" />

> * Dev logs

---

## 🚀 Deployment (Optional)

You can deploy to:

* **Vercel**
* **Netlify**
* **Render**

Make sure to add your `.env.local` keys in the platform’s environment settings.

---

## 🤝 Credits

* [Google Gemini API](https://ai.google.dev/)
* [WeatherAPI](https://www.weatherapi.com/)
* Inspired by JSON-RPC & Model Context Protocol (MCP)

---

## 📜 License

MIT — free to use and modify.

```

---

Let me know if you'd like the markdown file exported or added to a GitHub repo template.
```
