<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const props = withDefaults(defineProps<Props>(), {
  variant: 'raised',
  size: 'md',
  disabled: false,
});

const buttonVariants = cva(
  'font-w95 text-black cursor-pointer inline-flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        raised: 'w95-button-border bg-w95-gray',
        ghost: 'bg-w95-gray',
        active: 'w95-border-inverse bg-w95-gray',
      },
      size: {
        sm: 'h-4 text-[10px] px-1 gap-1',
        md: 'h-6 text-[0.65rem] px-1 gap-1',
        lg: 'h-8 text-sm px-2 gap-1.5',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'raised',
      size: 'md',
      disabled: false,
    },
  },
);

interface Props {
  variant?: 'raised' | 'ghost' | 'active';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  class?: string;
  icon?: string;
}
</script>

<template>
  <button
    :class="cn(buttonVariants({ variant, size, disabled }), props.class)"
    :disabled="!!disabled"
  >
    <img
      v-if="icon"
      :src="icon"
      class="max-h-[80%]"
      :class="{
        'max-w-[16px]': size === 'sm',
        'max-w-[20px]': size === 'md',
        'max-w-[24px]': size === 'lg',
      }"
    >
    <slot />
  </button>
</template>
