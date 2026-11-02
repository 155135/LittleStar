import React, { useState } from 'react';

/**
 * Objek 5.2 — ParentQuestsTab (Tab Kelola Quest Orang Tua)
 * Menampilkan daftar seluruh quest anak dan form tambah misi baru
 * dengan live preview langsung.
 */
export default function ParentQuestsTab({
  quests = [],
  childName = 'Bima',
  onAddQuest,
  onDeleteQuest,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kemandirian');
  const [stars, setStars] = useState(2);
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState('star');

  const categories = [
    { label: 'Kemandirian', icon: 'smart_toy', emoji: '🧸' },
    { label: 'Kebersihan', icon: 'dentistry', emoji: '🪥' },
    { label: 'Kesehatan', icon: 'nutrition', emoji: '🥦' },
    { label: 'Belajar', icon: 'menu_book', emoji: '📚' },
    { label: 'Kerapian', icon: 'bed', emoji: '🛏️' },
  ];

  const starOptions = [1, 2, 3, 5];

  const handleCategorySelect = (cat) => {
    setCategory(cat.label);
    setIcon(cat.icon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQuest = {
      id: `quest_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Misi harian teratur',
      category,
      icon,
      iconBg: 'bg-primary-fixed',
      borderColor: 'border-tactile-shadow-amber',
      iconColor: 'text-primary-container',
      stars: Number(stars),
      status: 'todo',
      assignedDate: new Date().toISOString().split('T')[0],
    };

    onAddQuest(newQuest);
    setTitle('');
    setSubtitle('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Info & Tombol Tambah */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-display text-base font-bold text-on-surface">
            Daftar Misi {childName}
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            Atur rutinitas &amp; nilai reward bintang untuk melatih kebiasaan baik.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          type="button"
          className="tactile-btn px-3 py-2 rounded-xl bg-primary-container hover:bg-sunny-gold text-on-primary-container font-display text-xs font-bold border-b-4 border-tactile-shadow-amber shadow-xs flex items-center gap-1 active:translate-y-1 active:border-b-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">
            {isFormOpen ? 'close' : 'add_circle'}
          </span>
          <span>{isFormOpen ? 'Tutup Form' : '+ Tambah Misi'}</span>
        </button>
      </div>

      {/* FORM TAMBAH MISI BARU (Accordion / Pop-in) */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-3xl p-4 border-2 border-sunny-gold shadow-md space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
            <h3 className="font-display font-bold text-sm text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg material-symbols-fill">
                playlist_add
              </span>
              Buat Misi Baru untuk {childName}
            </h3>
            <span className="text-[11px] font-bold text-tactile-shadow-amber bg-cream-cloud px-2 py-0.5 rounded-full border border-sunny-gold">
              Live Preview
            </span>
          </div>

          {/* Live Preview Card */}
          <div className="bg-canvas-cream rounded-2xl p-3 border border-outline-variant/40">
            <span className="text-[10px] font-bold text-on-surface-variant font-display block mb-1">
              👁️ Tampilan di Layar {childName}:
            </span>
            <div className="bg-surface-container-lowest border-2 border-surface-variant rounded-2xl p-3 shadow-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed border-b-2 border-tactile-shadow-amber flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-xl material-symbols-fill">
                    {icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-on-surface">
                    {title || 'Contoh: Rapikan Tempat Tidur'}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant font-sans">
                    {subtitle || 'Misi harian'} • {category}
                  </p>
                </div>
              </div>
              <div className="bg-cream-cloud border border-sunny-gold px-2 py-0.5 rounded-full text-xs font-bold text-primary font-display">
                +{stars} ⭐
              </div>
            </div>
          </div>

          {/* Input 1: Judul Misi */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Nama Misi / Tugas <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Mengaji 15 Menit / Merapikan Sepatu"
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border-2 border-outline-variant/60 focus:border-primary-container focus:outline-none text-xs font-display text-on-surface"
            />
          </div>

          {/* Input 2: Catatan / Keterangan Singkat */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Instruksi Singkat untuk Anak
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Contoh: Simpan di rak sepatu depan pintu"
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border-2 border-outline-variant/60 focus:border-primary-container focus:outline-none text-xs font-sans text-on-surface"
            />
          </div>

          {/* Input 3: Pilih Kategori */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Kategori Tugas
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-xl font-display text-xs font-bold flex items-center gap-1 transition-all ${
                    category === cat.label
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-variant'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Nilai Reward Bintang */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Hadiah Nilai Bintang
            </label>
            <div className="flex gap-2">
              {starOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStars(opt)}
                  className={`flex-1 py-2 rounded-xl font-display text-xs font-bold flex items-center justify-center gap-1 border-2 transition-all ${
                    stars === opt
                      ? 'bg-cream-cloud border-sunny-gold text-primary shadow-xs'
                      : 'bg-surface-container-low border-transparent text-on-surface-variant'
                  }`}
                >
                  <span>+{opt}</span>
                  <span className="text-sunny-gold">⭐</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Submit Form */}
          <button
            type="submit"
            className="tactile-btn w-full min-h-[46px] bg-tertiary-container hover:bg-tertiary text-on-tertiary font-display text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 border-b-4 border-tactile-shadow-emerald shadow-sm active:translate-y-1 active:border-b-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base material-symbols-fill">
              check
            </span>
            <span>Simpan Misi Baru 🚀</span>
          </button>
        </form>
      )}

      {/* DAFTAR QUEST YANG SUDAH ADA */}
      <div className="space-y-2.5">
        <h3 className="font-display text-xs font-bold text-on-surface-variant px-1">
          Daftar Misi Aktif ({quests.length} Misi)
        </h3>

        {quests.map((quest) => (
          <article
            key={quest.id}
            className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-surface-variant shadow-xs flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${quest.iconBg || 'bg-surface-container'}`}>
                <span className="material-symbols-outlined text-xl material-symbols-fill text-primary">
                  {quest.icon || 'star'}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-xs font-bold text-on-surface truncate">
                    {quest.title}
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-surface-container text-secondary font-display">
                    {quest.category}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-sans truncate">
                  {quest.subtitle}
                </p>
              </div>
            </div>

            {/* Kanan: Badge Nilai Bintang & Tombol Hapus */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-cream-cloud border border-sunny-gold px-2 py-0.5 rounded-full text-xs font-bold text-primary font-display">
                +{quest.stars} ⭐
              </span>

              <button
                onClick={() => onDeleteQuest(quest.id)}
                type="button"
                title="Hapus misi"
                className="w-8 h-8 rounded-xl bg-surface-container hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

