import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyARagUr9_NVsDPdRlZz0kV1JTmlQga-9A4");

export default async function handler(req, res) {
  const { method, params, id } = req.body;

  if (req.method !== 'POST' || method !== 'ask' || !params?.query) {
    return res.status(400).json({ jsonrpc: '2.0', error: 'Invalid request', id });
  }

  const userQuery = params.query;

  try {
    // Step 1: Extract location using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const extractPrompt = `Extract only the city or location from this query: "${userQuery}"`;
    const extraction = await model.generateContent(extractPrompt);
    const location = extraction.response.text().trim();

    if (!location) {
      return res.status(400).json({ jsonrpc: '2.0', error: 'Location not identified by LLM', id });
    }

    // Step 2: Call WeatherAPI
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(location)}`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error('Weather API request failed');
    const weatherData = await weatherRes.json();

    // Step 3: Ask Gemini to summarize the weather naturally
    const weatherSummaryPrompt = `
The user asked: "${userQuery}"

Here is the weather data from a weather API (in JSON format):

${JSON.stringify(weatherData, null, 2)}

Please respond in a friendly, natural tone with a short, informative summary that answers the user's question clearly. Don't include raw numbers unless relevant.`;

    const summary = await model.generateContent(weatherSummaryPrompt);
    const finalResponse = summary.response.text().trim();

    return res.status(200).json({
      jsonrpc: '2.0',
      result: {
        location: weatherData.location.name,
        summary: finalResponse,
        raw: {
          temp_c: weatherData.current.temp_c,
          condition: weatherData.current.condition.text
        }
      },
      id
    });
  } catch (err) {
    console.error('[MCP Gemini Error]', err);
    return res.status(500).json({ jsonrpc: '2.0', error: err.message, id });
  }
}
