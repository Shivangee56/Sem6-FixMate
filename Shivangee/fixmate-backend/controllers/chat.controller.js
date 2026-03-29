const grokChatController = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "messages required" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "FixMate",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `
You are FixMate assistant.

Rules:
- Keep answers SHORT
- Use bullet points or numbered steps
- Max 5–6 lines
- No long paragraphs
- No extra explanations
- Sound like a real app, not AI
            `,
          },
          ...messages, // user messages 그대로 pass
        ],
      }),
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Something went wrong. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { grokChatController };