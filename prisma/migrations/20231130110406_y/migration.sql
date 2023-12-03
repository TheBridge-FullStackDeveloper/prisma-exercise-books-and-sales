-- CreateTable
CREATE TABLE "Revistas" (
    "ISBN" TEXT NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Autor" TEXT NOT NULL,
    "Precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Revistas_pkey" PRIMARY KEY ("ISBN")
);
