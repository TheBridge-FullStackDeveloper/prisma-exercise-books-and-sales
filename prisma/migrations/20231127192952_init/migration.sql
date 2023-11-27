-- CreateTable
CREATE TABLE "Libro" (
    "ISBN" TEXT NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Autor" TEXT NOT NULL,
    "Precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("ISBN")
);

-- CreateTable
CREATE TABLE "Venta" (
    "ID_Venta" SERIAL NOT NULL,
    "ISBN" TEXT NOT NULL,
    "Fecha_Venta" TIMESTAMP(3) NOT NULL,
    "Cantidad" INTEGER NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("ID_Venta")
);

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_ISBN_fkey" FOREIGN KEY ("ISBN") REFERENCES "Libro"("ISBN") ON DELETE RESTRICT ON UPDATE CASCADE;
