export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({
        error: "Parâmetro 'prompt' é obrigatório"
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDlfJ-lHUvNweKZXaWwJ2CyIUEnFXIT3X4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 👇 TRATAMENTO REAL
    if (data.error) {
      return res.status(500).json({
        error: "Erro do Gemini",
        details: data.error.message
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        error: "IA respondeu vazio",
        raw: data
      });
    }

    res.status(200).json({ response: text });

  } catch (err) {
    res.status(500).json({
      error: "Erro interno",
      details: err.message
    });
  }
}
