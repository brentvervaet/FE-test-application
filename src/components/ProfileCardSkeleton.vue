<template>
  <div class="card glassmorphism card-hover p-4">
    <div class="d-flex align-items-center">
      <!-- Avatar skeleton -->
      <div class="avatar-container me-3">
        <div class="skeleton rounded-circle" style="width: 80px; height: 80px;"></div>
      </div>

      <!-- Profile info skeleton -->
      <div class="flex-grow-1">
        <div class="skeleton mb-2" style="height: 24px; width: 60%;"></div>
        <div class="skeleton mb-2" style="height: 18px; width: 40%;"></div>
        <div class="skeleton" style="height: 18px; width: 50%;"></div>
      </div>

      <!-- Level badge skeleton -->
      <div class="ms-3">
        <div class="skeleton rounded-pill" style="width: 60px; height: 32px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for skeleton component
</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.05) 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite;
  border-radius: 4px;
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
