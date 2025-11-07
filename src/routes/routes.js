import { Router } from "express";
import {
  deleteFilm,
  getFilms,
  newFilm,
  updateFilm,
  getFilmById
} from "../controllers/controller.js";

export const routes = Router();

routes.get("/films", getFilms);
routes.get("/films/:id", getFilmById);
routes.post("/films", newFilm);
routes.delete("/films/:id", deleteFilm);
routes.put("/films/:id", updateFilm);
