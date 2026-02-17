import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  geminiKey: process.env.GOOGLE_API_KEY,
};

if (!env.geminiKey) {
  throw new Error("API belum diset");
}
