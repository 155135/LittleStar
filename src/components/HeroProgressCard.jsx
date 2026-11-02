import React from 'react';

/**
 * Objek 1.2 — Toples Bintang & Progress Banner (Hero Bento Card)
 * Menampilkan progress bar petualangan harian anak, jumlah misi yang selesai, dan pesan motivasi gamifikasi.
 */
export default function HeroProgressCard({
  completedCount = 2,
  totalCount = 4,
}) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remaining = Math.max(0, totalCount - completedCount);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border-2 border-surface-variant p-4 shadow-sm transition-all">
      {/* Dekorasi Watermark Roket di Latar Belakang */}
      <div className="absolute -right-4 -bottom-6 opacity-20 pointer-events-none text-sunny-gold select-none">
        <span 
          className="material-symbols-outlined text-8xl material-symbols-fill"
          style={{ fontSize: '96px' }}
        >
          rocket_launch
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        {/* Tag Status & Counter Misi */}
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-secondary font-display">
            <span className="material-symbols-outlined text-sm material-symbols-fill">flag</span>
            Petualangan Hari Ini
          </span>
          <span className="text-xs font-bold text-primary bg-cream-cloud px-2.5 py-0.5 rounded-full border border-sunny-gold font-display shadow-xs">
            {completedCount} / {totalCount} Misi Selesai
          </span>
        </div>

        {/* Headline Motivasi */}
        <h2 className="font-display text-xl text-on-surface font-bold tracking-tight mt-1 leading-snug">
          {percentage === 100
            ? "Luar biasa! Semua misi hari ini selesai! 🌟"
            : percentage >= 50
            ? "Sedikit lagi toplesmu penuh! 🚀"
            : "Ayo mulai petualangan hebatmu hari ini! ✨"}
        </h2>

        {/* Visual Progress Track & Bar */}
        <div className="w-full bg-surface-container-high rounded-full h-4 mt-1 p-0.5 border border-outline-variant/30 flex items-center">
          <div 
            className="bg-primary-container h-full rounded-full transition-all duration-700 shadow-inner flex items-center justify-end pr-1"
            style={{ width: `${Math.max(percentage, 6)}%` }}
          >
            <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-pulse" />
          </div>
        </div>

        {/* Teks Penjelajah Bintang */}
        <p className="text-xs text-on-surface-variant mt-0.5 font-medium leading-relaxed">
          {remaining > 0 ? (
            <>
              Selesaikan <span className="font-bold text-on-surface">{remaining} misi lagi</span> hari ini untuk membuka lencana penjelajah bintang!
            </>
          ) : (
            "Toples bintangmu penuh berkilau hari ini. Kerja luar biasa, Kapten Cilik!"
          )}
        </p>
      </div>
    </section>
  );
}

