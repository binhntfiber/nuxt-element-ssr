<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="rounded-full bg-light flex items-center h-12 px-6">
    <IconPrime:times-circle class="mr-4 w-8 h-8 text-red-500" />
    <div class="text-dark font-bold text-base flex-1">{{ message }}</div>
  </div>
</template>
