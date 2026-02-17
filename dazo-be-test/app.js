import express from "express";
import cors from "cors";
import { env } from "./kridensial.js";
import chatRoute from "./chat.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

app.listen(env.port, () => {
  console.log("Server jalan di port", env.port);
});
