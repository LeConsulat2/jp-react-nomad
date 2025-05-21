-- Only add 'freelance' value if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'freelance' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'job_types')) THEN
        ALTER TYPE "public"."job_types" ADD VALUE 'freelance';
    END IF;
END$$;
--> statement-breakpoint

-- Drop constraint only if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'post_replies_post_id_post_replies_post_reply_id_fk') THEN
        ALTER TABLE "post_replies" DROP CONSTRAINT "post_replies_post_id_post_replies_post_reply_id_fk";
    END IF;
END$$;
--> statement-breakpoint

-- Set NOT NULL constraints
DO $$
BEGIN
    -- Check if columns allow NULL before setting NOT NULL
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'topic_id' AND is_nullable = 'YES') THEN
        ALTER TABLE "posts" ALTER COLUMN "topic_id" SET NOT NULL;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'profile_id' AND is_nullable = 'YES') THEN
        ALTER TABLE "posts" ALTER COLUMN "profile_id" SET NOT NULL;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND column_name = 'product_id' AND is_nullable = 'YES') THEN
        ALTER TABLE "reviews" ALTER COLUMN "product_id" SET NOT NULL;
    END IF;
END$$;
--> statement-breakpoint

-- Add columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'post_replies' AND column_name = 'parent_id') THEN
        ALTER TABLE "post_replies" ADD COLUMN "parent_id" bigint;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND column_name = 'category_id') THEN
        ALTER TABLE "reviews" ADD COLUMN "category_id" bigint;
    END IF;
END$$;
--> statement-breakpoint

-- Add foreign key constraints if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'post_replies_post_id_posts_post_id_fk') THEN
        ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'post_replies_parent_id_post_replies_post_reply_id_fk') THEN
        ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_parent_id_post_replies_post_reply_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_replies"("post_reply_id") ON DELETE cascade ON UPDATE no action;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reviews_category_id_categories_category_id_fk') THEN
        ALTER TABLE "reviews" ADD CONSTRAINT "reviews_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE set null ON UPDATE no action;
    END IF;
END$$;