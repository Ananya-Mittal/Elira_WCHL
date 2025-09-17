-- Create community posts table
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for community posts
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for community posts
CREATE POLICY "community_posts_select_all" ON public.community_posts 
  FOR SELECT USING (true);

CREATE POLICY "community_posts_insert_own" ON public.community_posts 
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "community_posts_update_own" ON public.community_posts 
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "community_posts_delete_own" ON public.community_posts 
  FOR DELETE USING (auth.uid() = author_id);

-- Create community comments table
CREATE TABLE IF NOT EXISTS public.community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.community_comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for community comments
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for community comments
CREATE POLICY "community_comments_select_all" ON public.community_comments 
  FOR SELECT USING (true);

CREATE POLICY "community_comments_insert_own" ON public.community_comments 
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "community_comments_update_own" ON public.community_comments 
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "community_comments_delete_own" ON public.community_comments 
  FOR DELETE USING (auth.uid() = author_id);

-- Create community likes table
CREATE TABLE IF NOT EXISTS public.community_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS for community likes
ALTER TABLE public.community_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for community likes
CREATE POLICY "community_likes_select_all" ON public.community_likes 
  FOR SELECT USING (true);

CREATE POLICY "community_likes_insert_own" ON public.community_likes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "community_likes_delete_own" ON public.community_likes 
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update likes count
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for likes count
DROP TRIGGER IF EXISTS trigger_update_likes_count ON public.community_likes;
CREATE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON public.community_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- Create function to update comments count
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for comments count
DROP TRIGGER IF EXISTS trigger_update_comments_count ON public.community_comments;
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON public.community_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();
