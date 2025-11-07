import express from "express"
import { routes } from "./routes/routes.js"
import cors from "cors";
const app = express()
const PORT = 5000
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json())
app.use(routes)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`O aplicativo foi iniciado na porta: ${PORT}`)
})