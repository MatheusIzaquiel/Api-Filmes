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

    if (!filmId) {
      return res.status(400).json({ message: "ID do filme inválido!" });
    }

    if (!title && !description && !banner) {
      return res.status(400).json({
        message: "Pelo menos um campo deve ser fornecido para atualização!",
      });
    }

    const updatedFilm = await prisma.film.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        banner,
      },
    });

    return res.status(200).json({
      message: `O filme ${title} foi atualizado com sucesso!`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Filme não encontrado!" });
    }
    return res.status(500).json({
      message:
        "Não foi possível atualizar as informações do filme no banco de dados!",
    });
  }
};
