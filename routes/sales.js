const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {});

module.exports = router;

//- [ ] Endpoint `/sales`:

router.get("/sales", async (req, res) => {
  try {
    const sales = await prisma.venta.findMany();
    res.json(sales);
  } catch (error) {
      console.error(error);
      res.json("Server error");
    }
  });

 // [ ] Endpoint `/sales/:id`
 router.get("/sales/:id", async (req, res) => {
  try {
    const sale = await prisma.venta.findUnique({
      where: {
        ID_Venta: parseInt(req.params.id),
      },
    });
    res.json(sale);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// - [ ] Endpoint `/sales/book/:isbn`:
router.get("/sales/book/:isbn", async (req, res) => {
  try {
    const salesForBook = await prisma.venta.findMany({
      where: {
        ISBN_libro: req.params.isbn,
      },
    });
    res.json(salesForBook);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//- [ ] Endpoint `/sales/date/:date`:

router.get("/sales/date/:date", async (req, res) => {
  try {
    const requestedDate = new Date(req.params.date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: "Fecha inválida" });
    }
    
    const salesForDate = await prisma.venta.findMany({
      where: {
        FechaVenta: requestedDate,
      },
    });

    res.json(salesForDate);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});