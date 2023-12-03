const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  try {
    const allSales = await prisma.venta.findMany();
    res.json(allSales);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/top", async (req, res) => {
  try {
    const books = await prisma.libro.findMany();
    const sales = await prisma.venta.findMany();

    const profits = books.map((book) => {
      const sale = sales.find((e) => e.ISBN === book.ISBN);
      if (sale) {
        const profit = book.Precio * sale.Cantidad;
        return {
          ISBN: book.ISBN,
          Titulo: book.Titulo,
          Autor: book.Autor,
          profit: parseFloat(profit.toFixed(2)),
        };
      }
      return null;
    });

    const highestProfitBook = profits.reduce(
      (prev, current) => {
        return current && current.profit > prev.profit ? current : prev;
      },
      { profit: -Infinity }
    );

    res.json(highestProfitBook);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const saleID = await prisma.venta.findUnique({
      where: {
        ID_Venta: parseInt(req.params.id),
      },
    });
    res.json(saleID);
  } catch (error) {
    res.json("Server error");
  }
});

router.get("/book/:isbn", async (req, res) => {
  try {
    const saleISBN = await prisma.venta.findFirst({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(saleISBN);
  } catch (error) {
    res.json("Server error");
  }
});
router.get("/date/:date", async (req, res) => {
  try {
    const saleDate = await prisma.venta.findMany({
      where: {
        Fecha_Venta: new Date(req.params.date),
      },
    });
    res.json(saleDate);
  } catch (error) {
    res.json("Server error");
  }
});

module.exports = router;
