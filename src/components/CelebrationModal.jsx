import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * Web Audio API Chime Synth untuk nada kemenangan / fanfare mainan anak
 */
function playCelebrationFanfare() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const notes = [
      { freq: 523.25, time: 0.00, dur: 0.14 }, // C5
      { freq: 659.25, time: 0.12, dur: 0.14 }, // E5
      { freq: 783.99, time: 0.24, dur: 0.16 }, // G5
      { freq: 1046.50, time: 0.38, dur: 0.35 }, // C6 high bell
      { freq: 1318.51, time: 0.52, dur: 0.45 }  // E6 triumphant chime
    ];

    const now = audioCtx.currentTime;

    notes.forEach((note) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.001, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.25, now + note.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur);
    });
  } catch (err) {
    // Audio blocked by browser policy until interaction
  }
}

/**
 * Objek 2.3 — CelebrationModal (Layar Selebrasi Sukses Tukar Hadiah)
 */
export default function CelebrationModal({
  reward,
  childName = 'Bima',
  previousStars = 18,
  isOpen = false,
  onClose,
  onShowToParents,
}) {
  useEffect(() => {
    if (isOpen && reward) {
      // 1. Mainkan suara lonceng kemenangan
      playCelebrationFanfare();

      // 2. Ledakan konfeti ceria warna-warni
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#38BDF8', '#FB923C', '#30C88F', '#FFDDB8'],
        });
      } catch (e) {
        // Fallback jika canvas confetti tidak aktif
      }
    }
  }, [isOpen, reward]);

  if (!isOpen || !reward) return null;

  const starCost = reward.starCost;
  const newStars = Math.max(0, previousStars - starCost);

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-5 bg-inverse-surface/65 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Decorative Falling Stars Ambient Layer */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none">
        <div className="absolute top-12 left-[10%] text-3xl animate-bounce" style={{ animationDuration: '2.5s' }}>⭐</div>
        <div className="absolute top-20 right-[12%] text-3xl animate-bounce" style={{ animationDuration: '3s' }}>🎉</div>
        <div className="absolute top-36 left-[25%] text-2xl animate-pulse">✨</div>
        <div className="absolute top-44 right-[28%] text-2xl animate-pulse">🌟</div>
      </div>

      {/* Main Chunky Card Container */}
      <div 
        className="w-full max-w-sm sm:max-w-md landscape:max-w-3xl bg-surface-container-lowest rounded-3xl border-4 border-cream-cloud shadow-2xl relative overflow-hidden flex flex-col z-[65] transition-transform transform duration-200 max-h-[92vh] overflow-y-auto"
        style={{
          boxShadow: '0 25px 50px -12px rgba(133, 83, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.4)'
        }}
      >
        {/* Decorative Rainbow Confetti Trim */}
        <div className="h-3 w-full bg-gradient-to-r from-sunny-gold via-soft-coral to-sky-tint" />

        {/* Close Button (Top-Right) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup Layar Selebrasi"
          className="tactile-btn absolute top-4 right-4 z-20 w-10 h-10 rounded-2xl bg-surface-container-high border-2 border-slate-200 text-on-surface flex items-center justify-center cursor-pointer hover:bg-surface-variant active:translate-y-1"
        >
          <span className="material-symbols-outlined text-lg font-bold">close</span>
        </button>

        {/* Modal Body */}
        <div className="px-4 pt-3 pb-5 sm:px-6 flex flex-col landscape:grid landscape:grid-cols-2 landscape:gap-5 items-center text-center">
          {/* Sisi Kiri: Hero Image + Headline */}
          <div className="flex flex-col items-center">
            {/* 1. Celebratory Sparkle Badge & Hero Image */}
            <div className="relative mt-1 mb-2 flex items-center justify-center animate-float">
              {/* Halo Glow Ring */}
              <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-tertiary-container/60 via-sunny-gold/50 to-soft-coral/50 blur-xl scale-110" />

              {/* Sparkles */}
              <div className="absolute -top-3 -left-3 text-sunny-gold">
                <span className="material-symbols-outlined text-3xl material-symbols-fill">
                  auto_awesome
                </span>
              </div>
              <div className="absolute -top-2 -right-3 text-sunny-gold">
                <span className="material-symbols-outlined text-2xl material-symbols-fill">
                  star
                </span>
              </div>
              <div className="absolute bottom-1 -left-3 text-soft-coral">
                <span className="material-symbols-outlined text-2xl material-symbols-fill">
                  sparkles
                </span>
              </div>

              {/* Hero Card Frame */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-rose-50 to-amber-50 border-4 border-tertiary-container shadow-xl flex items-center justify-center p-2 overflow-hidden">
                <img 
                  src={reward.imageUrl} 
                  alt={reward.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-1 bg-sunny-gold text-on-primary-container px-2.5 py-0.5 rounded-full font-display text-[11px] font-bold shadow-md border-2 border-amber-300 flex items-center gap-1">
                  <span>Berhasil Diklaim!</span>
                  <span>🌟</span>
                </div>
              </div>
            </div>

            {/* 2. Headline & Subtitle */}
            <h2 className="font-display text-lg sm:text-xl text-tertiary font-extrabold tracking-tight mt-1 leading-tight">
              Horeee! Penukaran Berhasil! 🎉
            </h2>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs leading-relaxed font-medium">
              <span className="font-bold text-primary">{starCost} Bintang</span> terkirim ke <strong className="text-secondary font-display">Ayah &amp; Ibu</strong>! {childName} hebat! Sekarang tunjukkan layar ini ke orang tua untuk mengambil hadiah aslimu! ✨
            </p>

            {/* 4. Parent Reminder Box */}
            <div className="w-full mt-2.5 bg-cream-cloud border-2 border-sunny-gold rounded-2xl p-2.5 flex items-center gap-2.5 text-left shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-sunny-gold/25 flex-shrink-0 flex items-center justify-center text-lg shadow-xs">
                👨‍👩‍👧
              </div>
              <p className="text-[11px] text-on-surface leading-tight font-sans">
                <strong className="font-display text-primary font-bold block text-[11px]">
                  Tunjukkan ke Ayah &amp; Ibu Sekarang:
                </strong>
                "Ayah/Ibu, {childName} sudah tukar {starCost} bintang untuk {reward.name}!" 🍨
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Updated Star Jar Math & Tombol */}
          <div className="w-full flex flex-col items-center mt-3 landscape:mt-0">
            {/* 3. Updated Star Jar Math */}
            <div className="w-full bg-canvas-cream border-2 border-outline-variant/40 rounded-2xl p-3 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-center gap-1.5 mb-2 relative">
                <span className="material-symbols-outlined text-tertiary-container text-base material-symbols-fill">
                  check_circle
                </span>
                <span className="font-display text-xs font-bold text-primary">
                  Toples Bintang Diperbarui
                </span>
                <span className="material-symbols-outlined text-sunny-gold text-sm material-symbols-fill">
                  auto_awesome
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                {/* Toples Awal */}
                <div className="bg-surface-container-lowest rounded-2xl p-2 border border-surface-variant shadow-xs flex flex-col items-center opacity-80">
                  <span className="text-[11px] font-semibold text-on-surface-variant leading-tight font-display">
                    Awal
                  </span>
                  <div className="flex items-center gap-0.5 font-display text-base font-bold text-on-surface mt-0.5">
                    <span>{previousStars}</span>
                    <span className="material-symbols-outlined text-sunny-gold text-sm material-symbols-fill">
                      star
                    </span>
                  </div>
                </div>

                {/* Ditukar */}
                <div className="bg-rose-50 rounded-2xl p-2 border-2 border-soft-coral/50 shadow-xs flex flex-col items-center">
                  <span className="text-[11px] font-bold text-soft-coral leading-tight font-display">
                    Ditukar
                  </span>
                  <div className="flex items-center gap-0.5 font-display text-base font-bold text-tactile-shadow-coral mt-0.5">
                    <span>-{starCost}</span>
                    <span className="material-symbols-outlined text-soft-coral text-sm material-symbols-fill">
                      star
                    </span>
                  </div>
                </div>

                {/* Sisa Toples Baru */}
                <div className="bg-cream-cloud rounded-2xl p-2 border-2 border-tertiary-container shadow-xs flex flex-col items-center scale-105">
                  <span className="text-[11px] font-bold text-tertiary leading-tight font-display">
                    Sisa Toples
                  </span>
                  <div className="flex items-center gap-0.5 font-display text-base font-bold text-tertiary mt-0.5">
                    <span>= {newStars}</span>
                    <span className="material-symbols-outlined text-sunny-gold text-sm material-symbols-fill">
                      star
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-center gap-1 text-[11px] font-display text-tertiary font-bold">
                <span className="material-symbols-outlined text-sm material-symbols-fill">verified</span>
                <span>Bintang berhasil ditukar! {childName} anak rajin &amp; hebat! 🌟</span>
              </div>
            </div>

            {/* 5. Tactile Buttons */}
            <div className="w-full mt-3 space-y-2">
              <button
                onClick={onShowToParents}
                type="button"
                className="tactile-btn w-full min-h-[48px] py-2.5 px-4 bg-tertiary-container hover:brightness-105 text-white rounded-2xl font-display text-sm font-bold flex items-center justify-center gap-2 cursor-pointer border-b-4 border-tactile-shadow-emerald shadow-md active:translate-y-1 active:border-b-0"
              >
                <span className="text-lg">👨‍👩‍👧</span>
                <span>Tunjukkan ke Ayah / Ibu 🎁</span>
              </button>

              <button
                onClick={onClose}
                type="button"
                className="tactile-btn w-full min-h-[42px] py-2 px-4 bg-surface-container text-on-surface border-2 border-outline-variant/60 rounded-2xl font-display text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-surface-variant active:translate-y-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary material-symbols-fill">
                  rocket_launch
                </span>
                <span>Kembali ke Petualangan 🚀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

