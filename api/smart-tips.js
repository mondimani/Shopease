// 1. Optional import for Vercel (only needed if fetch is undefined)
// import fetch from 'node-fetch'; // uncomment this only if fetch is not defined

const { OPENAI_API_KEY } = process.env;

export default async function handler(req, res) {
  const staticTips = [
    "🔒 Browse featured deals daily!",
    "🔍 Use filters to narrow your search.",
    "🎁 Apply code WELCOME25 for 25% off.",
    "📦 Check orders in your dashboard.",
    "💖 Add favorites to your wishlist!"
  ];

  let dynamicTip = null;

  try {
    console.log("OpenAI Key Loaded:", OPENAI_API_KEY?.length > 10); // ✅ Line 13: confirms env var exists

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful e-commerce assistant. Give 1 useful tip in under 25 words to help users navigate a shopping website."
          }
        ],
        temperature: 0.7,
        max_tokens: 60
      })
    });

    // ✅ Line 31: API status check
    if (!openaiResponse.ok) {
      const errorBody = await openaiResponse.text();
      console.error("OpenAI API Error:", openaiResponse.status, errorBody);
      throw new Error("OpenAI API returned an error.");
    }

    const data = await openaiResponse.json();
    dynamicTip = data?.choices?.[0]?.message?.content?.trim();
  } catch (err) {
    console.error("Failed to fetch dynamic tip:", err);
  }

  const tips = dynamicTip ? [dynamicTip, ...staticTips] : staticTips;

  res.status(200).json({ tips });
}
