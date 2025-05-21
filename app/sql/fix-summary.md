# Database Migration Issues: Complete Resolution Report

## Initial Problem

The migration process was failing with the error: `constraint "reviews_category_id_categories_category_id_fk" of relation "reviews" does not exist`. This indicated a mismatch between migration files and actual database schema.

## Step 1: Diagnosing Schema Discrepancies

We identified that the migration file `0015_common_molly_hayes.sql` was trying to add a `category_id` column as `NOT NULL` to the `reviews` table, but there were existing rows with `NULL` values.

## Step 2: Modifying Schema Definitions

We modified the `app/features/products/schema.ts` file to match what was needed:

```typescript
// Changed category_id to allow NULL values
category_id: bigint({ mode: 'number' })
  .references(() => categories.category_id, { onDelete: 'set null' }),
```

## Step 3: Fixing Migration Files

We updated several migration files to use conditional SQL to prevent errors:

### Modified `0015_common_molly_hayes.sql`:

```sql
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
```

### Modified `0016_cold_sabra.sql`:

```sql
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
```

### Modified `0019_fancy_bloodstorm.sql`:

```sql
-- No operation, this migration is just to handle schema sync
-- All necessary changes are already handled in the previous migrations
```

## Step 4: Running Migrations

After updating the migration files, we successfully ran the migration:

```bash
npm run db:migrate
```

## Step 5: Fixing Missing Database Views

After fixing the migration issues, we encountered errors with missing database views. We recreated these views:

### 1. Created `community_post_list_view`:

```sql
CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
  posts.post_id,
  posts.title,
  posts.created_at,
  topics.name AS topic,
  profiles.name AS author,
  profiles.avatar AS author_avatar,
  profiles.username AS author_username,
  posts.upvotes,
  topics.slug AS topic_slug,
  (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = posts.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted
FROM posts
INNER JOIN topics USING (topic_id)
INNER JOIN profiles USING (profile_id);
```

### 2. Created `community_post_detail` view:

```sql
CREATE OR REPLACE VIEW community_post_detail AS
SELECT
    posts.post_id,
    posts.title,
    posts.content,
    posts.upvotes,
    posts.created_at,
    topics.topic_id,
    topics.name as topic_name,
    topics.slug as topic_slug,
    COUNT(post_replies.post_reply_id) as replies,
    profiles.name as author_name,
    profiles.avatar as author_avatar,
    profiles.role as author_role,
    profiles.created_at as author_created_at,
    (SELECT COUNT(*) FROM products WHERE products.profile_id =  profiles.profile_id) as products,
    (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = posts.post_id AND post_upvotes.profile_id =auth.uid())) AS is_upvoted
FROM posts
INNER JOIN topics  USING (topic_id)
LEFT JOIN post_replies USING (post_id)
INNER JOIN profiles ON (profiles.profile_id = posts.profile_id)
GROUP BY posts.post_id, topics.topic_id, topics.name, topics.slug, profiles.name, profiles.avatar, profiles.role, profiles.created_at, profiles.profile_id;
```

### 3. Created `gpt_ideas_view`:

```sql
CREATE OR REPLACE VIEW gpt_ideas_view AS
SELECT
  gpt_ideas.gpt_idea_id,
  CASE WHEN gpt_ideas.claimed_at IS NULL THEN gpt_ideas.idea ELSE 'Alredy Claimed' END AS idea,
  gpt_ideas.views,
  CASE WHEN gpt_ideas.claimed_at IS NULL THEN FALSE ELSE TRUE END AS is_claimed,
  COUNT(gpt_ideas_likes.gpt_idea_id) AS likes,
  gpt_ideas.created_at
FROM public.gpt_ideas
LEFT JOIN public.gpt_ideas_likes USING (gpt_idea_id)
GROUP BY gpt_ideas.gpt_idea_id;
```

### 4. Created `product_overview_view`:

```sql
CREATE OR REPLACE VIEW product_overview_view AS
SELECT
    product_id,
    name,
    tagline,
    description,
    how_it_works,
    icon,
    url,
    stats->>'upvotes' as upvotes,
    stats->>'views' AS views,
    stats->>'reviews' AS reviews,
    AVG(product_reviews.rating) as average_rating
FROM public.products
LEFT JOIN public.reviews AS product_reviews USING (product_id)
GROUP BY product_id;
```

## Step 6: Fixing Foreign Key Relationship Issues

We fixed the missing foreign key relationship between `team` and `profiles` tables:

```sql
-- team과 profiles 사이의 외래 키 관계를 명시적으로 설정
ALTER TABLE team
ADD CONSTRAINT team_team_leader_id_fkey
FOREIGN KEY (team_leader_id)
REFERENCES profiles(profile_id)
ON DELETE CASCADE;

-- Supabase 전용 RLS 주석을 추가하여 조인을 허용
COMMENT ON CONSTRAINT team_team_leader_id_fkey ON team IS E'@foreignKey (team_leader_id) references public.profiles(profile_id)';
```

## Step 7: Fixing NOT NULL Constraint Issue in Notifications Table

We modified the `notifications` table to allow NULL values in the `target_id` column:

```sql
-- target_id 컬럼의 NOT NULL 제약조건 제거
ALTER TABLE notifications ALTER COLUMN target_id DROP NOT NULL;
```

## Root Causes of the Problems

1. Conflicts between schema definitions and migration files
2. Missing database views that were required by the application
3. Foreign key relationships that were missing or incorrectly defined
4. NOT NULL constraints on columns that needed to accept NULL values

## Prevention Strategies

1. Always run migrations in development first before production
2. Regularly sync schema definitions between the code and database
3. Use conditional DDL statements in migrations to avoid errors
4. Include view creation as part of the migration process
5. Test database schema changes thoroughly before deployment
