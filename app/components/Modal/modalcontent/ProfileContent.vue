<script setup lang="ts">
import data from '@/assets/json/experience.json';

const skills = data.skills;
</script>

<template>
  <div class="p-5 flex flex-col gap-5">
    <div class="flex gap-5 items-center">
      <img
        src="/img/profile/portrait.png"
        alt="User"
        class="w-[100px] h-[100px]"
      >
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">
          Hello, I'm Daan van Geloven.
        </h1>
        <h3 class="text-lg font-bold">
          Front-end Developer
        </h3>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-base font-bold">
        Skills
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in skills"
          :key="skill.name"
          class="w95-button-border bg-w95-gray px-2 py-0.5 text-sm"
        >
          {{ skill.name }}
        </span>
      </div>
    </div>
  </div>
</template>
