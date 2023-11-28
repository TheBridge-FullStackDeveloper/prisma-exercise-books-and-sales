const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

//Endpoint /books: Muestra todos los libros.

router.get("/", async (req, res) => {
  try {
    const books = await prisma.Libro.findMany();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /books/:isbn: Muestra un libro en particular.

router.get("/:isbn", async (req, res) => {
  try {
    const book = await prisma.Libro.findUnique({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(book);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /books/author/:author: Muestra todos los libros de un autor en particular.

router.get("/author/:author", async (req, res) => {
  try {
    const bookByAuthor = await prisma.Libro.findMany({
      where: {
        Autor: req.params.author,
      },
    });
    res.json(bookByAuthor);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /books/price/:price: Muestra todos los libros que cuestan más de 20.

router.get("/price/:price", async (req, res) => {
  try {
    const bookByPrice = await prisma.Libro.findMany({
      where: {
        Precio: {
          gt: parseFloat(req.params.price),
        },
      },
    });
    res.json(bookByPrice);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /books/with-sales: Realiza un JOIN para combinar las tablas Libros y Ventas basándote en el ISBN.

module.exports = router;
