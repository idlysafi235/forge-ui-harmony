
-- Create the palettes table
CREATE TABLE public.palettes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Untitled Palette',
  colors JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  likes INTEGER NOT NULL DEFAULT 0,
  user_id UUID DEFAULT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true
);

-- Create index for better performance on popular queries
CREATE INDEX idx_palettes_likes ON public.palettes (likes DESC);
CREATE INDEX idx_palettes_created_at ON public.palettes (created_at DESC);
CREATE INDEX idx_palettes_public ON public.palettes (is_public) WHERE is_public = true;

-- Enable Row Level Security
ALTER TABLE public.palettes ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (reading and creating palettes)
CREATE POLICY "Public can view public palettes" 
  ON public.palettes 
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Anyone can create palettes" 
  ON public.palettes 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update palette likes" 
  ON public.palettes 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);
