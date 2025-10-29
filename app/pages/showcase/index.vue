<script setup lang="ts">
const buttonVariants = ['raised', 'flat', 'active'] as const;
const buttonSizes = ['sm', 'md', 'lg'] as const;
</script>

<template>
  <div class="min-h-screen bg-w95-teal p-8">
    <div class="max-w-6xl mx-auto">
      <div class="bg-w95-gray p-6 w95-button-border mb-6">
        <h1 class="text-3xl font-bold mb-2 font-w95">
          Component Showcase
        </h1>
        <p class="text-sm text-w95-dark-gray">
          Component library preview
        </p>
      </div>

      <!-- W95Button Component -->
      <section class="bg-w95-gray p-6 w95-button-border mb-6">
        <h2 class="text-2xl font-bold mb-4 font-w95">
          W95Button
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

      <!-- Border Utilities -->
      <section class="bg-w95-gray p-6 w95-button-border mb-6">
        <h2 class="text-2xl font-bold mb-4 font-w95">
          Border Utilities
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 class="text-sm font-bold mb-2">
              .w95-button-border (Raised)
            </h3>
            <div class="w95-button-border p-4 bg-w95-gray">
              Content
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold mb-2">
              .w95-border (Inset)
            </h3>
            <div class="w95-border p-4 bg-w95-gray">
              Content
            </div>
          </div>

          <div>
            <h3 class="text-sm font-bold mb-2">
              .w95-border-inverse
            </h3>
            <div class="w95-border-inverse p-4 bg-w95-gray">
              Content
            </div>
          </div>
        </div>
      </section>

      <!-- Colors -->
      <section class="bg-w95-gray p-6 w95-button-border mb-6">
        <h2 class="text-2xl font-bold mb-4 font-w95">
          Colors
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div class="bg-w95-teal h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-teal
            </p>
            <p class="text-xs text-w95-dark-gray">
              #008081
            </p>
          </div>

          <div>
            <div class="bg-w95-gray h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-gray
            </p>
            <p class="text-xs text-w95-dark-gray">
              #c0c0c0
            </p>
          </div>

          <div>
            <div class="bg-w95-blue h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-blue
            </p>
            <p class="text-xs text-w95-dark-gray">
              #000181
            </p>
          </div>

          <div>
            <div class="bg-w95-dark-gray h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-dark-gray
            </p>
            <p class="text-xs text-w95-dark-gray">
              #808080
            </p>
          </div>

          <div>
            <div class="bg-w95-border-light h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-border-light
            </p>
            <p class="text-xs text-w95-dark-gray">
              #fcfcfc
            </p>
          </div>

          <div>
            <div class="bg-w95-border-dark h-16 w95-border mb-2" />
            <p class="text-sm font-bold">
              w95-border-dark
            </p>
            <p class="text-xs text-w95-dark-gray">
              #08080e
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
