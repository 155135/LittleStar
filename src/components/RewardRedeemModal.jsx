import React, { useState } from 'react';

/**
 * Objek 2.2 — RewardRedeemModal (Modal Konfirmasi Tukar Hadiah Anak)
 * Pop-up konfirmasi yang ramah anak dengan visual math (Punya Bima - Biaya Hadiah = Sisa Bintang)
 * dan tombol chunky tactile.
 */
export default function RewardRedeemModal({
  reward,
  childName = 'Bima',
  currentStars = 18,
  isOpen = false,
  onClose,
  onConfirmRedeem,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !reward) return null;

  const starCost = reward.starCost;
  const remainingStars = Math.max(0, currentStars - starCost);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmRedeem(reward);
    }, 700);
  };

  return (
    <div 
      id="rewardModalOverlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-5 bg-inverse-surface/65 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Container Modal Kartu Tactile */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalHeading"
        className="w-full max-w-sm sm:max-w-md bg-surface-container-lowest rounded-3xl border-4 border-cream-cloud shadow-2xl relative overflow-hidden flex flex-col transition-transform transform duration-200"
        style={{
          boxShadow: '0 20px 45px -10px rgba(133, 83, 0, 0.35), 0 0 0 1px rgba(251, 191, 36, 0.4)'
        }}
      >
        {/* Hiasan Atas Gradien Pelangi */}
        <div className="h-3 w-full bg-gradient-to-r from-sunny-gold via-soft-coral to-sky-tint" />

        {/* Tombol Tutup / Nanti Dulu (Pojok Kanan Atas) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup dan pikir-pikir dulu"
          title="Tutup"
          className="tactile-btn absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-surface-container-high border-2 border-slate-200 text-on-surface flex items-center justify-center cursor-pointer hover:bg-surface-variant active:translate-y-1"
        >
          <span className="material-symbols-outlined text-lg font-bold">close</span>
        </button>

        {/* Isi Modal Body */}
        <div className="px-4 pt-3 pb-5 sm:px-6 flex flex-col items-center text-center">
          {/* 1. Hero Avatar Hadiah dengan Animasi Mengambang */}
          <div className="relative mt-1 mb-2 flex items-center justify-center animate-float">
            {/* Halo Glow */}
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-sunny-gold/30 via-soft-coral/20 to-sky-tint/30 blur-xl" />

            {/* Sparkle Stars */}
            <div className="absolute -top-2 -left-2 text-sunny-gold">
              <span className="material-symbols-outlined text-2xl material-symbols-fill">
                auto_awesome
              </span>
            </div>
            <div className="absolute -top-1 -right-2 text-sunny-gold">
              <span className="material-symbols-outlined text-xl material-symbols-fill">
                star
              </span>
            </div>

            {/* Bingkai Hadiah */}
            <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-b from-rose-50 to-amber-50 border-4 border-sunny-gold shadow-md flex items-center justify-center p-2 overflow-hidden">
              <img 
                src={reward.imageUrl} 
                alt={reward.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-1 bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-display text-[11px] font-bold shadow-xs border border-emerald-200 flex items-center gap-1">
                <span>Siap Ditukar!</span>
                <span>🎉</span>
              </div>
            </div>
          </div>

          {/* 2. Judul & Keterangan Ramah Anak */}
          <h2 id="modalHeading" className="font-display text-lg text-on-surface font-extrabold tracking-tight mt-1">
            Tukar {reward.name}?
          </h2>
          <p className="text-xs text-on-surface-variant mt-1 max-w-xs leading-relaxed font-medium">
            Yaaay! <span className="font-bold text-primary font-display">{starCost} Bintang Emasmu</span> akan ditukar dengan <span className="font-bold text-soft-coral font-display">{reward.name}</span>!
          </p>

          {/* 3. Hitungan Toples Bintang (Kid-Friendly Visual Math: 18 - 10 = 8) */}
          <div className="w-full mt-3 bg-canvas-cream border-2 border-outline-variant/40 rounded-2xl p-3 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-sunny-gold text-base material-symbols-fill">
                savings
              </span>
              <span className="font-display text-xs font-bold text-primary">
                Hitungan Toples Bintangmu
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              {/* Punya Anak */}
              <div className="bg-surface-container-lowest rounded-2xl p-2 border-2 border-sunny-gold shadow-xs flex flex-col items-center">
                <span className="text-[11px] font-bold text-on-surface-variant leading-tight font-display">
                  Punya {childName}
                </span>
                <div className="flex items-center gap-0.5 font-display text-base font-bold text-primary mt-0.5">
                  <span>{currentStars}</span>
                  <span className="material-symbols-outlined text-sunny-gold text-sm material-symbols-fill">
                    star
                  </span>
                </div>
              </div>

              {/* Biaya Hadiah */}
              <div className="bg-rose-50 rounded-2xl p-2 border-2 border-soft-coral/50 shadow-xs flex flex-col items-center">
                <span className="text-[11px] font-bold text-soft-coral leading-tight font-display">
                  Biaya Hadiah
                </span>
                <div className="flex items-center gap-0.5 font-display text-base font-bold text-tactile-shadow-coral mt-0.5">
                  <span>-{starCost}</span>
                  <span className="material-symbols-outlined text-soft-coral text-sm material-symbols-fill">
                    star
                  </span>
                </div>
              </div>

              {/* Sisa Nanti */}
              <div className="bg-cream-cloud rounded-2xl p-2 border-2 border-tertiary-container shadow-xs flex flex-col items-center">
                <span className="text-[11px] font-bold text-tertiary leading-tight font-display">
                  Sisa Nanti
                </span>
                <div className="flex items-center gap-0.5 font-display text-base font-bold text-tertiary mt-0.5">
                  <span>= {remainingStars}</span>
                  <span className="material-symbols-outlined text-sunny-gold text-sm material-symbols-fill">
                    star
                  </span>
                </div>
              </div>
            </div>

            {/* Pesan Ketenangan Anak */}
            <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-center gap-1.5 text-xs font-display text-tertiary font-bold">
              <span className="material-symbols-outlined text-sm material-symbols-fill">
                check_circle
              </span>
              <span>Hore! Toplesmu masih ada {remainingStars} bintang tersisa! ✨</span>
            </div>
          </div>

          {/* 4. Pengingat untuk Orang Tua */}
          <div className="w-full mt-2.5 bg-secondary-fixed/40 border-2 border-secondary-container/60 rounded-2xl p-2.5 flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex-shrink-0 flex items-center justify-center text-lg shadow-xs">
              👨‍👩‍👧
            </div>
            <p className="text-xs text-on-surface leading-tight font-sans">
              <strong className="font-display text-secondary font-bold block text-xs">
                Pemberitahuan untuk Ayah &amp; Ibu:
              </strong>
              Setelah tekan tombol, tunjukkan layar ini ke orang tua ya untuk mengambil hadiah aslimu!
            </p>
          </div>

          {/* 5. Tombol Aksi Tactile */}
          <div className="w-full mt-3.5 space-y-2">
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              type="button"
              className="tactile-btn w-full min-h-[52px] py-3 px-4 bg-gradient-to-r from-sunny-gold via-primary-container to-sunny-gold text-on-primary-container rounded-2xl font-display text-base font-bold flex items-center justify-center gap-2 cursor-pointer border-b-4 border-tactile-shadow-amber shadow-md hover:brightness-105 active:translate-y-1 active:border-b-0"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                  <span>Mengajukan Hadiah... 🍦</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl material-symbols-fill">
                    auto_awesome
                  </span>
                  <span>Ya, Tukar Sekarang! 🎁✨</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              type="button"
              className="tactile-btn w-full min-h-[46px] py-2 px-4 bg-surface-container text-on-surface-variant border-2 border-outline-variant/40 rounded-2xl font-display text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-surface-variant active:translate-y-1 cursor-pointer"
            >
              <span>Pikir-pikir Dulu / Kembali</span>
              <span className="material-symbols-outlined text-base">arrow_back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

