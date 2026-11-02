import React, { useState } from 'react';
import ParentApprovalTab from './ParentApprovalTab';
import ParentQuestsTab from './ParentQuestsTab';
import ParentRewardsTab from './ParentRewardsTab';

/**
 * Objek 5.1, 5.2, & 5.3 — ParentDashboardView (Dashboard Kontrol Orang Tua)
 * Menampilkan Quick Stats Bento (Status Review, Celengan Bintang, Konsistensi Rutinitas),
 * Segmented Tab Navigation, Tab Approval, Tab Kelola Quest, dan Tab Kelola Hadiah.
 */
export default function ParentDashboardView({
  childName = 'Bima',
  childAge = '5 Tahun',
  currentStars = 18,
  quests = [],
  rewards = [],
  onApproveQuest,
  onRejectQuest,
  onAddQuest,
  onDeleteQuest,
  onAddReward,
  onDeleteReward,
  onExitParentMode,
}) {
  const [activeTab, setActiveTab] = useState('approval'); // 'approval' | 'quests' | 'rewards'

  const pendingQuests = quests.filter((q) => q.status === 'pending');

  return (
    <div className="flex flex-col min-h-screen bg-canvas-cream pb-24">
      {/* Parent Secure Header Banner */}
      <header className="bg-inverse-surface text-inverse-on-surface shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Mode Title & Profile Dropdown */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shadow-xs">
              <span className="material-symbols-outlined text-lg material-symbols-fill">
                family_restroom
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                <span className="font-display text-[10px] text-surface-variant font-bold">
                  MODE ORANG TUA
                </span>
              </div>
              <h1 className="font-display text-sm font-bold text-surface-bright leading-tight">
                Ruang Kontrol Orang Tua 👨‍👩‍👧
              </h1>
            </div>
          </div>

          {/* Exit to Child Mode Button */}
          <button
            onClick={onExitParentMode}
            type="button"
            className="tactile-btn flex items-center gap-1.5 bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-cream-cloud px-3 py-1.5 rounded-xl border border-cream-cloud/30 font-display text-xs font-bold active:translate-y-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sunny-gold text-base material-symbols-fill">
              lock
            </span>
            <span>Kembali ke Mode Anak</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Container */}
      <main className="max-w-4xl mx-auto w-full px-4 pt-4 flex-1 flex flex-col gap-4">
        {/* Quick Stats Bento Overview */}
        <section className="grid grid-cols-3 gap-2.5">
          {/* Metric 1: Need Approval */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-soft-coral/30 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-on-surface-variant font-display">
                Perlu Review
              </span>
              <span className="w-2 h-2 rounded-full bg-soft-coral" />
            </div>
            <div className="font-display text-xl font-bold text-on-surface mt-1 flex items-baseline gap-1">
              <span>{pendingQuests.length}</span>
              <span className="text-[11px] font-medium text-on-surface-variant">Quest</span>
            </div>
            <p className="text-[10px] font-bold text-soft-coral flex items-center gap-0.5 mt-1 font-display">
              <span className="material-symbols-outlined text-xs">notifications_active</span>
              {pendingQuests.length > 0 ? 'Menunggu' : 'Bersih'}
            </p>
          </div>

          {/* Metric 2: Active Stars in Bank */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-sunny-gold/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-on-surface-variant font-display">
                Toples {childName}
              </span>
              <span className="w-2 h-2 rounded-full bg-sunny-gold" />
            </div>
            <div className="font-display text-xl font-bold text-primary mt-1 flex items-baseline gap-1">
              <span>{currentStars}</span>
              <span className="text-xs text-sunny-gold">⭐</span>
            </div>
            <p className="text-[10px] font-bold text-primary flex items-center gap-0.5 mt-1 font-display">
              <span className="material-symbols-outlined text-xs material-symbols-fill text-sunny-gold">
                stars
              </span>
              Bintang Aktif
            </p>
          </div>

          {/* Metric 3: Weekly Consistency */}
          <div className="bg-surface-container-lowest rounded-2xl p-3 border-2 border-tertiary-container/40 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-on-surface-variant font-display">
                Disiplin
              </span>
              <span className="w-2 h-2 rounded-full bg-tertiary-container" />
            </div>
            <div className="font-display text-xl font-bold text-tertiary mt-1">
              85%
            </div>
            <p className="text-[10px] font-bold text-tertiary flex items-center gap-0.5 mt-1 font-display">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              Konsisten
            </p>
          </div>
        </section>

        {/* Segmented Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-2xl max-w-fit shadow-inner">
          {/* Tab 1: Perlu Disetujui */}
          <button
            onClick={() => setActiveTab('approval')}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-display text-xs font-bold transition-all ${
              activeTab === 'approval'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-soft-coral text-base material-symbols-fill">
              pending_actions
            </span>
            <span>Perlu Disetujui</span>
            {pendingQuests.length > 0 && (
              <span className="bg-soft-coral text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {pendingQuests.length}
              </span>
            )}
          </button>

          {/* Tab 2: Daftar Quest Harian (Objek 5.2) */}
          <button
            onClick={() => setActiveTab('quests')}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-display text-xs font-bold transition-all ${
              activeTab === 'quests'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">checklist</span>
            <span>Kelola Quest</span>
          </button>

          {/* Tab 3: Katalog Hadiah (Objek 5.3) */}
          <button
            onClick={() => setActiveTab('rewards')}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-display text-xs font-bold transition-all ${
              activeTab === 'rewards'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">featured_seasonal_and_gifts</span>
            <span>Kelola Hadiah</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'approval' && (
          <ParentApprovalTab
            pendingQuests={pendingQuests}
            childName={childName}
            onApproveQuest={onApproveQuest}
            onRejectQuest={onRejectQuest}
          />
        )}

        {activeTab === 'quests' && (
          <ParentQuestsTab
            quests={quests}
            childName={childName}
            onAddQuest={onAddQuest}
            onDeleteQuest={onDeleteQuest}
          />
        )}

        {activeTab === 'rewards' && (
          <ParentRewardsTab
            rewards={rewards}
            childName={childName}
            onAddReward={onAddReward}
            onDeleteReward={onDeleteReward}
          />
        )}
      </main>
    </div>
  );
}
