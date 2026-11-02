/**
 * Mock Data Terstruktur (Struktur siap dimigrasikan ke tabel Supabase)
 * Tables: profiles, quests, rewards, star_transactions
 */

export const mockProfile = {
  id: 'child_bima_001',
  name: 'Bima',
  age: '5 Tahun',
  avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
  currentStars: 18,
  totalCollected: 48,
  totalRedeemed: 30,
};

export const initialQuests = [
  {
    id: 'quest_01',
    title: 'Sikat Gigi Bersih-bersih 🪥',
    subtitle: 'Pagi hari setelah sarapan enak',
    category: 'Kebersihan',
    icon: 'dentistry',
    iconBg: 'bg-secondary-fixed',
    borderColor: 'border-tactile-shadow-sky',
    iconColor: 'text-secondary',
    stars: 2,
    status: 'todo', // 'todo' | 'pending' | 'approved'
    assignedDate: '2026-11-02',
  },
  {
    id: 'quest_02',
    title: 'Rapikan Mainan ke Kotak 🧸',
    subtitle: 'Simpan balok dan robot ke keranjang',
    category: 'Kemandirian',
    icon: 'smart_toy',
    iconBg: 'bg-primary-fixed',
    borderColor: 'border-tactile-shadow-amber',
    iconColor: 'text-primary-container',
    stars: 3,
    status: 'todo',
    assignedDate: '2026-11-02',
  },
  {
    id: 'quest_03',
    title: 'Makan Sayur Brokoli 🥦',
    subtitle: 'Habiskan sayuran hijau di piring',
    category: 'Kesehatan',
    icon: 'nutrition',
    iconBg: 'bg-tertiary-container/30',
    borderColor: 'border-tactile-shadow-emerald',
    iconColor: 'text-tertiary',
    stars: 2,
    status: 'pending', // Menunggu persetujuan orang tua
    assignedDate: '2026-11-02',
  },
  {
    id: 'quest_04',
    title: 'Tidur Siang Nyenyak 🌙',
    subtitle: 'Istirahat setelah bermain',
    category: 'Kesehatan',
    icon: 'bedtime',
    iconBg: 'bg-tertiary-fixed',
    borderColor: 'border-tactile-shadow-emerald',
    iconColor: 'text-on-tertiary-container',
    stars: 1,
    status: 'approved', // Disetujui, bintang sudah masuk
    assignedDate: '2026-11-02',
  },
];

export const initialRewards = [
  {
    id: 'reward_01',
    name: 'Es Krim Rasa Stroberi 🍦',
    category: 'Camilan Lezat',
    starCost: 10,
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=80',
    description: 'Es krim segar rasa stroberi dengan taburan meses warna-warni!',
  },
  {
    id: 'reward_02',
    name: 'Main Sepeda di Taman Sore 🚲',
    category: 'Aktivitas Seru',
    starCost: 15,
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80',
    description: 'Keliling taman sore hari dengan sepeda roda dua favoritmu.',
  },
  {
    id: 'reward_03',
    name: 'Beli Mainan Balok Lego Baru 🧱',
    category: 'Waktu Bermain',
    starCost: 25,
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=80',
    description: 'Satu set balok susun kreatif untuk membangun pesawat antariksa.',
  },
  {
    id: 'reward_04',
    name: 'Nonton Bioskop Bareng Ayah & Ibu 🎬',
    category: 'Aktivitas Seru',
    starCost: 30,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
    description: 'Nonton film kartun petualangan seru dengan sekotak popcorn manis.',
  },
];

export const initialTransactions = [
  {
    id: 'tx_01',
    type: 'earned', // 'earned' (+) | 'spent' (-)
    stars: 2,
    title: 'Sikat Gigi Pagi Hari',
    category: 'Misi Mandiri',
    emoji: '🪥',
    bgIcon: 'bg-secondary-container/20 border-secondary-container',
    note: 'Disetujui Ibu jam 07:15',
    dateGroup: 'Hari Ini',
    timestamp: '2026-11-02 07:15',
  },
  {
    id: 'tx_02',
    type: 'spent',
    stars: 10,
    title: 'Tukar Es Krim Stroberi',
    category: 'Penukaran Hadiah',
    emoji: '🍦',
    bgIcon: 'bg-soft-coral/15 border-soft-coral/40',
    note: 'Klaim diserahkan Ayah jam 16:30',
    dateGroup: 'Hari Ini',
    timestamp: '2026-11-02 16:30',
  },
  {
    id: 'tx_03',
    type: 'earned',
    stars: 3,
    title: 'Bereskan Mainan ke Kotak',
    category: 'Misi Mandiri',
    emoji: '🧸',
    bgIcon: 'bg-surface-container border-secondary-container/40',
    note: 'Kamar jadi rapi & bersih',
    dateGroup: 'Kemarin',
    timestamp: '2026-11-01 18:20',
  },
  {
    id: 'tx_04',
    type: 'earned',
    stars: 2,
    title: 'Makan Sayur Brokoli',
    category: 'Misi Makan Sehat',
    emoji: '🥦',
    bgIcon: 'bg-tertiary-fixed/30 border-tertiary-fixed',
    note: 'Piring habis bersih!',
    dateGroup: 'Kemarin',
    timestamp: '2026-11-01 12:45',
  },
  {
    id: 'tx_05',
    type: 'spent',
    stars: 15,
    title: 'Main Sepeda di Taman Sore',
    category: 'Penukaran Hadiah',
    emoji: '🚲',
    bgIcon: 'bg-soft-coral/15 border-soft-coral/40',
    note: 'Selesai jalan-jalan sore',
    dateGroup: 'Kemarin',
    timestamp: '2026-11-01 16:00',
  },
];
