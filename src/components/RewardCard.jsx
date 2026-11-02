import React from 'react';

/**
 * Objek 2.1 — RewardCard
 * Kartu item hadiah dengan 2 status utama:
 * 1. Bintang Cukup: Tag hijau "Bintang Cukup! 🎉", progress 100%, tombol tactile aktif "Tukar Hadiah Ini! 🎁"
 * 2. Bintang Kurang: Tag "Kurang X ⭐ lagi!", overlay terkunci, progress bar perolehan, tombol disabled
 */
export default function RewardCard({ 
  reward, 
  currentStars = 18, 
  onRedeemClick 
}) {
  const { id, name, category, starCost, imageUrl, description } = reward;
  const isAffordable = currentStars >= starCost;
  const starsNeeded = Math.max(0, starCost - currentStars);
  const percentage = Math.min(100, Math.round((currentStars / starCost) * 100));

  return (
    <article 
      className={`rounded-2xl border-2 p-4 flex flex-col justify-between shadow-sm relative overflow-hidden transition-all duration-200 ${
        isAffordable
          ? 'bg-surface-container-lowest border-surface-variant hover:border-sunny-gold'
          : 'bg-surface-container-lowest/80 border-surface-variant/80 opacity-95'
      }`}
    >
      {/* Bagian Atas: Tag Status Kelayakan & Harga Bintang */}
      <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
        {isAffordable ? (
          <span className="bg-tertiary-container/30 text-on-tertiary-container text-xs font-bold px-2.5 py-1 rounded-full border border-tertiary-container flex items-center gap-1 font-display">
            <span>Bintang Cukup! 🎉</span>
          </span>
        ) : (
          <span className="bg-soft-coral/15 text-tactile-shadow-coral text-xs font-bold px-2.5 py-1 rounded-full border border-soft-coral/40 flex items-center gap-1 font-display">
            <span>Kurang {starsNeeded} ⭐ lagi!</span>
          </span>
        )}

        <div className="bg-cream-cloud border-2 border-sunny-gold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
          <span className="text-sm">⭐</span>
          <span className="font-display text-base text-primary font-black leading-none">
            {starCost}
          </span>
        </div>
      </div>

      {/* Gambar Hadiah dengan Badge Kategori & Overlay Terkunci */}
      <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-surface-container-low mb-3 border border-surface-variant flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isAffordable ? 'hover:scale-105' : 'filter saturate-75 brightness-90'
          }`}
          loading="lazy"
        />

        {/* Overlay jika bintang belum cukup */}
        {!isAffordable && (
          <div className="absolute inset-0 bg-on-background/25 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-surface-container-lowest/95 px-3 py-1.5 rounded-xl shadow-md border border-white flex items-center gap-1.5 text-on-surface font-display text-xs font-bold">
              <span className="material-symbols-outlined text-tactile-shadow-amber text-base material-symbols-fill">
                lock
              </span>
              <span>{percentage >= 70 ? 'Hampir Terbuka!' : 'Masih Terkunci'}</span>
            </div>
          </div>
        )}

        {/* Badge Kategori */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold text-on-surface shadow-xs font-display">
          {category}
        </div>
      </div>

      {/* Judul & Progress Bar Hadiah */}
      <div className="space-y-2 mb-3">
        <h4 className="font-display text-base text-on-surface font-bold leading-snug">
          {name}
        </h4>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-display">
            <span className={isAffordable ? 'font-bold text-tertiary' : 'font-semibold text-on-surface-variant'}>
              {isAffordable ? `Bintangmu: ${currentStars} / ${starCost} ⭐` : `${currentStars} / ${starCost} Bintang`}
            </span>
            <span className={`font-bold ${isAffordable ? 'text-tertiary' : 'text-tactile-shadow-coral'}`}>
              {percentage}% {isAffordable ? 'Tercapai!' : ''}
            </span>
          </div>

          <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden p-0.5 border border-surface-variant">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isAffordable ? 'bg-tertiary-container' : 'bg-soft-coral'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      {isAffordable ? (
        <button
          onClick={() => onRedeemClick(reward)}
          type="button"
          className="tactile-btn w-full min-h-[50px] bg-sunny-gold hover:bg-primary-container text-on-surface rounded-2xl font-display text-base font-bold flex items-center justify-center gap-2 border-b-4 border-tactile-shadow-amber shadow-md active:translate-y-1 active:border-b-0 cursor-pointer"
        >
          <span>Tukar Hadiah Ini! 🎁</span>
        </button>
      ) : (
        <button
          disabled
          type="button"
          className="w-full min-h-[50px] bg-surface-container text-outline rounded-2xl font-display text-sm font-bold flex items-center justify-center gap-2 border-2 border-outline-variant cursor-not-allowed opacity-80"
        >
          <span className="material-symbols-outlined text-base material-symbols-fill">
            lock
          </span>
          <span>Bintang Belum Cukup</span>
        </button>
      )}
    </article>
  );
}

