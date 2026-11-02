import React from 'react';

/**
 * Objek 1.3 — QuestCard
 * Menampilkan kartu tugas interaktif anak dengan 3 state:
 * - 'todo': Belum dikerjakan, tombol tactile 3D besar "Aku Sudah Selesai! ✨"
 * - 'pending': Sudah dikerjakan anak, menunggu approval orang tua ("⏳ Menunggu Ayah/Ibu Cek")
 * - 'approved': Sudah disetujui orang tua, bintang sudah bertambah ("✓ Selesai & Dapat Bintang! 🎉")
 */
export default function QuestCard({ quest, onMarkDone }) {
  const { id, title, subtitle, icon, iconBg, iconColor, borderColor, stars, status } = quest;

  return (
    <article 
      className={`border-2 rounded-2xl p-4 shadow-sm flex flex-col gap-3 relative transition-all duration-200 ${
        status === 'approved'
          ? 'bg-surface-container-low border-tertiary-fixed'
          : status === 'pending'
          ? 'bg-surface-container-lowest/90 border-surface-variant'
          : 'bg-surface-container-lowest border-surface-variant'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Ikon Blok Besar 3D Tactile */}
          <div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-b-4 ${
              iconBg || 'bg-secondary-fixed'
            } ${borderColor || 'border-tactile-shadow-sky'} ${iconColor || 'text-secondary'}`}
          >
            <span 
              className="material-symbols-outlined text-3xl material-symbols-fill"
            >
              {icon || 'star'}
            </span>
          </div>

          {/* Info Judul & Keterangan */}
          <div>
            <h4 
              className={`font-display text-base font-bold leading-snug ${
                status === 'approved' 
                  ? 'line-through text-outline' 
                  : 'text-on-surface'
              }`}
            >
              {title}
            </h4>
            
            {status === 'approved' ? (
              <p className="text-xs text-tertiary font-bold mt-0.5 flex items-center gap-1 font-sans">
                <span className="material-symbols-outlined text-sm material-symbols-fill">
                  check_circle
                </span>
                Selesai &amp; Dapat Bintang! 🎉
              </p>
            ) : (
              <p className="text-xs text-on-surface-variant mt-0.5 font-sans font-medium">
                {subtitle || 'Tugas harian'}
              </p>
            )}
          </div>
        </div>

        {/* Badge Reward Bintang */}
        <div 
          className={`px-2.5 py-1 rounded-full flex items-center gap-1 flex-shrink-0 border ${
            status === 'approved'
              ? 'bg-tertiary-fixed border-tactile-shadow-emerald text-on-tertiary-fixed'
              : status === 'pending'
              ? 'bg-surface-container border-outline-variant text-on-surface-variant'
              : 'bg-cream-cloud border-sunny-gold text-primary'
          }`}
        >
          <span className="text-xs font-bold font-display">+{stars}</span>
          <span 
            className={`material-symbols-outlined text-sm ${
              status === 'pending' 
                ? 'text-outline-variant' 
                : 'text-primary-container material-symbols-fill'
            }`}
          >
            star
          </span>
        </div>
      </div>

      {/* Action CTA Sesuai State */}
      {status === 'todo' && (
        <button
          onClick={() => onMarkDone(id)}
          type="button"
          className="tactile-btn w-full min-h-[52px] bg-primary-container text-on-primary-container font-display text-base font-bold rounded-2xl flex items-center justify-center gap-2 border-b-4 border-tactile-shadow-amber shadow-md hover:bg-sunny-gold active:translate-y-1 active:border-b-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl material-symbols-fill">
            auto_awesome
          </span>
          <span>Aku Sudah Selesai! ✨</span>
        </button>
      )}

      {status === 'pending' && (
        <div className="w-full min-h-[48px] bg-cream-cloud border-2 border-dashed border-sunny-gold text-on-primary-fixed-variant font-display text-sm font-bold rounded-2xl flex items-center justify-center gap-2 select-none">
          <span 
            className="material-symbols-outlined animate-spin text-primary-container text-lg"
            style={{ animationDuration: '3s' }}
          >
            hourglass_top
          </span>
          <span>⏳ Menunggu Ayah/Ibu Cek</span>
        </div>
      )}
    </article>
  );
}

