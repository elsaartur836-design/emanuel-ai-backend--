import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 10000;

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

app.get("/", (req, res) => {
  res.json({
    name: "Emanuel AI Backend",
    status: "online",
    model
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Mensagem vazia."
      });
    }

    const response = await client.responses.create({
      model,
      input: message
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao comunicar com a IA."
    });
  }
});

app.listen(port, () => {
  console.log(`Emanuel AI Backend rodando na porta ${port}`);
});
