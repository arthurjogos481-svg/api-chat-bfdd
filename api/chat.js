export default async function handler(req, res) {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({
        error: "Parâmetro 'prompt' é obrigatório"
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCGoBDkcTWYTV2jTN7NHYupCQQ0ZMWns6w",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "IA não respondeu";

    res.status(200).json({
      response: text
    });

  } catch (err) {
    res.status(500).json({
      error: "Erro interno",
      details: err.message
    });
  }
      }
