import React from 'react';

/**
 * Objek 1.4 — Bottom Navigation Bar
 * Navigasi bawah ramah sentuhan (touch target > 48x48px) dengan gaya 3D tactile:
 * - Tab 1: Misi Petualangan (Home / Quests)
 * - Tab 2: Toko Hadiah (Reward Shop)
 */
export default function BottomNavBar({ activeTab = 'misi', onTabChange }) {
  return (
    <nav 
      aria-label="Navigasi Utama"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center px-4 pt-2 pb-3 bg-surface-container-lowest/95 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-surface-container-high/60"
    >
      <div className="w-full max-w-md flex justify-around items-center gap-3">
        {/* Tab 1: Misi Petualangan */}
        <button
          onClick={() => onTabChange('misi')}
          type="button"
          aria-label="Misi Petualangan"
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 font-display transition-all duration-100 min-w-[140px] ${
            activeTab === 'misi'
              ? 'bg-primary-container text-on-primary-container font-bold border-b-4 border-tactile-shadow-amber shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container font-semibold active:translate-y-1'
          }`}
        >
          <span 
            className={`material-symbols-outlined text-2xl ${
              activeTab === 'misi' ? 'material-symbols-fill' : ''
            }`}
          >
            rocket_launch
          </span>
          <span className="text-xs mt-0.5 font-bold tracking-tight">
            Misi Petualangan
          </span>
        </button>

        {/* Tab 2: Toko Hadiah */}
        <button
          onClick={() => onTabChange('hadiah')}
          type="button"
          aria-label="Toko Hadiah"
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 font-display transition-all duration-100 min-w-[140px] ${
            activeTab === 'hadiah'
              ? 'bg-primary-container text-on-primary-container font-bold border-b-4 border-tactile-shadow-amber shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container font-semibold active:translate-y-1'
          }`}
        >
          <span 
            className={`material-symbols-outlined text-2xl ${
              activeTab === 'hadiah' ? 'material-symbols-fill' : ''
            }`}
          >
            featured_seasonal_and_gifts
          </span>
          <span className="text-xs mt-0.5 font-bold tracking-tight">
            Toko Hadiah
          </span>
        </button>
      </div>
    </nav>
  );
}

