<script setup lang="ts">
definePageMeta({
  layout: 'showcase',
});
</script>

<template>
  <div>
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h2 class="text-2xl font-bold mb-4 font-w95">
        Border Utilities
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 class="text-sm font-bold mb-2">
            .w95-button-border
          </h3>
          <p class="text-xs text-w95-dark-gray mb-2">
            Raised/button style with 2px borders
          </p>
          <div class="w95-button-border p-4 bg-w95-gray">
            Content with raised border
          </div>
        </div>

        <div>
          <h3 class="text-sm font-bold mb-2">
            .w95-border
          </h3>
          <p class="text-xs text-w95-dark-gray mb-2">
            Inset/panel style with 1px borders
          </p>
          <div class="w95-border p-4 bg-w95-gray">
            Content with inset border
          </div>
        </div>

        <div>
          <h3 class="text-sm font-bold mb-2">
            .w95-border-inverse
          </h3>
          <p class="text-xs text-w95-dark-gray mb-2">
            Inverse inset style with 1px borders
          </p>
          <div class="w95-border-inverse p-4 bg-w95-gray">
            Content with inverse border
          </div>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h3 class="text-lg font-bold mb-4">
        Real-world Examples
      </h3>

      <div class="space-y-4">
        <!-- Panel example -->
        <div>
          <h4 class="text-sm font-bold mb-2">
            Panel Container
          </h4>
          <div class="w95-border p-4 bg-white">
            <p class="text-sm">
              This is a typical panel container used for grouping related content.
            </p>
          </div>
        </div>

        <!-- Button example -->
        <div>
          <h4 class="text-sm font-bold mb-2">
            Button Style
          </h4>
          <div class="inline-block w95-button-border px-4 py-2 bg-w95-gray cursor-pointer">
            Click me
          </div>
        </div>

        <!-- Input example -->
        <div>
          <h4 class="text-sm font-bold mb-2">
            Input Field
          </h4>
          <input
            type="text"
            class="w95-border px-2 py-1 bg-white"
            placeholder="Enter text..."
          >
        </div>
      </div>
    </section>

    <!-- CSS Code -->
    <section class="bg-w95-gray p-6 w95-button-border">
      <h3 class="text-lg font-bold mb-2">
        Implementation
      </h3>
      <pre class="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto"><code>// tailwind.config.js
plugins: [
  function ({ addUtilities }) {
    const newUtilities = {
      '.w95-button-border': {
        borderTop: '2px solid #fcfcfc',
        borderLeft: '2px solid #fcfcfc',
        borderBottom: '2px solid #08080e',
        borderRight: '2px solid #08080e',
      },
      '.w95-border': {
        borderTop: '1px solid #fcfcfc',
        borderLeft: '1px solid #fcfcfc',
        borderBottom: '1px solid #08080e',
        borderRight: '1px solid #08080e',
      },
      '.w95-border-inverse': {
        borderTop: '1px solid #08080e',
        borderLeft: '1px solid #08080e',
        borderBottom: '1px solid #fcfcfc',
        borderRight: '1px solid #fcfcfc',
      },
    }
    addUtilities(newUtilities)
  },
]</code></pre>
    </section>
  </div>
</template>
