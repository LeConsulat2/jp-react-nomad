-- Drop constraint if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reviews_category_id_categories_category_id_fk') THEN
        ALTER TABLE "reviews" DROP CONSTRAINT "reviews_category_id_categories_category_id_fk";
    END IF;
END$$;
--> statement-breakpoint

-- Set NOT NULL constraints
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'category_id' AND is_nullable = 'YES') THEN
        ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND column_name = 'profile_id' AND is_nullable = 'YES') THEN
        ALTER TABLE "reviews" ALTER COLUMN "profile_id" SET NOT NULL;
    END IF;
END$$;
--> statement-breakpoint

-- Add constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_profile_id_profiles_profile_id_fk') THEN
        ALTER TABLE "products" ADD CONSTRAINT "products_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;
    END IF;
END$$;
--> statement-breakpoint

-- Drop column if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND column_name = 'category_id') THEN
        ALTER TABLE "reviews" DROP COLUMN "category_id";
    END IF;
END$$;