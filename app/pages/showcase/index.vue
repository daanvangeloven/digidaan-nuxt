<script setup lang="ts">
definePageMeta({
  layout: 'showcase',
});

const sections = [
  {
    title: 'Buttons',
    description: 'W95Button component with variants, sizes, and icons',
    path: '/showcase/buttons',
  },
  {
    title: 'Borders',
    description: 'Border utilities for raised, inset, and flat styles',
    path: '/showcase/borders',
  },
  {
    title: 'Colors',
    description: 'Windows 95 color palette and usage',
    path: '/showcase/colors',
  },
];
</script>

<template>
  <div>
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h2 class="text-2xl font-bold mb-2 font-w95">
        Welcome
      </h2>
      <p class="text-sm text-w95-dark-gray">
        Browse the Windows 95 inspired component library. Click on a section below to explore.
      </p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="section in sections"
        :key="section.path"
        :to="section.path"
        class="bg-w95-gray p-6 w95-button-border hover:w95-border-inverse transition-all block"
      >
        <h3 class="text-xl font-bold mb-2 font-w95">
          {{ section.title }}
        </h3>
        <p class="text-sm text-w95-dark-gray">
          {{ section.description }}
        </p>
      </NuxtLink>
    </div>

    <!-- Quick Stats -->
    <section class="bg-w95-gray p-6 w95-button-border mt-6">
      <h3 class="text-lg font-bold mb-4 font-w95">
        Component Library Stats
      </h3>
      <div class="grid grid-cols-3 md:grid-cols-3 gap-4 text-center">
        <div class="w95-border p-4 bg-white">
          <div class="text-2xl font-bold text-w95-blue">
            1
          </div>
          <div class="text-xs text-w95-dark-gray">
            Components
          </div>
        </div>
        <div class="w95-border p-4 bg-white">
          <div class="text-2xl font-bold text-w95-blue">
            3
          </div>
          <div class="text-xs text-w95-dark-gray">
            Border Utilities
          </div>
        </div>
        <div class="w95-border p-4 bg-white">
          <div class="text-2xl font-bold text-w95-blue">
            6
          </div>
          <div class="text-xs text-w95-dark-gray">
            Colors
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
