import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Achievement, UserProfile } from '../api/mockData';
import { addXP, calculateLevel, calculateXPToNextLevel, fetchAchievements, fetchUserProfile } from '../api/mockData';


/**
 * User Store - TODO: Implement state management
 * TODO: Add proper documentation
 */
export const useUserStore = defineStore('user', () => {
  // State
  const userProfile = ref<UserProfile | null>(null);
  const achievements = ref<Achievement[]>([]);
  const profileLoading = ref(false);
  const achievementsLoading = ref(false);
  const isLoading = computed(() => profileLoading.value || achievementsLoading.value);
  const error = ref<string | null>(null);
  // Fine-grained loading state for XP action
  const isAddingXP = ref(false);

  // Computed
  const xpProgress = computed(() => {
    if (!userProfile.value) return 0;
    const earned = userProfile.value.current_xp % 100;
    return Math.min(Math.max(earned / 100, 0), 1);
  });

  const currentLevel = computed(() => userProfile.value?.level ?? 1);
  const totalXP = computed(() => userProfile.value?.current_xp ?? 0);

  // Actions
  const fetchProfile = async (suppressLoading = false) => {
    if (!suppressLoading) error.value = null;
    profileLoading.value = true;
    try {
      const raw = await fetchUserProfile();
      // Normalize derived fields to ensure consistency with XP
      const normalized: UserProfile = {
        ...raw,
        level: calculateLevel(raw.current_xp),
        xp_to_next_level: calculateXPToNextLevel(raw.current_xp),
      };
      userProfile.value = normalized;
      console.debug('[store] profile loaded', normalized);
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load profile';
      console.error('[store] profile error', e);
      throw e;
    } finally {
      profileLoading.value = false;
    }
  };

  const fetchUserAchievements = async (suppressLoading = false) => {
    if (!suppressLoading) error.value = null;
    achievementsLoading.value = true;
    try {
      achievements.value = await fetchAchievements();
      console.debug('[store] achievements loaded', achievements.value);
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load achievements';
      console.error('[store] achievements error', e);
      throw e;
    } finally {
      achievementsLoading.value = false;
    }
  };

  const loadAllData = async () => {
    error.value = null;
    const tasks = [fetchProfile(true), fetchUserAchievements(true)];
    const results = await Promise.allSettled(tasks);

    // Build a helpful error message listing the failed resources
    const labels = ['Profile', 'Achievements'];
    const failed: string[] = results
      .map((r, idx) => ({ r, label: labels[idx] }))
      .filter(x => x.r.status === 'rejected')
      .map(x => x.label);

    if (failed.length > 0) {
      const list = failed.join(' and ');
      error.value = `Failed to load: ${list}. Please check your connection and try again.`;
    }

    console.debug('[store] loadAllData results', results);
  };

  const gainXP = async (amount: number) => {
    isAddingXP.value = true;
    error.value = null;
    try {
      const res = await addXP(amount);
      if (userProfile.value) {
        userProfile.value.current_xp = res.newXP;
        // Recalculate derived fields based on new XP
        userProfile.value.level = calculateLevel(res.newXP);
        userProfile.value.xp_to_next_level = calculateXPToNextLevel(res.newXP);
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to add XP';
    } finally {
      isAddingXP.value = false;
    }
  };

  return {
    // state
    userProfile,
    achievements,
    isLoading,
    profileLoading,
    achievementsLoading,
    isAddingXP,
    error,
    // computed
    xpProgress,
    currentLevel,
    totalXP,
    // actions
    fetchProfile,
    fetchUserAchievements,
    gainXP,
    loadAllData,
  };
});
