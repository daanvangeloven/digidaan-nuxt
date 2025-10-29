<script setup lang="ts">
import { useModalStore } from '@/composables/useModals';

const { openModal } = useModalStore();
</script>

<template>
  <div class="p-5 mb-5 flex flex-col gap-5 overflow-y-auto max-w-[70vw] max-md:max-w-full">
    <img src="/img/projects/pbma/pbma.png" class="flex self-center w-[80%] h-auto max-md:w-full">
    <h1 class="text-2xl font-bold">
      PBMA
    </h1>
    <p class="text-sm">
      <a
        href="http://pbmadvies.com"
        target="_blank"
      >PBMA</a>
      is a Soil and Environmental Advisory agency. I had previously developed
      the
      <a
        class="cursor-pointer underline"
        @click="openModal('wimereux')"
      >Wimereux website</a>
      for the same client. Because of his positive experience with me, he
      requested me to develop a website for his new company as well. After some
      iterations we landed on the current design.
    </p>
  </div>
</template>
