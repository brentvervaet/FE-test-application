<template>
  <div class="card glassmorphism card-hover p-4">
    <!-- Title skeleton -->
    <div class="skeleton mb-4" style="height: 32px; width: 60%;"></div>

    <!-- Achievement grid skeleton -->
    <div class="row g-3">
      <div v-for="i in 6" :key="i" class="col-md-6 col-lg-4">
        <div class="achievement-card p-3 rounded">
          <!-- Icon skeleton -->
          <div class="text-center mb-3">
            <div class="skeleton rounded-circle" style="width: 48px; height: 48px; margin: 0 auto;"></div>
          </div>

          <!-- Title skeleton -->
          <div class="skeleton mb-2" style="height: 20px; width: 80%;"></div>

          <!-- Description skeleton -->
          <div class="skeleton mb-2" style="height: 16px; width: 100%;"></div>
          <div class="skeleton" style="height: 16px; width: 70%;"></div>
        </div>
      </div>
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
