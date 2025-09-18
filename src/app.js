import express from "express"
import { routes } from "./routes/routes.js"
const app = express()
const PORT = 3344
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`O aplicativo foi iniciado na porta: ${PORT}`)
})