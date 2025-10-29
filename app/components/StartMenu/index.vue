<script setup lang="ts">
import data from '@/assets/json/screens.json';
import { useModalStore } from '@/composables/useModals';

const { openModal } = useModalStore();

function itemClick(modalId: any) {
  openModal(modalId);
}

const screens = data.screens.filter(
  screen => screen.onStartMenu === true,
);
</script>

<template>
  <div class="bg-w95-gray absolute bottom-[34px] left-0 flex border-2 w-[350px] h-[270px] select-none border-t-w95-border-light border-l-w95-border-light border-b-w95-border-dark border-r-w95-border-dark">
    <div class="flex bg-w95-dark-gray text-w95-gray text-base p-2 pt-2 pb-0 pl-4 [writing-mode:vertical-rl] rotate-180 font-bold text-start">
      Digidaan DaanOS <span class="text-white">'02</span>
    </div>
    <div class="flex flex-col w-full">
      <div
        v-for="item in screens"
        :key="item.id"
        class="text-sm flex align-middle items-center text-start p-1 flex-grow cursor-pointer hover:bg-w95-blue hover:text-white"
        @click="itemClick(item.id)"
      >
        <img
          :src="`/img/icons/${item.icon}`"
          class="w-5 h-5 mr-1.5"
        >

        {{ item.title }}
      </div>
    </div>
  </div>
</template>
