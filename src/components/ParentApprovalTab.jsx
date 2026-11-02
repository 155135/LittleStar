import React from 'react';

/**
 * Objek 5.1 — ParentApprovalTab (Daftar Tugas Perlu Disetujui)
 * Menampilkan kartu tugas yang telah diselesaikan anak dan menunggu verifikasi orang tua.
 * Aksi:
 * - "Setujui & Beri Bintang (+X ⭐) ✅" -> Menambah saldo bintang anak & mencatat di buku tabungan
 * - "Tolak / Minta Ulangi" -> Mengembalikan status tugas ke 'todo'
 */
export default function ParentApprovalTab({
  pendingQuests = [],
  childName = 'Bima',
  onApproveQuest,
  onRejectQuest,
}) {
  if (pendingQuests.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-3xl p-8 border-2 border-dashed border-outline-variant/60 flex flex-col items-center text-center my-4">
        <div className="w-16 h-16 rounded-full bg-cream-cloud border-2 border-sunny-gold flex items-center justify-center text-sunny-gold mb-3">
          <span className="material-symbols-outlined text-3xl material-symbols-fill">
            task_alt
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-on-surface">
          Semua Tugas Sudah Diperiksa! 🎉
        </h3>
        <p className="text-xs text-on-surface-variant max-w-sm mt-1 font-medium leading-relaxed">
          Tidak ada misi yang menunggu konfirmasi saat ini. {childName} bisa melanjutkan petualangannya untuk mengumpulkan bintang baru!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
        <div>
          <h2 className="font-display text-base font-bold text-on-surface flex items-center gap-1.5">
            <span>Tugas Selesai Menunggu Konfirmasi Ibu/Ayah</span>
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            Periksa hasil kerja {childName} sebelum bintang otomatis ditambahkan ke toples.
          </p>
        </div>
        <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full border border-surface-variant self-start sm:self-auto font-display">
          {pendingQuests.length} Menunggu
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {pendingQuests.map((quest) => (
          <article
            key={quest.id}
            className="bg-surface-container-lowest rounded-2xl p-4 border-2 border-surface-variant shadow-sm hover:border-sunny-gold transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Info Kiri */}
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${quest.iconBg || 'bg-secondary-container/20 border-secondary-container'}`}>
                  <span className="material-symbols-outlined text-2xl material-symbols-fill text-primary">
                    {quest.icon || 'task_alt'}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-display text-[10px] font-bold bg-surface-container text-secondary px-2 py-0.5 rounded-full">
                      {quest.category || 'Misi Harian'}
                    </span>
                    <span className="text-[11px] text-on-surface-variant flex items-center gap-0.5 font-medium">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      Baru saja diselesaikan
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-on-surface">
                    {quest.title}
                  </h3>

                  {quest.subtitle && (
                    <div className="bg-cream-cloud/80 border border-sunny-gold/40 rounded-xl px-2.5 py-1 flex items-center gap-1.5 max-w-fit">
                      <span className="material-symbols-outlined text-tactile-shadow-amber text-xs material-symbols-fill">
                        chat
                      </span>
                      <p className="text-[11px] text-on-primary-container font-medium italic">
                        {quest.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Kanan */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-variant">
                {/* Badge Hadiah Bintang */}
                <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-cream-cloud border border-sunny-gold/50 text-on-primary-container font-display text-xs font-bold shadow-xs">
                  <span>+{quest.stars}</span>
                  <span className="text-sunny-gold">⭐</span>
                </div>

                {/* Tombol Tolak / Ulangi */}
                <button
                  onClick={() => onRejectQuest(quest)}
                  type="button"
                  title="Minta ulangi"
                  className="tactile-btn px-3 py-2 rounded-xl border border-surface-variant bg-surface text-on-surface-variant hover:bg-error-container hover:text-error hover:border-error/40 font-display text-xs font-bold transition-all flex items-center gap-1 active:translate-y-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">replay</span>
                  <span>Ulangi</span>
                </button>

                {/* Tombol Setujui Chunky Tactile */}
                <button
                  onClick={() => onApproveQuest(quest)}
                  type="button"
                  className="tactile-btn px-3.5 py-2 rounded-xl bg-tertiary-container hover:bg-tertiary text-on-tertiary font-display text-xs font-bold border-b-4 border-tactile-shadow-emerald shadow-sm flex items-center gap-1.5 active:translate-y-1 active:border-b-0 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base material-symbols-fill">
                    verified
                  </span>
                  <span>Setujui (+{quest.stars} ⭐)</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

