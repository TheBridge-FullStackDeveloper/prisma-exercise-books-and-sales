const express = require("express");
const router = express.Router();
const prisma = require('../prisma');

router.get("/", async (req, res) => {
    try {
      const allSales = await prisma.venta.findMany();
      res.json(allSales);
    } catch (error) {
      res.json("Server error");
    }
  });
  
  router.get("/book/:isbn", async (req, res) => {
    const allSales = await prisma.venta.findMany({
        where: {
          ISBN: req.params.isbn,
        },
      });
    try {
      res.json(allSales);
    } catch (error) {
      res.json("Server error");
    }
  });

  router.get("/date/:date", async (req, res) => {
    const dateSales = await prisma.venta.findMany({
        where: {
          Fecha_Venta:  new Date(req.params.date)
        },
      });
    try {
      res.json(dateSales);
    } catch (error) {
      res.json("Server error");
    }
  });

  router.get("/top", async (req, res) => {
    try {
      const topSale = await prisma.venta.findUnique();
      res.json(topSale);
    } catch (error) {
      res.json("Server error");
    }
  });

  router.get("/:id", async (req, res) => {
    const sale = await prisma.venta.findUnique({
        where: {
          ID_Venta: Number(req.params.id),
        },
      });
    try {
      res.json(sale);
    } catch (error) {
      res.json("Server error");
    }
  });



module.exports = router;
