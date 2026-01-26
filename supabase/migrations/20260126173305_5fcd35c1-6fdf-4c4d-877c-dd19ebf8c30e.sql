-- Create a storage bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true);

-- Allow anyone to view images (public bucket)
CREATE POLICY "Public can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to update their images
CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images' 
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to delete images
CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' 
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);