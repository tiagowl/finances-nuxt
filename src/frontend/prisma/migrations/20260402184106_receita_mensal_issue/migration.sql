-- AlterTable
ALTER TABLE "monthly_incomes" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "occasional_incomes" ALTER COLUMN "categoryId" DROP NOT NULL;
