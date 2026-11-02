import React from 'react';

/**
 * Objek 1.1 — Header & Avatar Anak
 * Komponen topbar yang menampilkan avatar anak, nama & usia, indikator bintang mini, serta tombol kunci Mode Orang Tua.
 */
export default function Header({ 
  childName = 'Bima', 
  childAge = '5 Tahun', 
  stars = 18, 
  avatarUrl = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
  onParentModeClick,
  onStarClick
}) {
  return (
    <header className="bg-surface rounded-b-2xl shadow-sm flex justify-between items-center w-full px-4 py-3 z-30 sticky top-0 border-b border-surface-container-high/60">
      {/* Profil Anak */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container p-0.5 bg-cream-cloud shadow-sm flex-shrink-0">
          <img 
            className="w-full h-full object-cover rounded-full" 
            src={avatarUrl}
            alt={childName}
          />
          <span 
            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-tertiary-container border-2 border-surface-container-lowest rounded-full"
            title="Aktif"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-on-surface text-lg leading-tight tracking-tight">
            {childName}
          </span>
          <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1 font-display">
            <span>{childAge}</span>
            <span className="text-sunny-gold">🚀</span>
          </span>
        </div>
      </div>

      {/* Counter Toples Bintang & Tombol Mode Orang Tua */}
      <div className="flex items-center gap-2">
        {/* Indikator Mini Bintang (Dapat diklik untuk menuju Buku Bintang / Detail) */}
        <button 
          onClick={onStarClick}
          type="button"
          aria-label="Saldo Bintang"
          className="flex items-center bg-cream-cloud border-2 border-sunny-gold rounded-full px-3 py-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <span 
            className="material-symbols-outlined material-symbols-fill text-primary-container animate-float mr-1 text-xl"
          >
            star
          </span>
          <span className="font-display text-lg text-primary font-bold leading-none">
            {stars}
          </span>
          <span className="text-xs font-black text-primary ml-1">★</span>
        </button>

        {/* Tombol Kunci Mode Orang Tua */}
        <button 
          onClick={onParentModeClick}
          type="button"
          aria-label="Mode Orang Tua" 
          title="Buka Mode Orang Tua"
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-surface-container hover:bg-surface-variant active:translate-y-1 transition-all border-b-2 border-outline-variant shadow-sm text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-outline text-xl">
            lock
          </span>
        </button>
      </div>
    </header>
  );
}

