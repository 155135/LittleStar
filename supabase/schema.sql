-- ========================================================
-- LittleHeroes Database Schema (Supabase)
-- Jalankan skrip ini di SQL Editor Supabase kamu (1-Click Run)
-- ========================================================

-- 1. Tabel Profil Anak & Orang Tua
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY DEFAULT 'child_bima_001',
  name TEXT NOT NULL DEFAULT 'Bima',
  age TEXT DEFAULT '5 Tahun',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
  current_stars INTEGER NOT NULL DEFAULT 18,
  total_collected INTEGER NOT NULL DEFAULT 48,
  total_redeemed INTEGER NOT NULL DEFAULT 30,
  parent_pin TEXT NOT NULL DEFAULT '1234',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel Misi Harian / Quests
CREATE TABLE IF NOT EXISTS public.quests (
  id TEXT PRIMARY KEY,
  child_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE DEFAULT 'child_bima_001',
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT DEFAULT 'Kemandirian',
  icon TEXT DEFAULT 'star',
  icon_bg TEXT DEFAULT 'bg-primary-fixed',
  border_color TEXT DEFAULT 'border-tactile-shadow-amber',
  icon_color TEXT DEFAULT 'text-primary-container',
  stars INTEGER NOT NULL DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'todo', -- 'todo' | 'pending' | 'approved'
  assigned_date TEXT DEFAULT CURRENT_DATE::text,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel Katalog Hadiah / Rewards
CREATE TABLE IF NOT EXISTS public.rewards (
  id TEXT PRIMARY KEY,
  child_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE DEFAULT 'child_bima_001',
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Camilan Lezat',
  star_cost INTEGER NOT NULL DEFAULT 10,
  image_url TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabel Riwayat Tabungan Bintang / Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  child_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE DEFAULT 'child_bima_001',
  type TEXT NOT NULL, -- 'earned' | 'spent'
  stars INTEGER NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  emoji TEXT DEFAULT '⭐',
  bg_icon TEXT,
  note TEXT,
  date_group TEXT DEFAULT 'Hari Ini',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================================
-- Enable Row Level Security (RLS) & Policies
-- ========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy Publik Anon (Read & Write untuk LittleHeroes Client)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access to profiles') THEN
    CREATE POLICY "Allow public access to profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access to quests') THEN
    CREATE POLICY "Allow public access to quests" ON public.quests FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access to rewards') THEN
    CREATE POLICY "Allow public access to rewards" ON public.rewards FOR ALL USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public access to transactions') THEN
    CREATE POLICY "Allow public access to transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ========================================================
-- Aktifkan Supabase Realtime (Supaya perubahan di HP Orang Tua
-- langsung ter-update otomatis di HP Anak seketika!)
-- ========================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles, public.quests, public.rewards, public.transactions;

-- ========================================================
-- Seed Initial Data (Data Awal Bima)
-- ========================================================
INSERT INTO public.profiles (id, name, age, avatar_url, current_stars, total_collected, total_redeemed, parent_pin)
VALUES (
  'child_bima_001',
  'Bima',
  '5 Tahun',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
  18,
  48,
  30,
  '1234'
)
ON CONFLICT (id) DO UPDATE SET
  current_stars = EXCLUDED.current_stars,
  total_collected = EXCLUDED.total_collected,
  total_redeemed = EXCLUDED.total_redeemed;

-- Seed Quests
INSERT INTO public.quests (id, child_id, title, subtitle, category, icon, icon_bg, border_color, icon_color, stars, status)
VALUES
  ('quest_01', 'child_bima_001', 'Sikat Gigi Bersih-bersih 🪥', 'Pagi hari setelah sarapan enak', 'Kebersihan', 'dentistry', 'bg-secondary-fixed', 'border-tactile-shadow-sky', 'text-secondary', 2, 'todo'),
  ('quest_02', 'child_bima_001', 'Rapikan Mainan ke Kotak 🧸', 'Simpan balok dan robot ke keranjang', 'Kemandirian', 'smart_toy', 'bg-primary-fixed', 'border-tactile-shadow-amber', 'text-primary-container', 3, 'todo'),
  ('quest_03', 'child_bima_001', 'Makan Sayur Brokoli 🥦', 'Habiskan sayuran hijau di piring', 'Kesehatan', 'nutrition', 'bg-tertiary-container/30', 'border-tactile-shadow-emerald', 'text-tertiary', 2, 'pending'),
  ('quest_04', 'child_bima_001', 'Tidur Siang Nyenyak 🌙', 'Istirahat setelah bermain', 'Kesehatan', 'bedtime', 'bg-tertiary-fixed', 'border-tactile-shadow-emerald', 'text-on-tertiary-container', 1, 'approved')
ON CONFLICT (id) DO NOTHING;

-- Seed Rewards
INSERT INTO public.rewards (id, child_id, name, category, star_cost, image_url, description)
VALUES
  ('reward_01', 'child_bima_001', 'Es Krim Rasa Stroberi 🍦', 'Camilan Lezat', 10, 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=80', 'Es krim segar rasa stroberi dengan taburan meses warna-warni!'),
  ('reward_02', 'child_bima_001', 'Main Sepeda di Taman Sore 🚲', 'Aktivitas Seru', 15, 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80', 'Keliling taman sore hari dengan sepeda roda dua favoritmu.'),
  ('reward_03', 'child_bima_001', 'Beli Mainan Balok Lego Baru 🧱', 'Waktu Bermain', 25, 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=80', 'Satu set balok susun kreatif untuk membangun pesawat antariksa.'),
  ('reward_04', 'child_bima_001', 'Nonton Bioskop Bareng Ayah & Ibu 🎬', 'Aktivitas Seru', 30, 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80', 'Nonton film kartun petualangan seru dengan sekotak popcorn manis.')
ON CONFLICT (id) DO NOTHING;

-- Seed Transactions
INSERT INTO public.transactions (id, child_id, type, stars, title, category, emoji, bg_icon, note, date_group)
VALUES
  ('tx_01', 'child_bima_001', 'earned', 2, 'Sikat Gigi Pagi Hari', 'Misi Mandiri', '🪥', 'bg-secondary-container/20 border-secondary-container', 'Disetujui Ibu jam 07:15', 'Hari Ini'),
  ('tx_02', 'child_bima_001', 'spent', 10, 'Tukar Es Krim Stroberi', 'Penukaran Hadiah', '🍦', 'bg-soft-coral/15 border-soft-coral/40', 'Klaim diserahkan Ayah jam 16:30', 'Hari Ini'),
  ('tx_03', 'child_bima_001', 'earned', 3, 'Bereskan Mainan ke Kotak', 'Misi Mandiri', '🧸', 'bg-surface-container border-secondary-container/40', 'Kamar jadi rapi & bersih', 'Kemarin'),
  ('tx_04', 'child_bima_001', 'earned', 2, 'Makan Sayur Brokoli', 'Misi Makan Sehat', '🥦', 'bg-tertiary-fixed/30 border-tertiary-fixed', 'Piring habis bersih!', 'Kemarin'),
  ('tx_05', 'child_bima_001', 'spent', 15, 'Main Sepeda di Taman Sore', 'Penukaran Hadiah', '🚲', 'bg-soft-coral/15 border-soft-coral/40', 'Selesai jalan-jalan sore', 'Kemarin')
ON CONFLICT (id) DO NOTHING;

