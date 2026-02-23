<script setup lang="ts">
useSeoMeta({ robots: 'noindex, nofollow' });

const navigation = [
  { name: 'Overview', path: '/showcase' },
  { name: 'Buttons', path: '/showcase/buttons' },
  { name: 'Borders', path: '/showcase/borders' },
  { name: 'Colors', path: '/showcase/colors' },
];
</script>

<template>
  <div class="min-h-screen bg-w95-teal">
    <!-- Header -->
    <div class="bg-w95-gray border-b-2 border-w95-border-dark">
      <div class="max-w-6xl mx-auto px-8 py-4">
        <h1 class="text-2xl font-bold font-w95">
          Component Showcase
        </h1>
        <p class="text-sm text-w95-dark-gray">
          Component library preview
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="bg-w95-gray border-b-2 border-w95-border-dark">
      <div class="max-w-6xl mx-auto px-8">
        <nav class="flex gap-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 font-w95 text-sm hover:bg-w95-border-light"
            active-class="w95-border-inverse bg-white"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto p-8">
      <slot />
    </div>
  </div>
</template>
