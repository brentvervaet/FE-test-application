<template>
  <div class="card glassmorphism card-hover p-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h5 m-0 d-flex align-items-center">
        <i class="bi-trophy-fill text-warning me-2"></i>
        Achievements
      </h2>
      <small class="text-muted">{{ unlockedCount }} / {{ totalCount }} unlocked</small>
    </div>

    <div class="row g-3">
      <div
        v-for="ach in achievements"
        :key="ach.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div
          class="achievement-card p-3 rounded h-100"
          :class="[{ 'locked': !ach.unlocked_at, 'unlocked': !!ach.unlocked_at }]"
        >
          <div class="d-flex align-items-start">
            <div class="me-3 text-center">
              <i
                :class="['bi', ach.icon_url, 'fs-2', ach.unlocked_at ? 'text-warning' : 'text-muted']"
                aria-hidden="true"
              ></i>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <h3 class="h6 mb-1">{{ ach.title }}</h3>
                <span class="badge xp-badge">+{{ ach.xp_reward }} XP</span>
              </div>
              <p class="text-muted small mb-2">{{ ach.description }}</p>
              <div class="small status" :class="ach.unlocked_at ? 'text-success' : 'text-muted'">
                <i :class="['bi', ach.unlocked_at ? 'bi-unlock' : 'bi-lock']" class="me-1" aria-hidden="true"></i>
                <span>
                  {{ ach.unlocked_at ? `Unlocked ${formatDate(ach.unlocked_at)}` : 'Locked' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Achievement } from '../api/mockData';

const props = defineProps<{ achievements: Achievement[] }>();

const totalCount = computed(() => props.achievements.length);
const unlockedCount = computed(() => props.achievements.filter(a => !!a.unlocked_at).length);

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
}

.xp-badge {
  background: rgba(6, 182, 212, 0.12);
  color: var(--accent-teal);
  border: 1px solid rgba(6, 182, 212, 0.2);
  font-weight: 700;
}

.achievement-card.locked {
  opacity: 0.75;
  filter: grayscale(12%);
}
.achievement-card.unlocked {
  position: relative;
}
.achievement-card.unlocked::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 12px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}
.achievement-card.unlocked:hover::after {
  transform: translateX(100%);
}

.status { transition: color 0.2s ease; }
</style>
