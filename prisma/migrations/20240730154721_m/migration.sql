-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "eng" TEXT NOT NULL,
    "ua" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correct" (
    "id" SERIAL NOT NULL,
    "eng" TEXT NOT NULL,
    "ua" TEXT NOT NULL,

    CONSTRAINT "Correct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotCorrect" (
    "id" SERIAL NOT NULL,
    "eng" TEXT NOT NULL,
    "ua" TEXT NOT NULL,

    CONSTRAINT "NotCorrect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_eng_key" ON "Word"("eng");

-- CreateIndex
CREATE UNIQUE INDEX "Correct_eng_key" ON "Correct"("eng");

-- CreateIndex
CREATE UNIQUE INDEX "NotCorrect_eng_key" ON "NotCorrect"("eng");
