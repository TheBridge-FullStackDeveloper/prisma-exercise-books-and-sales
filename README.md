![logotipo de The Bridge](https://user-images.githubusercontent.com/27650532/77754601-e8365180-702b-11ea-8bed-5bc14a43f869.png "logotipo de The Bridge")

# 🚀 The bridge - 📘 Libros y Ventas

## 📝 Descripción del Ejercicio
Este ejercicio está diseñado para enseñarte a realizar consultas SQL con prisma para obterner informaciones de las tablas relacionadas: `Libros` y `Ventas`.

## 📖 Instrucciones

1. 🍴 Haz fork del repositorio.
2. 📥 Clona tu fork del repositorio.
3. 🎯 Crea las consultas en express para obtener las informacioens.
4. ✅ Ejecuta tus consultas para asegurarte de que funcionan como se espera.
5. 📤 Haz commit y push de tus cambios al repositorio.
6. 📧 Abre un Pull Request con tus soluciones para revisión.

⬇️ Descargar archivo SQL para importar en tu base de datos
El archivo son `libros.csv` y `ventas.csv`

✔️ Tareas a Realizar
- [ ] Endpoint `/sales/last-year`: Filtra las ventas para mostrar solo las que se realizaron en el último año.
- [ ] Endpoint `/books/total-revenue`: Agrupa los resultados por `Titulo` y `Autor` y calcula el total de ingresos por libro.
- [ ] Endpoint `/sales/most`: Ordena los libros por cantidad vendida para encontrar el más y menos vendido.
- [ ] Endpoint `/sales/top`: Extrae el libro con el mayor ingreso total generado.
- [ ] Endpoint `/books/no-sales`: Lista todos los libros que no hayan tenido ventas.
- [ ] Endpoint `/books/authors/top-sales`: Encuentra los autores cuyos libros han generado más de 10,000 en ventas.
- [ ] Endpoint `/books/international-sales`: Muestra los títulos de libros vendidos en más de 5 países.
- [ ] Endpoint `/books/price-avg`: Calcula el promedio de precios de los libros vendidos.
- [ ] Endpoint `/books/sales`: Realiza un `JOIN` para combinar las tablas `Libros` y `Ventas` basándote en el `ISBN`.
