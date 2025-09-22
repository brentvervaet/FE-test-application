<template>
  <div class="card glassmorphism card-hover p-4">
    <div class="text-center">
      <!-- Level title skeleton -->
      <div class="skeleton mb-3" style="height: 28px; width: 70%; margin: 0 auto;"></div>

      <!-- XP display skeleton -->
      <div class="skeleton mb-3" style="height: 32px; width: 50%; margin: 0 auto;"></div>

      <!-- Progress bar skeleton -->
      <div class="progress-bar-custom mb-3">
        <div class="skeleton" style="height: 100%; width: 65%;"></div>
      </div>

      <!-- Progress text skeleton -->
      <div class="skeleton" style="height: 18px; width: 40%; margin: 0 auto;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for skeleton component
</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
