const express = require("express");
const router = express.Router();
const prisma = require('../prisma');

// Endpoint /sales: Muestra todas las ventas.
router.get("/", async (req, res) => {
    try {
        const sales = await prisma.venta.findMany()
        res.json(sales)
        console.log(sales)
    } catch (e) {
        console.log(e);
        res.json('Server error')
    }
});

// Endpoint /sales/:id: Muestra una venta en particular.
// router.get('/:id', async (req, res) => {
//     try {
//         const sales = await prisma.venta.findUnique({
//             where: {
//                 ID_Venta : parseInt(req.params.id)
//             }
//         })
//         res.json(sales)
//     } catch (e) {
//         res.json('Server Error')
//     }
// })

// Endpoint /sales/book/:isbn: Muestra todas las ventas de un libro en particular.
router.get('/book/:isbn', async (req, res) => {
    try {
        const sales = await prisma.venta.findMany({
            where: {
                ISBN : req.params.isbn
            }
        })
        res.json(sales)
    } catch (e) {
        res.json('Server Error')
    }
})

// Endpoint /sales/date/:date: Muestra todas las ventas realizadas en una fecha en particular. 
//consejo: usa new Date() para convertir una cadena de fecha en un objeto de fecha y poder compararla 
//con la fecha de la base de datos.
router.get('/date/:date', async (req, res) => {
    try {
        const updatedDate = new Date(req.params.date)
        const sales = await prisma.venta.findMany({
            where: {
                Fecha_Venta: updatedDate
            }
        })
        res.json(sales)
    } catch (e) {
        res.json('Server Error')
    }
})

// Endpoint /sales/top: Extrae el libro con el mayor ingreso total generado.
router.get("/top", async (req, res) => {
    try {
        //Obtengo los libtos con un array de ventas donde pone las cantidades vendidas
        const books = await prisma.libro.findMany({
            include: {
                Ventas: {
                    select: {
                        Cantidad: true,
                    }
                }
            }
        })
        let bookTop; 
        let maxVentas = 0;
        books.forEach(book => {
            const totalVentas = book.Ventas.reduce((acc, venta) => acc + venta.Cantidad, 0);
            if (totalVentas > maxVentas) {
                maxVentas = totalVentas;
                bookTop = {book, totalVentas};
            }
        })
        res.json(bookTop)
    } catch (e) {
        console.log(e);
        res.json('Server erroor')
    }
});
module.exports = router;
