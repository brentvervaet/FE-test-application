<template>
  <div class="card glassmorphism card-hover p-4" aria-live="polite">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="text-muted small">Progress to next level</span>
      <span class="xp-emphasis"><i class="bi bi-gem me-1"></i>{{ currentXP }} XP</span>
    </div>

    <div
      ref="pillEl"
      :class="['level-progress-pill', 'mb-2', { 'level-pop': pop }]"
      role="progressbar"
      :aria-valuenow="progressPercent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuetext="`Level ${level} at ${progressPercent}% towards next level`"
    >
  <div class="level-progress-fill" :style="{ width: progressPercent + '%' }" />
      <div class="level-progress-label">
        <i class="bi bi-stars me-2"></i>
        <span>Level {{ level }} • {{ progressPercent }}%</span>
      </div>
    </div>

    <div class="text-center mt-3">
      <div class="xp-text">{{ formattedXP }} XP</div>
      <small class="text-muted">Total XP</small>
    </div>

    <div class="text-end mt-2">
      <button class="btn btn-primary-custom" :disabled="loading" @click="handleGainXP">
        <span v-if="loading" class="d-inline-flex align-items-center">
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Adding XP...
        </span>
        <span v-else class="d-inline-flex align-items-center">
          <i class="bi bi-lightning-charge-fill me-1"></i>
          Gain 50 XP
        </span>
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import confetti from 'canvas-confetti';
import type { UserProfile } from '../api/mockData';

const props = defineProps<{
  user: UserProfile | null,
  xpProgress: number,
  loading?: boolean
}>();

const emit = defineEmits<{
  (e: 'gain-xp', amount: number): void
}>();

const currentXP = computed(() => props.user?.current_xp ?? 0);
const xpToNext = computed(() => props.user?.xp_to_next_level ?? 100);
const level = computed(() => props.user?.level ?? 1);
const progressPercent = computed(() => {
  const pct = Math.round(Math.max(0, Math.min(1, props.xpProgress)) * 100);
  return isNaN(pct) ? 0 : pct;
});

// Add a subtle pop animation on level up transitions + confetti
const pop = ref(false);
const pillEl = ref<HTMLElement | null>(null);

function fireConfetti() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    const rect = pillEl.value?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.25;

    // Two quick bursts for a nice effect
    confetti({ particleCount: 60, spread: 60, startVelocity: 45, origin: { x, y }, scalar: 0.9 });
    confetti({ particleCount: 40, spread: 100, origin: { x, y: Math.max(0, y - 0.05) }, scalar: 0.8 });
  } catch (e) {
    // fail safe: ignore confetti errors in demo
    console.debug('[confetti] skipped', e);
  }
}

watch(() => level.value, (newLevel, oldLevel) => {
  if (oldLevel !== undefined && newLevel > oldLevel) {
    fireConfetti();
  }
  pop.value = true;
  setTimeout(() => (pop.value = false), 400);
});

const formattedXP = computed(() => currentXP.value.toLocaleString());

function handleGainXP() {
  emit('gain-xp', 50); // Example: gain 50 XP per click
}
</script>

<style scoped>
.card { margin-bottom: 1.5rem; }

.xp-emphasis {
  color: var(--accent-teal);
  font-weight: 800;
}

.level-progress-pill {
  position: relative;
  height: 44px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(6, 182, 212, 0.22));
  border: 1px solid var(--card-border);
  overflow: hidden;
  box-shadow: 0 2px 6px var(--shadow-light) inset, 0 1px 2px var(--shadow-light);
}

.level-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-teal));
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.level-progress-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,0.35);
}

.level-pop { animation: levelPop 0.4s ease-out; }
@keyframes levelPop {
  0% { transform: scale(1); box-shadow: 0 2px 6px var(--shadow-light) inset, 0 1px 2px var(--shadow-light); }
  50% { transform: scale(1.03); box-shadow: 0 4px 12px var(--shadow-medium) inset, 0 2px 6px var(--shadow-medium); }
  100% { transform: scale(1); box-shadow: 0 2px 6px var(--shadow-light) inset, 0 1px 2px var(--shadow-light); }
}
</style>
