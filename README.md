![logotipo de The Bridge](https://user-images.githubusercontent.com/27650532/77754601-e8365180-702b-11ea-8bed-5bc14a43f869.png "logotipo de The Bridge")

# 🚀 The bridge - 📘 Libros y Ventas

## 📝 Descripción del Ejercicio
Este ejercicio está diseñado para enseñarte a realizar consultas SQL con prisma para obterner informaciones de las tablas relacionadas: `Libros` y `Ventas`.

## 📖 Instrucciones

1. 🍴 Haz fork del repositorio.
2. 📥 Clona tu fork del repositorio.
3. 🎯 Crea las consultas en express para obtener las informaciones.
4. ✅ Ejecuta tus consultas para asegurarte de que funcionan como se espera.
5. 📤 Haz commit y push de tus cambios al repositorio.
6. 📧 Abre un Pull Request con tus soluciones para revisión.

⬇️ Descargar archivo SQL para importar en tu base de datos
El archivo son `libros.csv` y `ventas.csv`

✔️ Tareas a Realizar
## creación de la base de datos
- [ ] Ejecuta el comando `npx prisma init` para crear el archivo `prisma/schema.prisma`.
- [ ] Añade los modelos `Libros` y `Ventas` al archivo `prisma/schema.prisma`.
```prisma
model Libro {
  ISBN       String   @id @default(uuid())
  Titulo     String
  Autor      String
  Precio     Float
  Ventas     Venta[]
}

model Venta {
  ID_Venta    Int      @id @default(autoincrement())
  Libro       Libro    @relation(fields: [ISBN], references: [ISBN])
  ISBN        String
  Fecha_Venta DateTime
  Cantidad    Int
}
```
- [ ] Ejecuta el comando `npx prisma migrate dev --name init` para crear las tablas en la base de datos.
- [ ] Importa los archivos `libros.csv` y `ventas.csv` en la base de datos.

## creación de las consultas
- [ ] Endpoint `/books`: Muestra todos los libros.
- [ ] Endpoint `/sales`: Muestra todas las ventas.
- [ ] Endpoint `/books/:isbn`: Muestra un libro en particular.
- [ ] Endpoint `/sales/:id`: Muestra una venta en particular.
- [ ] Endpoint `/books/author/:author`: Muestra todos los libros de un autor en particular.
- [ ] Endpoint `/sales/book/:isbn`: Muestra todas las ventas de un libro en particular.
- [ ] Endpoint `/books/price/:price`: Muestra todos los libros que cuestan más de 20.
- [ ] Endpoint `/sales/date/:date`: Muestra todas las ventas realizadas en una fecha en particular. consejo: usa `new Date()` para convertir una cadena de fecha en un objeto de fecha y poder compararla con la fecha de la base de datos.
- [ ] Endpoint `/books/with-sales`: Realiza un `JOIN` para combinar las tablas `Libros` y `Ventas` basándote en el `ISBN`.
- [ ] Endpoint `/sales/top`: Extrae el libro con el mayor ingreso total generado.
