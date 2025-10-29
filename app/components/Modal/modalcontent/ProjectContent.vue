<script setup lang="ts">
import data from '@/assets/json/projects.json'
import { useModalStore } from '@/composables/useModals'

const { openModal } = useModalStore()
const searchInput = ref('')

const projects = computed(() => {
  if (searchInput.value === '') {
    return data.projects
  }
  else {
    return data.projects.filter(project =>
      project.title.toLowerCase().includes(searchInput.value.toLowerCase()),
    )
  }
})

function itemClick(modalId: string) {
  openModal(modalId)
}
</script>

<template>
  <div class="p-2 pt-0 select-none">
    <div class="flex gap-[5px] pt-0.5 pb-[5px]">
      <span class="text-[10px] mr-1.5">File</span>
      <span class="text-[10px] mr-1.5">Edit</span>
      <span class="text-[10px] mr-1.5">View</span>
      <span class="text-[10px] mr-1.5">Help</span>
    </div>
    <div class="flex gap-[5px]">
      <input
        :value="searchInput"
        class="w95-border font-w95 text-[10px] focus:outline-none"
        type="text"
        placeholder="Search"
        @input="event => searchInput = (event.target as HTMLInputElement)?.value"
      >
    </div>
    <div class="flex flex-row flex-wrap gap-2.5 p-5 min-w-[400px] max-w-[500px] overflow-y-auto items-center bg-white mt-2.5 max-[600px]:min-w-[300px] max-[600px]:max-w-[400px]">
      <div
        v-for="project in projects"
        :key="project.id"
        class="flex flex-col items-center gap-[5px] p-2.5 w-[30%] cursor-pointer max-[600px]:w-[40%]"
        @click="itemClick(project.id)"
      >
        <img :src="`/img/icons/${project.image}`" class="w-[30px] h-[30px]">
        <span class="text-xs">{{ project.title }}</span>
      </div>
    </div>
  </div>
</template>
