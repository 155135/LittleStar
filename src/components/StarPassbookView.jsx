import React, { useState } from 'react';

/**
 * Objek 3.1 — StarPassbookView (Layar Buku Bintang & Riwayat Transaksi)
 * Menampilkan toples celengan 3D besar, statistik total bintang dikumpulkan vs ditukar,
 * filter kategori transaksi, dan riwayat kronologis bintang masuk/keluar.
 */
export default function StarPassbookView({
  childName = 'Bima',
  currentStars = 18,
  totalCollected = 48,
  totalRedeemed = 30,
  transactions = [],
  onBack,
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'earned' | 'spent'

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'earned') return tx.type === 'earned';
    if (filterType === 'spent') return tx.type === 'spent';
    return true;
  });

  // Kelompokkan transaksi berdasarkan dateGroup
  const groups = ['Hari Ini', 'Kemarin'];

  return (
    <div className="flex flex-col min-h-screen bg-canvas-cream pb-24">
      {/* Top Header Buku Bintang */}
      <header className="bg-surface text-on-surface shadow-sm rounded-b-2xl px-4 pt-3 pb-3 sticky top-0 z-40 border-b border-surface-container-high/60">
        <div className="flex items-center justify-between gap-2">
          {/* Tombol Kembali Chunky Tactile */}
          <button
            onClick={onBack}
            type="button"
            aria-label="Kembali ke Beranda"
            className="tactile-btn flex items-center justify-center w-11 h-11 rounded-2xl bg-surface-container-lowest text-secondary border-2 border-surface-variant border-b-4 border-b-secondary shadow-sm active:translate-y-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl font-bold">arrow_back</span>
          </button>

          {/* Judul Halaman */}
          <div className="flex-1 text-center px-1">
            <h1 className="font-display text-base font-bold text-on-surface flex items-center justify-center gap-1">
              Buku Bintang {childName} <span className="text-sunny-gold">⭐</span>
            </h1>
            <p className="text-[11px] text-on-surface-variant font-medium truncate">
              Catatan Petualangan &amp; Tabungan Bintang
            </p>
          </div>

          {/* Badge Saldo Bintang Aktif */}
          <div className="flex items-center gap-1 bg-cream-cloud border-2 border-sunny-gold border-b-4 border-b-tactile-shadow-amber rounded-2xl px-2.5 py-1 shadow-xs">
            <span className="material-symbols-outlined text-sunny-gold text-base material-symbols-fill">
              star
            </span>
            <div className="flex flex-col text-left">
              <span className="font-display text-xs text-primary font-bold leading-none">
                {currentStars}
              </span>
              <span className="text-[9px] font-bold text-outline leading-tight">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="max-w-4xl mx-auto w-full px-4 pt-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 landscape:grid-cols-12 gap-5 items-start">
          {/* Kolom Kiri: Toples Celengan Bintang 3D (Sticky di Landscape / Desktop) */}
          <div className="md:col-span-5 landscape:col-span-5 md:sticky md:top-20 landscape:sticky landscape:top-20">
            {/* HERO SECTION: Toples Celengan Bintang 3D */}
            <section className="bg-surface-container-lowest rounded-3xl p-4 border-2 border-surface-container shadow-md relative overflow-hidden text-center">
              {/* Ambient Glow Bubbles */}
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-sunny-gold/15 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-tertiary-fixed-dim/20 rounded-full blur-lg pointer-events-none" />

              <div className="flex flex-col items-center relative z-10">
                {/* Toples Bintang 3D-Style Illustrated Container */}
                <div className="relative w-36 h-36 bg-gradient-to-b from-surface-container-high/40 to-surface-container/70 rounded-3xl border-4 border-surface-container-high p-2 flex flex-col items-center justify-end shadow-inner mb-3">
                  {/* Tutup Toples Biru */}
                  <div className="absolute -top-3 w-24 h-5 bg-tactile-shadow-sky rounded-full border-2 border-surface-container-lowest shadow-sm flex items-center justify-center">
                    <div className="w-10 h-1 bg-surface-container-lowest/50 rounded-full" />
                  </div>

                  {/* Bintang-bintang Berkilau di dalam Toples */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span 
                      className="material-symbols-outlined text-sunny-gold text-4xl absolute top-7 left-5 drop-shadow-md animate-bounce material-symbols-fill"
                      style={{ animationDuration: '2.4s' }}
                    >
                      star
                    </span>
                    <span 
                      className="material-symbols-outlined text-primary-container text-4xl absolute top-9 right-4 drop-shadow-md animate-bounce material-symbols-fill"
                      style={{ animationDuration: '3s' }}
                    >
                      star
                    </span>
                    <span className="material-symbols-outlined text-sunny-gold text-2xl absolute bottom-6 drop-shadow-sm material-symbols-fill">
                      auto_awesome
                    </span>
                  </div>

                  {/* Star Count Pill di Badan Toples */}
                  <div className="relative z-10 bg-surface-container-lowest/95 backdrop-blur-sm px-4 py-1 rounded-2xl border-2 border-sunny-gold shadow-sm flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-sunny-gold text-lg material-symbols-fill">
                      star
                    </span>
                    <span className="font-display text-lg font-bold text-on-surface">
                      {currentStars}
                    </span>
                  </div>
                </div>

                {/* Label Toples */}
                <div className="mb-3">
                  <span className="inline-block bg-cream-cloud text-on-primary-container font-display text-xs font-bold px-3 py-1 rounded-full border border-sunny-gold/60">
                    Toples Celengan Bintang {childName} 🏺✨
                  </span>
                  <h2 className="font-display text-base font-bold text-on-surface mt-1">
                    Tabungan Petualang Hebat
                  </h2>
                </div>

                {/* 2 Mini Summary Cards (Total Dikumpulkan & Ditukar Hadiah) */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {/* Card 1: Dikumpulkan */}
                  <div className="bg-surface-container-low rounded-2xl p-3 border-2 border-tertiary-fixed-dim/50 border-b-4 border-b-tactile-shadow-emerald flex flex-col items-center text-center">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-1 shadow-xs">
                      <span className="material-symbols-outlined text-xl material-symbols-fill">
                        rocket_launch
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant font-display">
                      Total Dikumpulkan
                    </span>
                    <span className="font-display text-sm font-bold text-tertiary mt-0.5">
                      +{totalCollected} Bintang
                    </span>
                  </div>

                  {/* Card 2: Ditukar Hadiah */}
                  <div className="bg-surface-container-low rounded-2xl p-3 border-2 border-soft-coral/50 border-b-4 border-b-tactile-shadow-coral flex flex-col items-center text-center">
                    <div className="w-9 h-9 rounded-xl bg-soft-coral/20 flex items-center justify-center text-tactile-shadow-coral mb-1 shadow-xs">
                      <span className="material-symbols-outlined text-xl material-symbols-fill">
                        featured_seasonal_and_gifts
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface-variant font-display">
                      Ditukar Hadiah
                    </span>
                    <span className="font-display text-sm font-bold text-tactile-shadow-coral mt-0.5">
                      -{totalRedeemed} Bintang
                    </span>
                  </div>
                </div>

                {/* Banner Motivasi */}
                <div className="mt-3.5 w-full bg-cream-cloud/90 border-2 border-sunny-gold/80 rounded-2xl p-2.5 flex items-center gap-2 text-left">
                  <span className="material-symbols-outlined text-sunny-gold text-2xl shrink-0 material-symbols-fill">
                    military_tech
                  </span>
                  <p className="text-xs text-on-primary-container font-sans leading-snug">
                    <strong className="font-display text-primary font-bold">Hebat {childName}!</strong> Kamu sudah menyelesaikan <span className="underline decoration-sunny-gold decoration-2 font-bold">14 misi petualangan</span> bulan ini! 🌟
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Kolom Kanan: Filter Tabs & Riwayat Transaksi */}
          <div className="md:col-span-7 landscape:col-span-7 flex flex-col gap-4">
            {/* FILTER TABS (Tactile Pill Switches) */}
            <section className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            type="button"
            className={`tactile-btn shrink-0 flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-primary-container text-on-primary-container border-2 border-tactile-shadow-amber border-b-4 border-b-tactile-shadow-amber shadow-xs'
                : 'bg-surface-container-lowest text-on-surface-variant border-2 border-surface-variant active:translate-y-1'
            }`}
          >
            <span className="material-symbols-outlined text-base material-symbols-fill">
              auto_stories
            </span>
            <span>Semua Cerita ✨</span>
          </button>

          <button
            onClick={() => setFilterType('earned')}
            type="button"
            className={`tactile-btn shrink-0 flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-xs font-bold transition-all ${
              filterType === 'earned'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed border-2 border-tactile-shadow-emerald border-b-4 border-b-tactile-shadow-emerald shadow-xs'
                : 'bg-surface-container-lowest text-tertiary border-2 border-tertiary-fixed-dim/50 active:translate-y-1'
            }`}
          >
            <span className="material-symbols-outlined text-base material-symbols-fill">
              star
            </span>
            <span>Bintang Masuk (+)</span>
          </button>

          <button
            onClick={() => setFilterType('spent')}
            type="button"
            className={`tactile-btn shrink-0 flex items-center gap-1.5 rounded-2xl px-3.5 py-2 font-display text-xs font-bold transition-all ${
              filterType === 'spent'
                ? 'bg-soft-coral/20 text-tactile-shadow-coral border-2 border-tactile-shadow-coral border-b-4 border-b-tactile-shadow-coral shadow-xs'
                : 'bg-surface-container-lowest text-tactile-shadow-coral border-2 border-soft-coral/40 active:translate-y-1'
            }`}
          >
            <span className="material-symbols-outlined text-base material-symbols-fill">
              redeem
            </span>
            <span>Hadiah Ditukar (-)</span>
          </button>
        </section>

        {/* TIMELINE RIWAYAT TRANSAKSI */}
        <div className="flex flex-col gap-4">
          {groups.map((group) => {
            const items = filteredTransactions.filter((tx) => tx.dateGroup === group);
            if (items.length === 0) return null;

            return (
              <section key={group} className="flex flex-col gap-2.5">
                {/* Header Group */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sunny-gold inline-block" />
                    <h3 className="font-display text-sm font-bold text-on-surface">
                      {group}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container-high/60 px-2 py-0.5 rounded-full font-display">
                    {items.length} Catatan
                  </span>
                </div>

                {/* List Item Transaksi */}
                <div className="flex flex-col gap-2.5">
                  {items.map((tx) => (
                    <article
                      key={tx.id}
                      className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-surface-container shadow-xs flex items-center justify-between gap-2.5 hover:border-sunny-gold transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Emoji Avatar Blok */}
                        <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 ${tx.bgIcon}`}>
                          <span className="text-2xl" role="img" aria-label={tx.title}>
                            {tx.emoji}
                          </span>
                        </div>

                        {/* Title & Notes */}
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-display text-xs font-bold text-on-surface truncate">
                              {tx.title}
                            </h4>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-display ${
                              tx.type === 'earned'
                                ? 'bg-surface-container text-secondary'
                                : 'bg-soft-coral/15 text-tactile-shadow-coral'
                            }`}>
                              {tx.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 font-sans font-medium truncate">
                            {tx.note}
                          </p>
                        </div>
                      </div>

                      {/* Pill Status Bintang */}
                      <div className={`shrink-0 px-2.5 py-1 rounded-2xl text-center border-2 border-b-4 font-display text-xs font-bold shadow-xs ${
                        tx.type === 'earned'
                          ? 'bg-tertiary-fixed text-on-tertiary-container border-tertiary border-b-tactile-shadow-emerald'
                          : 'bg-soft-coral/20 text-tactile-shadow-coral border-soft-coral border-b-tactile-shadow-coral'
                      }`}>
                        <span>
                          {tx.type === 'earned' ? `+${tx.stars} ⭐` : `-${tx.stars} ⭐`}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

