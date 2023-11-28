const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

//Endpoint /sales: Muestra todas las ventas.

router.get("/", async (req, res) => {
  try {
    const sales = await prisma.Venta.findMany();
    res.json(sales);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

//Endpoint /sales/:id: Muestra una venta en particular.

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const sale = await prisma.Venta.findUnique({
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

//Endpoint /sales/book/:isbn: Muestra todas las ventas de un libro en particular.

router.get("/book/:isbn", async (req, res) => {
  try {
    const salesByBook = await prisma.Venta.findMany({
      where: {
        ISBN: req.params.isbn,
      },
    });
    res.json(salesByBook);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /sales/date/:date: Muestra todas las ventas realizadas en una fecha en particular. consejo: usa new Date() para convertir una cadena de fecha en un objeto de fecha y poder compararla con la fecha de la base de datos.

router.get("/date/:date", async (req, res) => {
  try {
    const salesByDate = await prisma.Venta.findMany({
      where: {
        Fecha_Venta: new Date(req.params.date).toISOString(),
      },
    });
    res.json(salesByDate);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

//Endpoint /sales/top: Extrae el libro con el mayor ingreso total generado.

module.exports = router;
