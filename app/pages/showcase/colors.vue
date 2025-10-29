<script setup lang="ts">
definePageMeta({
  layout: 'showcase',
});

const colors = [
  { name: 'w95-teal', hex: '#008081', usage: 'Desktop background' },
  { name: 'w95-gray', hex: '#c0c0c0', usage: 'Panels, buttons, backgrounds' },
  { name: 'w95-blue', hex: '#000181', usage: 'Active window title bars' },
  { name: 'w95-dark-gray', hex: '#808080', usage: 'Disabled text, shadows' },
  { name: 'w95-border-light', hex: '#fcfcfc', usage: 'Light border edges' },
  { name: 'w95-border-dark', hex: '#08080e', usage: 'Dark border edges' },
];
</script>

<template>
  <div>
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h2 class="text-2xl font-bold mb-4 font-w95">
        Color Palette
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="color in colors"
          :key="color.name"
          class="w95-border p-4 bg-white"
        >
          <div
            class="h-20 w-full rounded mb-3 w95-border"
            :class="`bg-${color.name}`"
          />
          <h3 class="text-sm font-bold font-mono">
            {{ color.name }}
          </h3>
          <p class="text-xs text-w95-dark-gray mb-1">
            {{ color.hex }}
          </p>
          <p class="text-xs">
            {{ color.usage }}
          </p>
        </div>
      </div>
    </section>

    <!-- Usage Examples -->
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h3 class="text-lg font-bold mb-4">
        Usage Examples
      </h3>

      <div class="space-y-4">
        <div class="w95-border p-4 bg-w95-teal">
          <p class="text-sm text-white">
            Background with <code class="font-mono">bg-w95-teal</code>
          </p>
        </div>

        <div class="w95-border p-4 bg-w95-blue">
          <p class="text-sm text-white">
            Active title bar with <code class="font-mono">bg-w95-blue</code>
          </p>
        </div>

        <div class="w95-border p-4 bg-w95-gray">
          <p class="text-sm">
            Panel with <code class="font-mono">bg-w95-gray</code>
          </p>
        </div>

        <div class="w95-border p-4 bg-white">
          <p class="text-sm text-w95-dark-gray">
            Disabled text with <code class="font-mono">text-w95-dark-gray</code>
          </p>
        </div>
      </div>
    </section>

    <!-- Tailwind Config -->
    <section class="bg-w95-gray p-6 w95-button-border">
      <h3 class="text-lg font-bold mb-2">
        Configuration
      </h3>
      <pre class="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto"><code>// tailwind.config.js
theme: {
  extend: {
    colors: {
      w95: {
        'teal': '#008081',
        'gray': '#c0c0c0',
        'blue': '#000181',
        'dark-gray': '#808080',
        'border-light': '#fcfcfc',
        'border-dark': '#08080e',
      },
    },
  },
}</code></pre>
    </section>
  </div>
</template>
