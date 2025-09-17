-- Create shopping cart table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS for cart items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for cart items
CREATE POLICY "cart_items_select_own" ON public.cart_items 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cart_items_insert_own" ON public.cart_items 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cart_items_update_own" ON public.cart_items 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "cart_items_delete_own" ON public.cart_items 
  FOR DELETE USING (auth.uid() = user_id);

-- Create addresses table
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('home', 'work', 'other')),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  landmark TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for addresses
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Create policies for addresses
CREATE POLICY "addresses_select_own" ON public.addresses 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "addresses_insert_own" ON public.addresses 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "addresses_update_own" ON public.addresses 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "addresses_delete_own" ON public.addresses 
  FOR DELETE USING (auth.uid() = user_id);

-- Update orders table to include more payment details
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS address_id UUID REFERENCES public.addresses(id);
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_gateway TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS transaction_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_fee DECIMAL(10,2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0;
