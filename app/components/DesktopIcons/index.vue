<script setup lang="ts">
import data from '@/assets/json/screens.json'
import { useModalStore } from '@/composables/useModals'

const { openModal } = useModalStore()

const screens = data.screens.filter(screen => screen.onDesktop === true)

function itemClick(modalId: string) {
  openModal(modalId)
}
</script>

<template>
  <div class="absolute top-2.5 left-[5px] flex flex-col flex-wrap text-[13px] gap-4 text-white select-none max-[600px]:top-[5px] max-[600px]:left-[5px] max-[600px]:gap-2.5 max-[600px]:text-[11px]">
    <div
      v-for="item in screens"
      :key="item.id"
      class="flex flex-col items-center cursor-pointer"
      @click="itemClick(item.id)"
    >
      <img
        :src="`/img/icons/${item.icon}`"
        alt="icon"
        class="w-8 h-8 flex max-[600px]:w-6 max-[600px]:h-6"
      >
      <span>{{ item.title }} </span>
    </div>
  </div>
</template>
