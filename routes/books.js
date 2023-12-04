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

router.get("/author/:author", async (req, res) => {
  const bookAuthor = await prisma.libro.findMany({
    where: {
      Autor: req.params.author,
    },
  });
  try {
    res.json(bookAuthor);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/price/:price", async (req, res) => {
  try {
    const priceBook = await prisma.libro.findMany({
      where: {
        Precio: {
          gt: Number(req.params.price),
        },
      },
    });
    res.json(priceBook);
  } catch (error) {
    console.log(error);
    res.json("Server error");
  }
});

router.get("/with-sales", async (req, res) => {
  try {
    const combineTablesIsbn = await prisma.venta.findMany({
      include: {
       Libro: {
        select: {
          Autor: true,
          Titulo: true,
          Precio: true,
        }
       }
      },
    });
    res.json(combineTablesIsbn);
  } catch (error) {
    res.json("Server Error");
  }
});


router.get("/:isbn", async (req, res) => {
  const book = await prisma.libro.findUnique({
    where: {
      ISBN: req.params.isbn,
    },
  });
  try {
    res.json(book);
  } catch (error) {
    res.json("Server error");
  }
});

module.exports = router;
