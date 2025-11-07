import { prisma } from "../utils/prisma.js";

export const getFilms = async (req, res) => {
  try {
    const films = await prisma.film.findMany();
    return res.status(200).json({ films });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Falha ao conectar ao banco de dados!" });
  }
};

export const getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const filmId = Number(id);

    if (isNaN(filmId)) {
      return res.status(400).json({ message: "ID inválido!" });
    }

    const film = await prisma.film.findUnique({
      where: { id: filmId },
    });

    if (!film) {
      return res.status(404).json({ message: "Filme não encontrado!" });
    }

    return res.status(200).json(film);
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return res.status(500).json({ message: "Erro interno ao buscar filme." });
  }
};


export const newFilm = async (req, res) => {
  try {
    const { title, description, banner } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Título e descrição são obrigatórios" });
    }

    const addNewFilm = await prisma.film.create({
      data: { title, description, banner },
    });

    return res.status(201).json({
      message: `O filme ${title} foi adicionado com sucesso`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "O filme não foi adicionado!" });
  }
};

export const deleteFilm = async (req, res) => {
  try {
    const filmId = req.params.id;
    const id = Number(filmId);
    if (!filmId) {
      return res.status(400).json({ message: "ID do filme inválido!" });
    }

    const deletedFilm = await prisma.film.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "O filme foi apagado do Banco de dados!",
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Filme não encontrado!" });
    }
    return res
      .status(500)
      .json({ message: "O filme não foi deletado do banco de dados!" });
  }
};

export const updateFilm = async (req, res) => {
  try {
    const { title, description, banner } = req.body;
    const filmId = req.params.id;
    const id = Number(filmId);

    if (!filmId || isNaN(id)) {
      return res.status(400).json({ message: "ID do filme inválido!" });
    }

    // Verifica se o filme existe antes de tentar atualizar
    const existingFilm = await prisma.film.findUnique({
      where: { id },
    });

    if (!existingFilm) {
      return res.status(404).json({ message: "Filme não encontrado!" });
    }

    // Atualiza apenas os campos enviados
    const updatedFilm = await prisma.film.update({
      where: { id },
      data: {
        title: title ?? existingFilm.title,
        description: description ?? existingFilm.description,
        banner: banner ?? existingFilm.banner,
      },
    });

    return res.status(200).json({
      message: `O filme "${updatedFilm.title}" foi atualizado com sucesso!`,
      film: updatedFilm,
    });

  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    return res.status(500).json({
      message: "Erro interno ao atualizar o filme.",
      error: error.message,
    });
  }
};
