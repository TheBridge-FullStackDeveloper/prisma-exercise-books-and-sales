const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {});

module.exports = router;

//- [ ] Endpoint `/sales`:

router.get("/", async (req, res) => {
    try {
      const sales = await prisma.Venta.findMany();
      res.json(sales);
    } catch (error) {
      console.error(error);
      res.json("Server error");
    }
  });