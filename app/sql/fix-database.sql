-- Drop the constraint if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reviews_category_id_categories_category_id_fk') THEN
    ALTER TABLE "reviews" DROP CONSTRAINT "reviews_category_id_categories_category_id_fk";
  END IF;
END $$;

-- Drop the column if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND column_name = 'category_id') THEN
    ALTER TABLE "reviews" DROP COLUMN "category_id";
  END IF;
END $$;