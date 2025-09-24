<template>
  <div class="dashboard-container container">
    <div class="d-flex align-items-center justify-content-between mb-4">
  <h1 class="h3 m-0 brand-gradient-text">Gamified Dashboard</h1>
      <button v-if="error" class="retry-btn" @click="loadAllData">Retry</button>
    </div>

    <div v-if="error" class="error-container">
      <div class="error-icon bi-exclamation-triangle"></div>
      <p class="mb-3">{{ error }}</p>
      <button class="retry-btn" @click="loadAllData">Try Again</button>
    </div>

    <div v-else class="dashboard-content fade-in">
      <div class="row g-4">
        <div class="col-12 col-lg-4">
          <template v-if="profileLoading">
            <ProfileCardSkeleton />
          </template>
          <template v-else>
            <ProfileCard :user="userProfile" />
          </template>
        </div>
        <div class="col-12 col-lg-8">
          <template v-if="profileLoading">
            <LevelProgressSkeleton />
          </template>
          <template v-else>
            <LevelProgress
              :user="userProfile"
              :xpProgress="xpProgress"
              :loading="isAddingXP"
              @gain-xp="gainXP"
            />
          </template>
        </div>
        <div class="col-12">
          <template v-if="achievementsLoading">
            <AchievementListSkeleton />
          </template>
          <template v-else>
            <AchievementList :achievements="achievements" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import AchievementList from './AchievementList.vue';
import AchievementListSkeleton from './AchievementListSkeleton.vue';
import LevelProgress from './LevelProgress.vue';
import LevelProgressSkeleton from './LevelProgressSkeleton.vue';
import ProfileCard from './ProfileCard.vue';
import ProfileCardSkeleton from './ProfileCardSkeleton.vue';

const userStore = useUserStore();
const { userProfile, achievements, profileLoading, achievementsLoading, isAddingXP, error, xpProgress } = storeToRefs(userStore);
const { gainXP, loadAllData, fetchProfile, fetchUserAchievements } = userStore;

onMounted(() => {
  // Load sections independently for better perceived performance
  fetchProfile();
  fetchUserAchievements();
});

</script>

<style scoped>
.dashboard-container {
  padding-top: 2rem;
}

.dashboard-content {
  margin-top: 1rem;
}
</style>
