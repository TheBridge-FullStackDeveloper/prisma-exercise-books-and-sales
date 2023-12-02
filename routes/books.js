const express = require('express');
const router = express.Router();

const prisma = require('../prisma');

// Endpoint /books: Muestra todos los libros.
router.get('/', async (req, res) => {
    try {
        const books = await prisma.libro.findMany()
        res.json(books)
        console.log(books)
    } catch (e) {
        console.log(e);
        res.json('Server error')
    }
})

// Endpoint /books/:isbn: Muestra un libro en particular.


// Endpoint /books/author/:author: Muestra todos los libros de un autor en particular.
router.get('/autor/:autor', async (req, res) => {
    try{
        const books = await prisma.libro.findMany({
            where: {
                Autor : req.params.autor
            }
        })
        res.json(books)
    } catch(e) {
        res.json('Server error')
    }
})

// Endpoint /books/price/:price: Muestra todos los libros que cuestan más de 20.
router.get('/precio/:precio', async (req,res) => {
    try {
        const books = await prisma.libro.findMany({
            where: {
                Precio : {gt: parseFloat(req.params.precio)}
            }
        })
        res.json(books)
    } catch (e) {
        res.json("server error")
    }
})

// Endpoint /books/with-sales: Realiza un JOIN para combinar las tablas Libros y Ventas basándote en el ISBN.
router.get('/with-sales', async (req, res) => {
    try {
        const books = await prisma.libro.findMany({
            include: {
                Ventas: {
                    select: {
                        ID_Venta: true,
                        Cantidad: true,
                    }
                }
            }
        })
        res.json(books)
    } catch (e) {
        console.log(e);
        res.json('Server error')
    }
})

router.get('/:isbn', async (req, res) => {
    try{
        const book = await prisma.libro.findUnique({
            where: {
                ISBN : req.params.isbn
            },
        });
        res.json(book);
    } catch(e) {
        res.json('Server error')
    }
});
module.exports = router;
