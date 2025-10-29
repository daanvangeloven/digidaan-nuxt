<script setup lang="ts">
definePageMeta({
  layout: 'showcase',
});

const buttonVariants = ['raised', 'ghost', 'active'] as const;
const buttonSizes = ['sm', 'md', 'lg'] as const;
</script>

<template>
  <div>
    <section class="bg-w95-gray p-6 w95-button-border mb-6">
      <h2 class="text-2xl font-bold mb-4 font-w95">
        W95Button Component
      </h2>

      <!-- Variants -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">
          Variants
        </h3>
        <div class="flex gap-4 flex-wrap">
          <W95Button
            v-for="variant in buttonVariants"
            :key="variant"
            :variant="variant"
          >
            {{ variant }}
          </W95Button>
        </div>
      </div>

      <!-- Sizes -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">
          Sizes
        </h3>
        <div class="flex gap-4 items-center flex-wrap">
          <W95Button
            v-for="size in buttonSizes"
            :key="size"
            :size="size"
          >
            {{ size }}
          </W95Button>
        </div>
      </div>

      <!-- With Icons -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">
          With Icons
        </h3>
        <div class="flex gap-4 flex-wrap">
          <W95Button
            icon="/img/icons/profile.png"
            size="sm"
          >
            Profile
          </W95Button>
          <W95Button
            icon="/img/icons/projects.png"
            size="md"
          >
            Projects
          </W95Button>
          <W95Button
            icon="/img/icons/experience.png"
            size="lg"
          >
            Experience
          </W95Button>
        </div>
      </div>

      <!-- Disabled State -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">
          Disabled
        </h3>
        <div class="flex gap-4 flex-wrap">
          <W95Button :disabled="true">
            Disabled
          </W95Button>
          <W95Button
            :disabled="true"
            variant="active"
          >
            Disabled Active
          </W95Button>
        </div>
      </div>

      <!-- Custom Classes -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">
          Custom Classes
        </h3>
        <div class="flex gap-4 flex-wrap">
          <W95Button class="w-48">
            Full Width (w-48)
          </W95Button>
          <W95Button class="px-8">
            Extra Padding
          </W95Button>
        </div>
      </div>
    </section>

    <!-- Usage Code -->
    <section class="bg-w95-gray p-6 w95-button-border">
      <h3 class="text-lg font-bold mb-2">
        Usage
      </h3>
      <pre class="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto"><code>&lt;W95Button&gt;Click me&lt;/W95Button&gt;

&lt;W95Button variant="ghost" size="lg"&gt;Ghost Large&lt;/W95Button&gt;

&lt;W95Button icon="/img/icon.png"&gt;With Icon&lt;/W95Button&gt;

&lt;W95Button :disabled="true"&gt;Disabled&lt;/W95Button&gt;</code></pre>
    </section>
  </div>
</template>
