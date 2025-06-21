
-- Create sessions table for tracking anonymous users
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_active_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referrer TEXT,
  device_type TEXT,
  ip_address INET
);

-- Create interactions table for tracking user events
CREATE TABLE IF NOT EXISTS public.interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('generate', 'copy', 'export', 'visit_home', 'visit_explore', 'upload_image', 'like', 'share')),
  palette_id UUID REFERENCES public.palettes(id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB
);

-- Add new columns to existing palettes table
ALTER TABLE public.palettes 
ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'manual' CHECK (source_type IN ('manual', 'image', 'template')),
ADD COLUMN IF NOT EXISTS copied_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS exported_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS source_image_url TEXT;

-- Create explore_items table for curated content
CREATE TABLE IF NOT EXISTS public.explore_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  palette_id UUID NOT NULL REFERENCES public.palettes(id),
  category TEXT NOT NULL,
  featured_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER DEFAULT 0
);

-- Create indexes for better performance (skip if exists)
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON public.sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_session_id ON public.interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_event_type ON public.interactions(event_type);
CREATE INDEX IF NOT EXISTS idx_interactions_timestamp ON public.interactions(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_palettes_copied_count ON public.palettes(copied_count DESC);
CREATE INDEX IF NOT EXISTS idx_palettes_tags ON public.palettes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_explore_items_category ON public.explore_items(category);

-- Enable RLS on new tables
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explore_items ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions (allow all operations for app)
CREATE POLICY "Allow all operations on sessions" ON public.sessions FOR ALL USING (true) WITH CHECK (true);

-- Create policies for interactions (allow all operations for app)
CREATE POLICY "Allow all operations on interactions" ON public.interactions FOR ALL USING (true) WITH CHECK (true);

-- Create policies for explore_items (public read, restricted write)
CREATE POLICY "Allow read access to explore_items" ON public.explore_items FOR SELECT USING (true);
CREATE POLICY "Allow insert to explore_items" ON public.explore_items FOR INSERT WITH CHECK (true);

-- Create storage bucket for uploaded images (skip if exists)
INSERT INTO storage.buckets (id, name, public) 
SELECT 'palette-images', 'palette-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'palette-images');

-- Create storage policy for palette images
CREATE POLICY "Allow public read access to palette images" ON storage.objects 
FOR SELECT USING (bucket_id = 'palette-images');

CREATE POLICY "Allow authenticated insert to palette images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'palette-images');
