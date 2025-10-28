<script setup lang="ts">
const counter = ref(1)

onMounted(() => {
  setInterval(() => {
    counter.value++
    if (counter.value === 15) {
      counter.value = 0
    }
  }, 300)
})
</script>

<template>
  <div class="absolute top-[70%] left-[calc(50%-150px)] w-[300px] h-[34px] bg-w95-gray z-[1000] flex flex-row items-center gap-0.5 border-t-2 border-l-2 border-r-2 border-b-2 border-t-w95-border-light border-l-w95-border-light border-r-w95-border-dark border-b-w95-border-dark overflow-hidden">
    <span v-for="n in counter" :key="n" class="loading-block w-5 h-7 bg-w95-blue z-[1000] animate-[loading_2s_infinite]" />
  </div>
</template>
