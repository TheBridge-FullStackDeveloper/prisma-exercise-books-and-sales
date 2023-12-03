const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint /books
router.get('/books', async (req, res) => {
  try {
    const books = await prisma.libro.findMany();
    res.json({ books });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Endpoint /books/:isbn
router.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const book = await prisma.libro.findUnique({
      where: { ISBN: isbn },
    });
    res.json({ book });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

  //- [ ] Endpoint `/books/author/:author`:
  router.get("/books/author/:author", async (req, res) => {
    try {
      const decodedAuthor = decodeURIComponent(req.params.author);
      const booksByAuthor = await prisma.libro.findMany({
        where: {
          Autor: decodedAuthor,
        },
      });
      res.json(booksByAuthor);
    } catch (error) {
      res.json("Server error");
    }
  });

  // [ ] Endpoint `/books/price/:price`
  
  router.get("/books/price/:price", async (req, res) => {
    try {
      const requestedPrice = parseFloat(req.params.price);
      const booksPrice = await prisma.libro.findMany({
        where: {
          Precio: {
            gt: requestedPrice,
          },
        },
      });
  
      res.json(booksPrice);
    } catch (error) {

      res.json("Server error");
    }
  });
  
  module.exports = router;