<script setup lang="ts">
import data from '@/assets/json/experience.json';

const experience = data.experience;
</script>

<template>
  <div class="flex flex-col gap-5 p-5 mb-5 w-full overflow-y-auto items-center">
    <h1 class="text-5xl font-bold max-[600px]:text-3xl">
      Experience
    </h1>
    <div class="flex flex-col gap-5 w-[85%] border-l border-r border-t border-b border-l-w95-border-light border-r-w95-border-dark border-t-w95-border-light border-b-w95-border-dark max-[600px]:w-full">
      <div
        v-for="(job, index) in experience"
        :key="index"
        class="flex flex-col gap-2 p-2 border-b border-b-w95-border-light"
      >
        <h2 class="text-xl font-bold">
          {{ job.title }}
        </h2>
        <h3 class="text-base font-bold">
          {{ job.company }}
        </h3>
        <p>{{ job.date }}</p>
        <p>{{ job.description }}</p>
      </div>
    </div>
  </div>
</template>
