import React from 'react';

/**
 * Objek 2.1 — RewardBanner
 * Banner sorotan celengan bintang di Toko Hadiah yang menampilkan visual toples bintang dan status kesiapan tukar hadiah.
 */
export default function RewardBanner({ 
  childName = 'Bima', 
  stars = 18 
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-cloud via-surface-container-lowest to-surface-container-low rounded-2xl p-4 border-2 border-sunny-gold shadow-sm">
      {/* Dekorasi bintang latar belakang */}
      <div className="absolute -top-3 -right-3 text-sunny-gold opacity-30 text-7xl select-none pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-1 right-20 text-soft-coral opacity-25 text-5xl select-none pointer-events-none">
        ⭐
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        {/* Visual Toples Hadiah 3D Mini */}
        <div className="relative flex-shrink-0 animate-float">
          <div className="w-24 h-28 rounded-3xl bg-surface-container-lowest/85 border-4 border-sunny-gold shadow-md backdrop-blur-md flex flex-col items-center justify-between p-2 relative overflow-hidden">
            {/* Tutup Toples */}
            <div className="w-14 h-3 bg-tactile-shadow-amber rounded-full -mt-1 shadow-xs" />
            
            {/* Isi Toples: Bintang Berkilau */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-3xl filter drop-shadow-md">⭐</span>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="text-[10px]">✨</span>
                <span className="text-xs">🌟</span>
                <span className="text-[10px]">✨</span>
              </div>
            </div>

            {/* Level Tag Toples */}
            <div className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-display text-[10px] font-bold border border-tactile-shadow-amber">
              {stars >= 10 ? 'Penuh! 🎉' : 'Mengisi ✨'}
            </div>
          </div>

          {/* Sparkle badge */}
          <div className="absolute -top-2 -left-2 bg-soft-coral text-white p-1 rounded-full shadow border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xs material-symbols-fill">
              auto_awesome
            </span>
          </div>
        </div>

        {/* Info & Motivasi */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-surface-container-high px-2.5 py-0.5 rounded-full mb-1 border border-surface-variant">
            <span className="text-xs">🍯</span>
            <span className="font-display text-xs text-on-surface font-bold">
              Toples Hadiah {childName}
            </span>
          </div>

          <h2 className="font-display text-lg text-on-surface font-extrabold tracking-tight">
            Kamu Punya <span className="text-primary font-black underline decoration-sunny-gold decoration-4">{stars} Bintang</span> Hebat!
          </h2>

          <p className="text-xs text-on-surface-variant mt-1 font-medium leading-relaxed">
            Kumpulkan bintang dari misi harian untuk tukar hadiah impianmu! 🌟 Pilih hadiah favoritmu di bawah ya.
          </p>

          {/* Star Meter Indicator */}
          <div className="mt-2.5 flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-full max-w-xs h-3 bg-surface-variant rounded-full overflow-hidden p-0.5 shadow-inner border border-outline-variant/40">
              <div className="h-full bg-gradient-to-r from-sunny-gold to-soft-coral rounded-full w-full transition-all duration-500" />
            </div>
            <span className="font-display text-xs text-tactile-shadow-amber font-bold whitespace-nowrap">
              Siap Ditukar!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

