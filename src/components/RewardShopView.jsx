import React, { useState } from 'react';
import RewardBanner from './RewardBanner';
import RewardCard from './RewardCard';

/**
 * Objek 2.1 — RewardShopView (Layar Toko Hadiah Anak)
 */
export default function RewardShopView({ 
  childName = 'Bima', 
  stars = 18, 
  rewards = [], 
  onRedeemClick 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    { id: 'Semua', label: 'Semua Hadiah 🎈' },
    { id: 'Aktivitas Seru', label: 'Aktivitas Seru 🚲' },
    { id: 'Camilan Lezat', label: 'Camilan Lezat 🍦' },
    { id: 'Waktu Bermain', label: 'Waktu Bermain 🧱' },
  ];

  const filteredRewards = selectedCategory === 'Semua' 
    ? rewards 
    : rewards.filter((r) => r.category === selectedCategory);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Banner Saldo Bintang & Toples */}
      <RewardBanner childName={childName} stars={stars} />

      {/* 2. Filter Kategori Chips */}
      <nav aria-label="Kategori Hadiah" className="overflow-x-auto pb-1 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            type="button"
            className={`whitespace-nowrap px-3.5 py-2 rounded-2xl font-display text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary-container text-on-primary-container shadow-sm border-b-4 border-tactile-shadow-amber'
                : 'bg-surface-container-lowest text-on-surface-variant border-2 border-surface-variant hover:bg-surface-container active:translate-y-1'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* 3. Header Katalog Hadiah */}
      <div className="flex items-center justify-between px-1">
        <h3 className="font-display text-base text-on-surface font-extrabold flex items-center gap-2">
          <span>Katalog Hadiah Seru</span>
          <span className="text-[11px] bg-sunny-gold text-on-surface font-bold px-2 py-0.5 rounded-full">
            {filteredRewards.length} Pilihan
          </span>
        </h3>
        <span className="text-xs font-medium text-on-surface-variant">
          Sentuh untuk menukar
        </span>
      </div>

      {/* 4. Grid Kartu Hadiah */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 landscape:grid-cols-2 gap-4">
        {filteredRewards.map((reward) => (
          <RewardCard 
            key={reward.id} 
            reward={reward} 
            currentStars={stars} 
            onRedeemClick={onRedeemClick} 
          />
        ))}
      </div>

      {/* 5. Catatan Verifikasi Orang Tua */}
      <aside className="bg-cream-cloud border-2 border-sunny-gold rounded-2xl p-3.5 flex items-center gap-3 shadow-xs mt-2">
        <div className="w-11 h-11 rounded-xl bg-sunny-gold text-on-surface flex items-center justify-center flex-shrink-0 shadow-xs border border-tactile-shadow-amber">
          <span className="material-symbols-outlined text-2xl material-symbols-fill">
            family_restroom
          </span>
        </div>
        <div>
          <p className="font-display text-xs text-on-surface font-bold">
            Catatan Kecil untuk {childName}:
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5 font-medium leading-relaxed">
            Setelah ditukar, minta Ayah atau Ibu untuk verifikasi hadiah ya! 👨‍👩‍👦
          </p>
        </div>
      </aside>
    </div>
  );
}

