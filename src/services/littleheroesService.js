import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockProfile, initialQuests, initialRewards, initialTransactions } from '../data/mockData';

// Kunci LocalStorage untuk fallback
const STORAGE_KEYS = {
  PROFILE: 'littleheroes_profile_v1',
  QUESTS: 'littleheroes_quests_v1',
  REWARDS: 'littleheroes_rewards_v1',
  TRANSACTIONS: 'littleheroes_transactions_v1',
};

// Helper LocalStorage
function getLocal(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

export const littleheroesService = {
  // ================= PROFIL =================
  async getProfile() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', 'child_bima_001')
          .single();
        if (!error && data) {
          return {
            id: data.id,
            name: data.name,
            age: data.age,
            avatarUrl: data.avatar_url,
            currentStars: data.current_stars,
            totalCollected: data.total_collected,
            totalRedeemed: data.total_redeemed,
            parentPin: data.parent_pin,
          };
        }
      } catch (err) {
        console.warn('Supabase fetch profile failed, using local:', err);
      }
    }
    return getLocal(STORAGE_KEYS.PROFILE, mockProfile);
  },

  async updateProfileStars(currentStars, totalCollected, totalRedeemed) {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('profiles')
          .update({
            current_stars: currentStars,
            total_collected: totalCollected,
            total_redeemed: totalRedeemed,
          })
          .eq('id', 'child_bima_001');
      } catch (err) {
        console.warn('Supabase update stars error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.PROFILE, mockProfile);
    const updated = { ...current, currentStars, totalCollected, totalRedeemed };
    setLocal(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  // ================= QUESTS =================
  async getQuests() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('quests')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((q) => ({
            id: q.id,
            title: q.title,
            subtitle: q.subtitle,
            category: q.category,
            icon: q.icon,
            iconBg: q.icon_bg,
            borderColor: q.border_color,
            iconColor: q.icon_color,
            stars: q.stars,
            status: q.status,
            assignedDate: q.assigned_date,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch quests error:', err);
      }
    }
    return getLocal(STORAGE_KEYS.QUESTS, initialQuests);
  },

  async updateQuestStatus(questId, status) {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('quests')
          .update({ status })
          .eq('id', questId);
      } catch (err) {
        console.warn('Supabase update quest error:', err);
      }
    }
  },

  async addQuest(quest) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('quests').insert([{
          id: quest.id,
          child_id: 'child_bima_001',
          title: quest.title,
          subtitle: quest.subtitle,
          category: quest.category,
          icon: quest.icon,
          icon_bg: quest.iconBg,
          border_color: quest.borderColor,
          icon_color: quest.iconColor,
          stars: quest.stars,
          status: quest.status,
          assigned_date: quest.assignedDate,
        }]);
      } catch (err) {
        console.warn('Supabase insert quest error:', err);
      }
    }
  },

  async deleteQuest(questId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('quests').delete().eq('id', questId);
      } catch (err) {
        console.warn('Supabase delete quest error:', err);
      }
    }
  },

  // ================= REWARDS =================
  async getRewards() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('rewards')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((r) => ({
            id: r.id,
            name: r.name,
            category: r.category,
            starCost: r.star_cost,
            imageUrl: r.image_url,
            description: r.description,
            status: r.status,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch rewards error:', err);
      }
    }
    return getLocal(STORAGE_KEYS.REWARDS, initialRewards);
  },

  async addReward(reward) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('rewards').insert([{
          id: reward.id,
          child_id: 'child_bima_001',
          name: reward.name,
          category: reward.category,
          star_cost: reward.starCost,
          image_url: reward.imageUrl,
          description: reward.description,
        }]);
      } catch (err) {
        console.warn('Supabase insert reward error:', err);
      }
    }
  },

  async deleteReward(rewardId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('rewards').delete().eq('id', rewardId);
      } catch (err) {
        console.warn('Supabase delete reward error:', err);
      }
    }
  },

  // ================= TRANSACTIONS =================
  async getTransactions() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map((t) => ({
            id: t.id,
            type: t.type,
            stars: t.stars,
            title: t.title,
            category: t.category,
            emoji: t.emoji,
            bgIcon: t.bg_icon,
            note: t.note,
            dateGroup: t.date_group,
            timestamp: t.created_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch tx error:', err);
      }
    }
    return getLocal(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  },

  async addTransaction(tx) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('transactions').insert([{
          id: tx.id,
          child_id: 'child_bima_001',
          type: tx.type,
          stars: tx.stars,
          title: tx.title,
          category: tx.category,
          emoji: tx.emoji,
          bg_icon: tx.bgIcon,
          note: tx.note,
          date_group: tx.dateGroup,
        }]);
      } catch (err) {
        console.warn('Supabase insert tx error:', err);
      }
    }
  },

  // ================= REALTIME LISTENER =================
  subscribeToChanges(onUpdate) {
    if (!isSupabaseConfigured || !supabase) return () => {};

    const channel = supabase
      .channel('littleheroes_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, onUpdate)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' }, onUpdate)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rewards' }, onUpdate)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, onUpdate)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  saveLocalAll(profile, quests, rewards, transactions) {
    setLocal(STORAGE_KEYS.PROFILE, profile);
    setLocal(STORAGE_KEYS.QUESTS, quests);
    setLocal(STORAGE_KEYS.REWARDS, rewards);
    setLocal(STORAGE_KEYS.TRANSACTIONS, transactions);
  }
};

// Aliases for compatibility
export const starquestService = littleheroesService;

