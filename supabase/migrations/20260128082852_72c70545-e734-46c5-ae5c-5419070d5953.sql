-- Create a table to store editable site content
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key text NOT NULL UNIQUE,
  section_name text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can view site content (it's public)
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can update site content
CREATE POLICY "Only admins can update site content"
ON public.site_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert site content
CREATE POLICY "Only admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for each section
INSERT INTO public.site_content (section_key, section_name, content) VALUES
('landing_hero', 'Landing Page Hero', '{
  "title": "Empowering Tomorrow''s Environmental Leaders",
  "description": "Join Wychwood Eco Club in our mission to create a sustainable future. Together, we''re making real change through action, education, and community.",
  "cta_primary": "Get Involved",
  "cta_secondary": "Learn More"
}'::jsonb),
('about_page', 'About Page', '{
  "title": "About WECO",
  "subtitle": "Wychwood Eco Club",
  "description": "We are a passionate group of students and staff dedicated to environmental sustainability and creating positive change in our school community and beyond.",
  "mission_title": "Our Mission",
  "mission_description": "To educate, inspire, and empower students to take meaningful action for environmental sustainability.",
  "values": ["Environmental Stewardship", "Community Action", "Education & Awareness", "Sustainable Living"]
}'::jsonb),
('footer', 'Footer', '{
  "description": "Empowering students to create a sustainable future through environmental action and education.",
  "contact_name": "R. Humphres",
  "contact_email": "R.Humphreys@wychwoodschool.org",
  "copyright": "Wychwood Eco Club. Part of Wychwood School."
}'::jsonb);