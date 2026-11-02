import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroProgressCard from './components/HeroProgressCard';
import QuestSection from './components/QuestSection';
import RewardShopView from './components/RewardShopView';
import RewardRedeemModal from './components/RewardRedeemModal';
import CelebrationModal from './components/CelebrationModal';
import StarPassbookView from './components/StarPassbookView';
import ParentPinModal from './components/ParentPinModal';
import ParentDashboardView from './components/ParentDashboardView';
import BottomNavBar from './components/BottomNavBar';
import { littleheroesService } from './services/littleheroesService';
import { isSupabaseConfigured } from './lib/supabase';
import { mockProfile, initialQuests, initialRewards, initialTransactions } from './data/mockData';

export default function App() {
  const [profile, setProfile] = useState(mockProfile);
  const [quests, setQuests] = useState(initialQuests);
  const [rewards, setRewards] = useState(initialRewards);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeTab, setActiveTab] = useState('misi'); // 'misi' | 'hadiah'
  
  // State untuk Layar Buku Bintang (Fase 3)
  const [isPassbookOpen, setIsPassbookOpen] = useState(false);

  // State untuk Objek 2.2: Modal Konfirmasi Tukar Hadiah
  const [selectedReward, setSelectedReward] = useState(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  // State untuk Objek 2.3: Layar Selebrasi Sukses Tukar Hadiah
  const [celebrationReward, setCelebrationReward] = useState(null);
  const [previousStarsBeforeRedeem, setPreviousStarsBeforeRedeem] = useState(18);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // State untuk Fase 4 & 5: Proteksi PIN & Dashboard Mode Orang Tua
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isParentModeActive, setIsParentModeActive] = useState(false);

  // Load Data awal dari Service (Supabase jika ada kredensial, atau LocalStorage)
  const loadAllData = async () => {
    const [p, q, r, t] = await Promise.all([
      littleheroesService.getProfile(),
      littleheroesService.getQuests(),
      littleheroesService.getRewards(),
      littleheroesService.getTransactions(),
    ]);
    if (p) setProfile(p);
    if (q) setQuests(q);
    if (r) setRewards(r);
    if (t) setTransactions(t);
  };

  useEffect(() => {
    loadAllData();

    // Subscribe ke Realtime Supabase
    const unsubscribe = littleheroesService.subscribeToChanges(() => {
      loadAllData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Simpan otomatis ke LocalStorage sebagai cadangan offline
  useEffect(() => {
    littleheroesService.saveLocalAll(profile, quests, rewards, transactions);
  }, [profile, quests, rewards, transactions]);

  // Hitung jumlah misi yang selesai (status 'approved')
  const completedCount = quests.filter((q) => q.status === 'approved').length;
  const totalCount = quests.length;

  // Handler saat anak menekan tombol "Aku Sudah Selesai! ✨"
  const handleMarkDone = async (questId) => {
    setQuests((prevQuests) =>
      prevQuests.map((q) =>
        q.id === questId ? { ...q, status: 'pending' } : q
      )
    );
    await littleheroesService.updateQuestStatus(questId, 'pending');
  };

  // Handler saat anak memilih hadiah dari katalog
  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setIsRedeemModalOpen(true);
  };

  // Handler saat konfirmasi tukar hadiah disetujui anak
  const handleConfirmRedeem = async (reward) => {
    const prevStars = profile.currentStars;
    const newStars = Math.max(0, prevStars - reward.starCost);
    const newTotalRedeemed = profile.totalRedeemed + reward.starCost;

    setPreviousStarsBeforeRedeem(prevStars);
    setProfile((prev) => ({
      ...prev,
      currentStars: newStars,
      totalRedeemed: newTotalRedeemed,
    }));

    await littleheroesService.updateProfileStars(newStars, profile.totalCollected, newTotalRedeemed);

    // Catat ke Buku Bintang
    const newTx = {
      id: `tx_${Date.now()}`,
      type: 'spent',
      stars: reward.starCost,
      title: `Tukar ${reward.name}`,
      category: 'Penukaran Hadiah',
      emoji: '🎁',
      bgIcon: 'bg-soft-coral/15 border-soft-coral/40',
      note: 'Klaim baru saja diajukan',
      dateGroup: 'Hari Ini',
      timestamp: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    await littleheroesService.addTransaction(newTx);

    setIsRedeemModalOpen(false);
    setCelebrationReward(reward);
    setIsCelebrationOpen(true);
  };

  // Handler klik tombol gembok mode orang tua di header
  const handleParentModeClick = () => {
    setIsPinModalOpen(true);
  };

  // Handler verifikasi PIN berhasil
  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    setIsParentModeActive(true);
  };

  // Handler orang tua menyetujui tugas anak (Approve Quest)
  const handleApproveQuest = async (quest) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, status: 'approved' } : q))
    );
    await littleheroesService.updateQuestStatus(quest.id, 'approved');

    const newStars = profile.currentStars + quest.stars;
    const newTotalCollected = profile.totalCollected + quest.stars;

    setProfile((prev) => ({
      ...prev,
      currentStars: newStars,
      totalCollected: newTotalCollected,
    }));
    await littleheroesService.updateProfileStars(newStars, newTotalCollected, profile.totalRedeemed);

    const newTx = {
      id: `tx_${Date.now()}`,
      type: 'earned',
      stars: quest.stars,
      title: quest.title,
      category: quest.category || 'Misi Disiplin',
      emoji: '⭐',
      bgIcon: 'bg-tertiary-fixed/30 border-tertiary-fixed',
      note: 'Disetujui Orang Tua baru saja',
      dateGroup: 'Hari Ini',
      timestamp: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    await littleheroesService.addTransaction(newTx);
  };

  // Handler orang tua menolak/meminta anak mengulangi tugas (Reject Quest)
  const handleRejectQuest = async (quest) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === quest.id ? { ...q, status: 'todo' } : q))
    );
    await littleheroesService.updateQuestStatus(quest.id, 'todo');
  };

  // Handler orang tua menambah quest baru (Objek 5.2)
  const handleAddQuest = async (newQuest) => {
    setQuests((prev) => [newQuest, ...prev]);
    await littleheroesService.addQuest(newQuest);
  };

  // Handler orang tua menghapus quest (Objek 5.2)
  const handleDeleteQuest = async (questId) => {
    setQuests((prev) => prev.filter((q) => q.id !== questId));
    await littleheroesService.deleteQuest(questId);
  };

  // Handler orang tua menambah reward baru (Objek 5.3)
  const handleAddReward = async (newReward) => {
    setRewards((prev) => [newReward, ...prev]);
    await littleheroesService.addReward(newReward);
  };

  // Handler orang tua menghapus reward (Objek 5.3)
  const handleDeleteReward = async (rewardId) => {
    setRewards((prev) => prev.filter((r) => r.id !== rewardId));
    await littleheroesService.deleteReward(rewardId);
  };

  const handleStarClick = () => {
    setIsPassbookOpen(true);
  };

  // Jika sedang membuka Buku Bintang (Fase 3)
  if (isPassbookOpen) {
    return (
      <StarPassbookView 
        childName={profile.name}
        currentStars={profile.currentStars}
        totalCollected={profile.totalCollected}
        totalRedeemed={profile.totalRedeemed}
        transactions={transactions}
        onBack={() => setIsPassbookOpen(false)}
      />
    );
  }

  // Jika Mode Orang Tua aktif (Fase 5)
  if (isParentModeActive) {
    return (
      <ParentDashboardView 
        childName={profile.name}
        childAge={profile.age}
        currentStars={profile.currentStars}
        quests={quests}
        rewards={rewards}
        onApproveQuest={handleApproveQuest}
        onRejectQuest={handleRejectQuest}
        onAddQuest={handleAddQuest}
        onDeleteQuest={handleDeleteQuest}
        onAddReward={handleAddReward}
        onDeleteReward={handleDeleteReward}
        onExitParentMode={() => setIsParentModeActive(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Banner status koneksi Supabase (Hanya muncul jika belum terkoneksi Supabase) */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-100 text-amber-900 px-3 py-1 text-[11px] font-bold text-center border-b border-amber-300 flex items-center justify-center gap-1 font-display">
          <span>⚡ Local Mode (Supabase siap disambungkan melalui .env.local)</span>
        </div>
      )}

      {/* Objek 1.1: Header & Avatar Anak */}
      <Header 
        childName={profile.name}
        childAge={profile.age}
        stars={profile.currentStars}
        avatarUrl={profile.avatarUrl}
        onParentModeClick={handleParentModeClick}
        onStarClick={handleStarClick}
      />

      {/* Main Content Stream */}
      <main className="flex-1 px-4 pt-3 flex flex-col gap-4">
        {activeTab === 'misi' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 landscape:grid-cols-12 gap-5 items-start">
            {/* Kolom Kiri: Hero Progress Card (Sticky di Landscape / Desktop) */}
            <div className="md:col-span-5 landscape:col-span-5 md:sticky md:top-20 landscape:sticky landscape:top-20 flex flex-col gap-4">
              {/* Objek 1.2: Toples Bintang & Progress Banner (Hero Bento Card) */}
              <HeroProgressCard 
                completedCount={completedCount}
                totalCount={totalCount}
              />

              {/* Landscape / Desktop Quick Action: Tabungan Bintang */}
              <div className="hidden md:flex landscape:flex bg-surface-container-lowest rounded-2xl p-4 border-2 border-surface-variant shadow-xs flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cream-cloud border border-sunny-gold flex items-center justify-center text-sunny-gold shadow-xs">
                      <span className="material-symbols-outlined text-2xl material-symbols-fill">
                        savings
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold text-on-surface">Tabungan Bintang {profile.name}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium">Lihat catatan keluar masuk bintang</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleStarClick}
                    type="button"
                    className="tactile-btn bg-cream-cloud border-2 border-sunny-gold text-primary font-display font-bold text-xs px-3 py-1.5 rounded-xl hover:bg-sunny-gold hover:text-on-surface transition-all active:translate-y-0.5 cursor-pointer shadow-xs"
                  >
                    Buka Buku ★
                  </button>
                </div>
                
                <div className="pt-2 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Total Bintang Dikumpulkan:</span>
                  <span className="font-display font-bold text-primary flex items-center gap-1">
                    <span>{profile.totalCollected}</span>
                    <span className="text-sunny-gold font-black">★</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Daftar Kartu Quest Harian */}
            <div className="md:col-span-7 landscape:col-span-7 flex flex-col gap-3">
              <QuestSection 
                childName={profile.name}
                quests={quests}
                onMarkDone={handleMarkDone}
              />
            </div>
          </div>
        ) : (
          /* Objek 2.1: Toko Hadiah Anak */
          <RewardShopView 
            childName={profile.name}
            stars={profile.currentStars}
            rewards={rewards}
            onRedeemClick={handleRedeemClick}
          />
        )}
      </main>

      {/* Objek 2.2: Modal Konfirmasi Tukar Hadiah */}
      <RewardRedeemModal 
        isOpen={isRedeemModalOpen}
        reward={selectedReward}
        childName={profile.name}
        currentStars={profile.currentStars}
        onClose={() => setIsRedeemModalOpen(false)}
        onConfirmRedeem={handleConfirmRedeem}
      />

      {/* Objek 2.3: Layar Selebrasi Sukses Tukar Hadiah */}
      <CelebrationModal 
        isOpen={isCelebrationOpen}
        reward={celebrationReward}
        childName={profile.name}
        previousStars={previousStarsBeforeRedeem}
        onClose={() => setIsCelebrationOpen(false)}
        onShowToParents={() => {
          setIsCelebrationOpen(false);
          setIsPassbookOpen(true);
        }}
      />

      {/* Objek 4.1: Modal PIN Mode Orang Tua */}
      <ParentPinModal 
        isOpen={isPinModalOpen}
        childName={profile.name}
        correctPin={profile.parentPin || '1234'}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handlePinSuccess}
      />

      {/* Objek 1.4: Bottom Navigation Bar */}
      <BottomNavBar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}
