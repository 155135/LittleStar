import React, { useState } from 'react';

/**
 * Objek 5.3 — ParentRewardsTab (Tab Kelola Hadiah Orang Tua)
 * Menampilkan daftar katalog hadiah, form tambah hadiah baru dengan
 * live preview dan tactile stepper bintang.
 */
export default function ParentRewardsTab({
  rewards = [],
  childName = 'Bima',
  onAddReward,
  onDeleteReward,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Camilan Lezat');
  const [starCost, setStarCost] = useState(15);
  const [description, setDescription] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🍦');
  const [customImageUrl, setCustomImageUrl] = useState('');

  const categories = [
    { label: 'Camilan Lezat', emoji: '🍦' },
    { label: 'Aktivitas Seru', emoji: '🚲' },
    { label: 'Waktu Bermain', emoji: '🧸' },
    { label: 'Screen Time', emoji: '📺' },
    { label: 'Lainnya', emoji: '✨' },
  ];

  const presetEmojis = [
    { emoji: '🍦', img: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=80' },
    { emoji: '🚲', img: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80' },
    { emoji: '🧱', img: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop&q=80' },
    { emoji: '🎬', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80' },
    { emoji: '🎮', img: 'https://images.unsplash.com/photo-1612287232230-058e176b9760?w=500&auto=format&fit=crop&q=80' },
    { emoji: '🍕', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80' },
  ];

  const handleEmojiSelect = (item) => {
    setSelectedEmoji(item.emoji);
    setCustomImageUrl(item.img);
  };

  const handleMinusStar = () => {
    setStarCost((prev) => Math.max(1, prev - 1));
  };

  const handlePlusStar = () => {
    setStarCost((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const currentImg = customImageUrl || presetEmojis[0].img;

    const newReward = {
      id: `reward_${Date.now()}`,
      name: `${name.trim()} ${selectedEmoji}`,
      category,
      starCost: Number(starCost),
      imageUrl: currentImg,
      description: description.trim() || 'Hadiah spesial penjelajah bintang!',
    };

    onAddReward(newReward);
    setName('');
    setDescription('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Info & Tombol Tambah */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-display text-base font-bold text-on-surface">
            Katalog Hadiah {childName}
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            Tentukan reward nyata untuk menjaga semangat dan motivasi anak.
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
          <span>{isFormOpen ? 'Tutup Form' : '+ Tambah Hadiah'}</span>
        </button>
      </div>

      {/* FORM TAMBAH HADIAH BARU */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-3xl p-4 border-2 border-sunny-gold shadow-md space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-surface-variant">
            <h3 className="font-display font-bold text-sm text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg material-symbols-fill">
                card_giftcard
              </span>
              Tambah Hadiah Baru untuk {childName}
            </h3>
            <span className="text-[11px] font-bold text-tactile-shadow-amber bg-cream-cloud px-2 py-0.5 rounded-full border border-sunny-gold">
              Live Preview
            </span>
          </div>

          {/* Live Preview Card */}
          <div className="bg-canvas-cream rounded-2xl p-3 border border-outline-variant/40">
            <span className="text-[10px] font-bold text-on-surface-variant font-display block mb-1">
              👁️ Tampilan di Toko Hadiah Anak:
            </span>
            <div className="bg-surface-container-lowest border-2 border-surface-variant rounded-2xl p-3 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container flex items-center justify-center text-2xl shrink-0 border">
                  {customImageUrl ? (
                    <img src={customImageUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{selectedEmoji}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-on-surface">
                    {name || 'Contoh: Es Krim Rasa Cokelat'} {selectedEmoji}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant font-sans">
                    {category}
                  </p>
                </div>
              </div>
              <div className="bg-cream-cloud border-2 border-sunny-gold px-2.5 py-1 rounded-full text-xs font-bold text-primary font-display shrink-0">
                ⭐ {starCost}
              </div>
            </div>
          </div>

          {/* Input 1: Nama Hadiah */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Nama Hadiah <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Main ke Playground Mini"
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border-2 border-outline-variant/60 focus:border-primary-container focus:outline-none text-xs font-display text-on-surface"
            />
          </div>

          {/* Input 2: Kategori Hadiah */}
          <div className="space-y-1">
            <label className="font-display text-xs font-bold text-on-surface block">
              Kategori Hadiah
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setCategory(cat.label)}
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

          {/* Input 3: Biaya Bintang (Tactile Stepper) */}
          <div className="space-y-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/40">
            <label className="font-display text-xs font-bold text-on-surface block">
              Biaya Bintang (Nilai Tukar)
            </label>

            <div className="flex items-center justify-between gap-3 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/40">
              <button
                type="button"
                onClick={handleMinusStar}
                className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-variant border border-outline-variant flex items-center justify-center font-bold text-base active:translate-y-1"
              >
                -
              </button>

              <div className="flex items-center gap-1">
                <span className="font-display text-xl font-bold text-primary">
                  {starCost}
                </span>
                <span className="material-symbols-outlined text-sunny-gold text-lg material-symbols-fill">
                  star
                </span>
                <span className="text-[11px] font-bold text-on-surface-variant ml-0.5">
                  Bintang
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlusStar}
                className="w-10 h-10 rounded-xl bg-primary-container hover:bg-sunny-gold text-on-primary-container border-b-2 border-tactile-shadow-amber flex items-center justify-center font-bold text-base active:translate-y-1"
              >
                +
              </button>
            </div>

            {/* Pilihan Cepat */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-on-surface-variant">Pilihan Cepat:</span>
              {[5, 10, 15, 25].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setStarCost(val)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-display border transition-all ${
                    starCost === val
                      ? 'bg-cream-cloud border-sunny-gold text-primary'
                      : 'bg-surface-container-lowest border-outline-variant/60 text-on-surface-variant'
                  }`}
                >
                  +{val} ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Input 4: Ikon / Stiker Visual */}
          <div className="space-y-1.5">
            <label className="font-display text-xs font-bold text-on-surface block">
              Pilih Ikon Cepat:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {presetEmojis.map((item) => (
                <button
                  key={item.emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(item)}
                  className={`p-2 rounded-xl text-xl flex items-center justify-center border-2 transition-transform ${
                    selectedEmoji === item.emoji
                      ? 'bg-cream-cloud border-sunny-gold scale-105 shadow-xs'
                      : 'bg-surface-container-low border-transparent hover:scale-105'
                  }`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Simpan Hadiah */}
          <button
            type="submit"
            className="tactile-btn w-full min-h-[46px] bg-tertiary-container hover:bg-tertiary text-on-tertiary font-display text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 border-b-4 border-tactile-shadow-emerald shadow-sm active:translate-y-1 active:border-b-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base material-symbols-fill">
              check
            </span>
            <span>Simpan Hadiah Baru 🎁</span>
          </button>
        </form>
      )}

      {/* DAFTAR KATALOG HADIAH SAAT INI */}
      <div className="space-y-2.5">
        <h3 className="font-display text-xs font-bold text-on-surface-variant px-1">
          Katalog Hadiah Aktif ({rewards.length} Pilihan)
        </h3>

        {rewards.map((reward) => (
          <article
            key={reward.id}
            className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-surface-variant shadow-xs flex items-center justify-between gap-2.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container shrink-0 border">
                {reward.imageUrl ? (
                  <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    🎁
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-xs font-bold text-on-surface truncate">
                    {reward.name}
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-surface-container text-secondary font-display">
                    {reward.category}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-sans truncate">
                  {reward.description || 'Hadiah di Toko Hadiah'}
                </p>
              </div>
            </div>

            {/* Kanan: Badge Harga Bintang & Tombol Hapus */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-cream-cloud border border-sunny-gold px-2.5 py-1 rounded-full text-xs font-bold text-primary font-display">
                ⭐ {reward.starCost}
              </span>

              <button
                onClick={() => onDeleteReward(reward.id)}
                type="button"
                title="Hapus hadiah"
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

