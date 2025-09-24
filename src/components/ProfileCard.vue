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
        loading="lazy"
        decoding="async"
        sizes="(max-width: 576px) 72px, (max-width: 992px) 88px, 96px"
      />
    </div>

    <!-- User info -->
    <h2 class="h5 mb-1">{{ user?.name }}</h2>
    <div class="mt-2">
      <span class="badge rounded-pill level-badge">
        <i class="bi bi-shield-fill-check me-1"></i>
        Level {{ user?.level ?? 1 }}
      </span>
    </div>

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

defineProps<{ user: UserProfile | null }>();
</script>

<style scoped>
.card { margin-bottom: 1.5rem; }
.level-badge {
  background: var(--brand-gradient);
  color: #fff;
  border: none;
  padding: 0.5rem 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2px;
}
</style>
