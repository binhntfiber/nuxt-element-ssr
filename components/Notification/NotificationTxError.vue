<script lang="ts" setup>
defineProps({
  error: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="rounded-full bg-light flex items-center py-2 px-6">
    <IconPrime:times-circle class="mr-4 w-8 h-8 font-bold text-red-500" />
    <div class="flex-1 text-dark">
      <div class="mb-1 text-base font-bold">Transaction failed</div>
      <div class="break-words">
        {{ error }}
      </div>
    </div>
  </div>
</template>
