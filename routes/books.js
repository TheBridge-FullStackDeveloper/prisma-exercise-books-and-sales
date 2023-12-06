const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const allBooks = await Prisma.libro.findMany({});
    res.json(allBooks);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/author/:author", async (req, res) => {
  try {
    const autor = await Prisma.libro.findMany({
      where: {
        Autor: req.params.author,
      },
    });
    res.json(autor);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/price/:price", async (req, res) => {
  try {
    const price = await Prisma.libro.findMany({
      where: {
        Precio: {
          gt: Number(req.params.price),
        },
      },
    });
    res.json(price);
  } catch (error) {
    res.json("Internal Server Error");
  }
});

router.get("/with-sales", async (req, res) => {
  try {
    const withSales = await Prisma.venta.findMany({
      include: {
        ibro: {
          select: {
            Titulo: true,
            Autor: true,
          },
        },
      },
    });

    res.json(withSales);
  } catch (error) {
    console.log(error);
    res.json("Internal Server Error");
  }
});

router.get("/:isbn", async (req, res) => {
  try {
    const isbn = await Prisma.libro.findUnique({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(isbn);
  } catch (error) {
    res.json("Internal Server Error");
  }
});
module.exports = router;
