const express = require("express");
const router = express.Router();
const prisma = require("../prisma"); 

router.get("/", async (req, res) => {
  try {
    const books = await prisma.Libro.findMany();
    res.json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;


