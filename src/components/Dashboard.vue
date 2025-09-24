<template>
  <div class="dashboard-container container">
    <div class="d-flex align-items-center justify-content-between mb-4">
  <h1 class="h3 m-0 brand-gradient-text">Gamified Dashboard</h1>
      <button v-if="error" class="retry-btn" @click="loadAllData">Retry</button>
    </div>

    <div v-if="isLoading" class="fade-in">
      <div class="mb-3"><ProfileCardSkeleton /></div>
      <div class="mb-3"><LevelProgressSkeleton /></div>
      <AchievementListSkeleton />
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon bi-exclamation-triangle"></div>
      <p class="mb-3">{{ error }}</p>
      <button class="retry-btn" @click="loadAllData">Try Again</button>
    </div>

    <div v-else class="dashboard-content fade-in">
      <div class="row g-4">
        <div class="col-12 col-lg-4">
          <ProfileCard :user="userProfile" />
        </div>
        <div class="col-12 col-lg-8">
          <LevelProgress
            :user="userProfile"
            :xpProgress="xpProgress"
            :loading="isAddingXP"
            @gain-xp="gainXP"
          />
        </div>
        <div class="col-12">
          <AchievementList :achievements="achievements" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import ProfileCard from './ProfileCard.vue';
import LevelProgress from './LevelProgress.vue';
import AchievementList from './AchievementList.vue';
import ProfileCardSkeleton from './ProfileCardSkeleton.vue';
import LevelProgressSkeleton from './LevelProgressSkeleton.vue';
import AchievementListSkeleton from './AchievementListSkeleton.vue';

const userStore = useUserStore();
const { userProfile, achievements, isLoading, isAddingXP, error, xpProgress } = storeToRefs(userStore);
const { gainXP, loadAllData } = userStore;

onMounted(() => {
  loadAllData();
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
