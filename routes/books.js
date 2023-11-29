const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const allBooks = await prisma.libro.findMany();
    res.json(allBooks);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/:isbn", async (req, res) => {
  try {
    const bookISBN = await prisma.libro.findUnique({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(bookISBN);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/author/:author", async (req, res) => {
  try {
    const booksByAuthor = await prisma.libro.findMany({
      where: {
        Autor: req.params.author.replace(/(%20)/, " "),
      },
    });
    res.json(booksByAuthor);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/price/:price", async (req, res) => {
  try {
    const booksPrice = await prisma.libro.findMany({
      where: {
        Precio: {
          gt: parseFloat(req.params.price),
        },
      },
    });
    res.json(booksPrice);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/with-sales", async (req, res) => {
  try {
    const booksWithSales = await prisma.libro.findMany({
      include: {
        ISBN: true
      },
    });
    res.json(booksWithSales);
  } catch (error) {
    res.json("Server error");
  }
});

module.exports = router;
