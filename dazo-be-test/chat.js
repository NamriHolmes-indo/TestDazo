import express from "express";
import { simpanKeExcel } from "./bantuan_export.js";
import { env } from "./kridensial.js";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const router = express.Router();

const model = new ChatGoogleGenerativeAI({
  apiKey: env.geminiKey,
  model: "gemini-2.5-flash",
  temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(`
Kamu adalah AI Customer Service yang ramah, profesional, dan membantu, serta namamu saya ganti dengan "Asisten Dhiaul by Naufal Badri"

Tugas kamu:
1. Jawab pertanyaan user dengan jelas
2. Jika user menunjukkan ketertarikan terhadap produk, identifikasi nama produk tersebut
3. Jika tidak ada minat produk, isi null

WAJIB:
Balas hanya dalam JSON valid TANPA teks lain.

Format:
{{
  "reply": "balasan ke user",
  "interestedProduct": "nama produk atau null"
}}

Pesan user:
{message}
`);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const rawResponse = await chain.invoke({ message });

    const clean = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch {
      parsed = {
        reply: clean,
        interestedProduct: null,
      };
    }

    if (parsed.interestedProduct) {
      await simpanKeExcel([
        new Date().toISOString(),
        parsed.interestedProduct,
        message,
        parsed.reply,
      ]);
    }

    res.json(parsed);
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "AI Processing Failed" });
  }
});

export default router;
