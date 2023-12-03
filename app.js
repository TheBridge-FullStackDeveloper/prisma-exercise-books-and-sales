const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());



app.get('/books', async (req, res) => {
  try {
    const books = await prisma.libro.findMany();
    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving books from the database');
  }
});
//http://localhost:3000/books

app.get('/sales', async (req, res) => {
  try {
    const ventas = await prisma.venta.findMany();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving sales from the database');
  }
});
//http://localhost:3000/sales

app.get('/sales/top', async (req, res) => {
  try {
    const topSales = await prisma.Venta.groupBy({
      by: ['ISBN'],
    /*  _sum: {
        Cantidad: true,
      },*/
      orderBy: {
        _sum: {
          Cantidad: 'desc'
        }
      },
      take: 1
    });
    res.json(topSales);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

http://localhost:3000/sales/top




app.get('/sales/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sale = await prisma.venta.findUnique({
      where: { ID_Venta: id },
    });
  
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).send('Venta no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al recuperar la venta de la base de datos: ' + error.message);
  }
});
//http://localhost:3000/sales/1


app.get('/books/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const librosDelAutor = await prisma.libro.findMany({
      where: {
        Autor: author,
      },
    });
    res.status(200).json(librosDelAutor);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los libros del autor');
  }
});

//http://localhost:3000/books/author/Harper%20Lee


app.get('/sales/books/:isbn', async (req, res) => {
  const { isbn } = req.params; // Extraer el ISBN de los parámetros de la URL
  
  try {
    const ventasDelLibro = await prisma.venta.findMany({
      where: {
        Libro: {
          ISBN: isbn,
        },
      },
      include: {
        Libro: true, // Incluye detalles del libro en la respuesta
      },
    });

    if (ventasDelLibro.length === 0) {
      return res.status(404).send('No se encontraron ventas para el libro con ISBN: ' + isbn);
    }

    res.status(200).json(ventasDelLibro);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las ventas del libro: ' + error.message);
  }
});

//http://localhost:3000/sales/books/978-3-16-148410-10

app.get('/books/price/:price', async (req, res) => {
  const { price } = req.params; // Extraer el precio de los parámetros de la URL

  try {
    // Conecta con la base de datos y busca los libros con precio mayor a 'price'
    const librosMasCaros = await prisma.libro.findMany({
      where: {
        Precio: {
          gt: parseFloat(price), // Convierte el precio a número y busca los mayores
        },
      },
    });

    if (librosMasCaros.length === 0) {
      return res.status(404).send('No se encontraron libros con precio mayor a ' + price);
    }

    res.status(200).json(librosMasCaros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los libros con precio mayor a ' + price + ': ' + error.message);
  }
});

//http://localhost:3000/books/price/20


app.get('/sales/by-date/:date', async (req, res) => {
  const { date } = req.params; // Extraer la fecha de los parámetros de la URL

  try {
    // Convierte la cadena de fecha en un objeto de fecha
    const fechaVenta = new Date(date);

    // Calcula la fecha del día siguiente para buscar hasta la medianoche
    const fechaSiguiente = new Date(fechaVenta);
    fechaSiguiente.setDate(fechaVenta.getDate() + 1);

    // Conecta con la base de datos y busca las ventas en la fecha especificada
    const ventasEnFecha = await prisma.venta.findMany({
      where: {
        Fecha_Venta: {
          gt: fechaVenta, // Utiliza 'gte' para buscar ventas en la fecha especificada o posterior
          lt: fechaSiguiente, // Utiliza 'lt' para buscar ventas antes del día siguiente
        },
      },
      include: {
        Libro: true, // Incluye detalles del libro en la respuesta
      },
    });

    if (ventasEnFecha.length === 0) {
      return res.status(404).send('No se encontraron ventas en la fecha: ' + date);
    }

    res.status(200).json(ventasEnFecha);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las ventas en la fecha ' + date + ': ' + error.message);
  }
});

//http://localhost:3000/sales/by-date/2023-08-17%2000:00:00.000




app.get('/books/with-sales', async (req, res) => {
  try {
   
    const booksWithSales = await prisma.Venta.findMany({
        include:{
            Libro:{
                /*select:{
                    Titulo:true,
                    ISBN:true,
                    Precio:true,
                }*/
            }
        }
    });
    res.json(booksWithSales);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});
//http://localhost:3000/books/with-sales







app.get('/books/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const libro = await prisma.libro.findUnique({
      where: {
        ISBN: isbn,
      },
    });

    if (!libro) {
      return res.status(404).send('Libro no encontrado'); 
    };

    res.status(200).json(libro);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving book from the database');
  }
});

//http://localhost:3000/books/978-3-16-148410-1






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


