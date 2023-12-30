-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Dishes" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "chefId" INTEGER NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "DishesOrders" (
    "orderId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DishesOrders_pkey" PRIMARY KEY ("orderId","dishId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "Id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "orderId" INTEGER,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "Id" SERIAL NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "paidAmount" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_roleId_key" ON "Users"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_paymentId_key" ON "Orders"("paymentId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishesOrders" ADD CONSTRAINT "DishesOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishesOrders" ADD CONSTRAINT "DishesOrders_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dishes"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Users"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payments"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
