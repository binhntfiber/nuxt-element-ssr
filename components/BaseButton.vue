<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  variant: { type: String, default: 'main' },

  disabled: { type: Boolean, default: false },
  label: { type: Boolean, default: false },
  rounded: {
    type: String as PropType<'none' | 'full' | 'normal' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'lg',
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg' | 'xl'>,
    default: 'lg',
  },
})

const className = computed(() => {
  return [
    'base-btn',
    `base-btn--${props.variant}`,
    `base-btn--size-${props.size}`,
    {
      'base-btn--disabled': props.disabled,
      'base-btn--label': props.label,

      'rounded-full': props.rounded === 'full',
      rounded: props.rounded === 'normal',
      'rounded-sm': props.rounded === 'sm',
      'rounded-md': props.rounded === 'md',
      'rounded-lg': props.rounded === 'lg',
    },
  ]
})
</script>

<template>
  <button
    :class="className"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.base-btn {
  @apply flex justify-center items-center;
  @apply px-4 py-2;
  @apply transition;
  @apply focus:outline-none;
  @apply cursor-pointer;
  @apply select-none;
  @apply border border-primary;
  &:disabled {
    @apply cursor-not-allowed opacity-60;
  }
  &--primary {
    @apply bg-orange-primary text-primary;
  }
  &--dark {
    @apply bg-primary text-primary;
  }
  &--light {
    @apply bg-light text-dark;
  }
}
</style>
