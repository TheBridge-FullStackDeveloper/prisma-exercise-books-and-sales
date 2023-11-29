const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {})

module.exports = router;

//- [ ] Endpoint `/books`:

router.get("/", async (req, res) => {
    try {
      const books = await prisma.Libro.findMany();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.json("Server error");
    }
  });