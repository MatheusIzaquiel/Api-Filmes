import { Router } from "express";
import { deleteFilm, getFilms, newFilm, updateFilm } from "../controllers/controller.js";

export const routes = Router()

routes.get("/", getFilms)
routes.post("/", newFilm)
routes.delete("/:id", deleteFilm)
routes.put("/:id", updateFilm)