import React, { useState, useEffect } from 'react';

/**
 * Objek 4.1 — ParentPinModal (Keypad PIN 4 Digit Mode Orang Tua)
 * Proteksi akses orang tua dengan keypad taktil numerik 3x4, indikator bintang,
 * dan animasi getar (shake) jika salah input.
 * Default PIN: "1234"
 */
export default function ParentPinModal({
  isOpen = false,
  childName = 'Bima',
  correctPin = '1234',
  onClose,
  onSuccess,
}) {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setIsError(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setIsError(false);

      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setIsError(false);
      setErrorMessage('');
    }
  };

  const verifyPin = (inputPin) => {
    if (inputPin === correctPin) {
      setTimeout(() => {
        onSuccess();
      }, 250);
    } else {
      setIsError(true);
      setErrorMessage('PIN salah! Coba gunakan PIN default: 1234');
      setTimeout(() => {
        setPin('');
      }, 700);
    }
  };

  const handleBiometric = () => {
    // Simulasi Biometrik / Face ID langsung berhasil
    onSuccess();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-inverse-surface/65 backdrop-blur-md transition-opacity duration-300"
    >
      <main className="relative z-50 w-full max-w-[390px] mx-auto flex flex-col justify-center">
        {/* Chunky Tactile Card Container */}
        <div 
          className={`bg-surface-container-lowest rounded-3xl border-2 border-primary-fixed shadow-2xl p-5 relative overflow-hidden flex flex-col items-center transition-all ${
            isError ? 'animate-shake border-error ring-4 ring-error/20' : ''
          }`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(133, 83, 0, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.4)'
          }}
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-cream-cloud rounded-full filter blur-2xl opacity-70 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-fixed rounded-full filter blur-2xl opacity-40 pointer-events-none" />

          {/* Top Action Row */}
          <div className="w-full flex items-center justify-between mb-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low text-secondary rounded-full border border-secondary-fixed font-display text-xs font-bold">
              <span className="material-symbols-outlined text-sm material-symbols-fill">
                verified_user
              </span>
              Gerbang Keamanan
            </span>

            <button
              onClick={onClose}
              type="button"
              className="tactile-btn inline-flex items-center gap-1 px-3 py-1 bg-surface-container-low hover:bg-surface-variant text-on-surface-variant rounded-full border border-outline-variant font-display text-xs font-bold active:translate-y-1 cursor-pointer"
            >
              <span>Kembali</span>
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Centered Shield Graphic Badge */}
          <div className="relative mb-2 mt-1">
            <div className="w-16 h-16 rounded-full bg-cream-cloud border-2 border-sunny-gold flex items-center justify-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border-b-2 border-tactile-shadow-amber text-white">
                <span className="material-symbols-outlined text-2xl material-symbols-fill">
                  lock_person
                </span>
              </div>
            </div>
            {/* Star badge decoration */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-sunny-gold border-2 border-surface-container-lowest flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-white text-xs material-symbols-fill">
                star
              </span>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center px-1 mb-4">
            <h1 className="font-display text-lg font-bold text-on-surface tracking-tight">
              Khusus Ayah &amp; Ibu 🛡️
            </h1>
            <p className="text-xs text-on-surface-variant mt-1 leading-snug font-medium">
              Untuk masuk ke Ruang Kontrol &amp; kelola misi {childName}, masukkan 4 digit PIN rahasia.
            </p>
          </div>

          {/* 4-Digit PIN Indicators */}
          <div className="flex items-center justify-center gap-3 mb-4 w-full">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              const isCurrent = pin.length === index;

              return (
                <div
                  key={index}
                  className={`w-12 h-13 rounded-2xl flex items-center justify-center transition-all ${
                    isFilled
                      ? 'bg-cream-cloud border-2 border-sunny-gold shadow-xs scale-105'
                      : isCurrent
                      ? 'bg-surface-container-low border-2 border-primary-container ring-4 ring-primary-fixed'
                      : 'bg-surface-container-low border-2 border-surface-container-high'
                  }`}
                >
                  {isFilled ? (
                    <span className="material-symbols-outlined text-primary-container text-2xl material-symbols-fill animate-float">
                      star
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/60" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Error Message Feedback */}
          {errorMessage && (
            <p className="text-xs font-bold text-error mb-3 text-center animate-pulse">
              {errorMessage}
            </p>
          )}

          {/* Tactile Numeric Keypad (3x4 Grid) */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-[290px] mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                type="button"
                className="tactile-btn h-13 rounded-2xl bg-surface-container-low border-2 border-surface-container-high flex items-center justify-center font-display text-lg font-bold text-on-surface hover:bg-surface-variant active:translate-y-1 cursor-pointer"
              >
                {num}
              </button>
            ))}

            {/* Quick Biometric Key */}
            <button
              onClick={handleBiometric}
              type="button"
              title="Gunakan Biometrik"
              aria-label="Gunakan Sidik Jari atau Biometrik"
              className="tactile-btn h-13 rounded-2xl bg-cream-cloud border-2 border-sunny-gold/80 flex items-center justify-center text-primary active:bg-sunny-gold cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl material-symbols-fill">
                fingerprint
              </span>
            </button>

            {/* Digit 0 */}
            <button
              onClick={() => handleKeyPress('0')}
              type="button"
              className="tactile-btn h-13 rounded-2xl bg-surface-container-low border-2 border-surface-container-high flex items-center justify-center font-display text-lg font-bold text-on-surface hover:bg-surface-variant active:translate-y-1 cursor-pointer"
            >
              0
            </button>

            {/* Backspace Key */}
            <button
              onClick={handleBackspace}
              type="button"
              title="Hapus"
              aria-label="Hapus digit"
              className="tactile-btn h-13 rounded-2xl bg-surface-container-low border-2 border-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant active:translate-y-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">backspace</span>
            </button>
          </div>

          {/* Biometric Shortcut Banner */}
          <button
            onClick={handleBiometric}
            type="button"
            className="w-full max-w-[290px] py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-variant border border-outline-variant flex items-center justify-center gap-2 text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary text-base material-symbols-fill">
              fingerprint
            </span>
            <span className="font-display text-xs font-bold text-secondary">
              Gunakan Sidik Jari / Face ID 👆
            </span>
          </button>

          {/* Helper Info */}
          <div className="mt-3 text-center">
            <p className="text-[11px] font-bold text-on-surface-variant">
              💡 PIN Default Pengujian: <span className="text-primary font-mono font-bold">1234</span>
            </p>
          </div>
        </div>

        {/* Security Reassurance note */}
        <div className="text-center mt-3 text-white/80 text-xs font-medium flex items-center justify-center gap-1 drop-shadow-sm">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>PIN melindungi pengaturan &amp; persetujuan bintang anak</span>
        </div>
      </main>
    </div>
  );
}

