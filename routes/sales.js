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
    const saleDate = await prisma.venta.findFirst({
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
