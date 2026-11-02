import React from 'react';
import QuestCard from './QuestCard';

/**
 * Objek 1.3 — QuestSection (Section Header + Daftar Quest Cards)
 */
export default function QuestSection({ 
  childName = 'Bima', 
  quests = [], 
  onMarkDone 
}) {
  return (
    <section className="flex flex-col gap-3">
      {/* Header Bagian Misi */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container material-symbols-fill text-2xl">
            task_alt
          </span>
          <h3 className="font-display text-lg text-on-surface font-bold">
            Misi Harian {childName}
          </h3>
        </div>
        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full font-display">
          Usia 3-6 Tahun
        </span>
      </div>

      {/* Stream Kartu-Kartu Quest */}
      <div className="flex flex-col gap-3">
        {quests.map((quest) => (
          <QuestCard 
            key={quest.id} 
            quest={quest} 
            onMarkDone={onMarkDone} 
          />
        ))}
      </div>
    </section>
  );
}

