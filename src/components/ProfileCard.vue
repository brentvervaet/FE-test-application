<template>
  <div class="card glassmorphism card-hover p-4 text-center">
    <div class="avatar-container mb-3 position-relative">
      <img
        v-if="user"
        :src="user.avatar_url"
        :alt="user.name"
        class="rounded-circle"
        width="96"
        height="96"
      />
    </div>

    <!-- TODO: user info , no xp stats -->
    <h2 class="h5 mb-1">{{ user?.name }}</h2>
    <div class="level-text mt-2">Level {{ user?.level }}</div>

    <div v-if="user" class="profile-stats mt-3">
      <div class="stat-item">
        <small>Current XP</small>
        <div><strong>{{ user.current_xp }}</strong></div>
      </div>
      <div class="stat-item">
        <small>To Next Level</small>
        <div><strong>{{ user.xp_to_next_level }}</strong></div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import type { UserProfile } from '../api/mockData';

const props = defineProps<{ user: UserProfile | null }>();
</script>

<style scoped>
.card { margin-bottom: 1.5rem; }
</style>
