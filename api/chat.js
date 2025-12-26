export default async function handler(req, res) {
  try {
    const { prompt } = req.query;

    // Verifica se o prompt foi enviado
    if (!prompt) {
      return res.status(400).json({ error: "Parâmetro 'prompt' é obrigatório" });
    }

    // Requisição para a API Gemini Pro
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=AIzaSyDlfJ-lHUvNweKZXaWwJ2CyIUEnFXIT3X4",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Corpo do request conforme a API Gemini
          prompt: [
            {
              text: prompt
            }
          ],
          temperature: 1,
          maxOutputTokens: 500
        })
      }
    );

    const data = await response.json();

    // Pega o texto gerado ou retorna padrão se nada foi gerado
    const text = data?.candidates?.[0]?.content?.[0]?.text || "IA não respondeu";

    res.status(200).json({ response: text });

  } catch (err) {
    res.status(500).json({ error: "Erro interno", details: err.message });
  }
}
