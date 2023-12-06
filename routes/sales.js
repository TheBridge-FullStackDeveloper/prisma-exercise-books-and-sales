const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const Prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const allSales = await Prisma.venta.findMany({});
        res.json(allSales);
    } catch (error) {
        res.json( "Internal Server Error");
    }
});
//- [ ] Endpoint `/sales/top`: Extrae el libro con el mayor ingreso total generado.
router.get('/top', async (req, res) => {
    try {
        const topSales = await Prisma.venta.findMany({
            select:{
                Cantidad:true,
                Libro:{
                    select:{
                        Titulo:true,
                        Autor:true,
                        Precio:true,
                    }
                }
            }
        });
        const topSeller = topSales.reduce((acc,el)=>{
            const multiply = el.Cantidad * el.Libro.Precio;
            if (multiply > acc.multiply){
                return{Libro:el.Libro.Titulo, multiply}
            }
            return acc;
        },
        {
            Libro:null, 
            multiply:0
        })
        res.json(topSeller);
    } catch (error) {
        res.json(error);
    }
});



router.get('/book/:isbn', async (req, res) => {
    try {
        const isbn = await Prisma.venta.findMany({
            where:{
                ISBN : req.params.isbn
            }
        });
        res.json(isbn);
    } catch (error) {
        console.log(error)
        res.json(error);
    }
});

router.get('/date/:date', async (req, res) => {
    try {
      const salesOnDate = await Prisma.venta.findMany({
        where: {
          Fecha_Venta: new Date(req.params.date)
           
        },
      });
  
      res.json({ sales: salesOnDate });
    } catch (error) {
      res.json(error);
    }
  });
  


router.get('/:id', async (req, res) => {
    try {
        const idSales = await Prisma.venta.findUnique({
            where:{
                ID_Venta : Number(req.params.id)
            }
        });
        console.log(idSales)
        res.json(idSales);
    } catch (error) {
        res.json( "Internal Server Error");
    }
});

module.exports = router;
