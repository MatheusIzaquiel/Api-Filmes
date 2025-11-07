import express from "express"
import { routes } from "./routes/routes.js"
import cors from "cors";
const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: ["http://localhost:5173","https://catalogo-de-filmes-eta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json())
app.use(routes)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`O aplicativo foi iniciado na porta: ${PORT}`)
})