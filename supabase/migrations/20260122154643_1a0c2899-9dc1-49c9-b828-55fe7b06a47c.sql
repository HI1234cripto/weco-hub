-- Make image_url nullable in news_posts table
ALTER TABLE public.news_posts ALTER COLUMN image_url DROP NOT NULL;