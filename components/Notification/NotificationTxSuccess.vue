\
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  txHash: {
    type: String,
    default: '',
  },
})
const { APP_CHAIN_DATA } = useConnectWallet()
</script>

<template>
  <div class="flex items-center rounded-full bg-light flex items-center py-2 px-6">
    <div class="mr-4">
      <IconMaterialSymbols:checkCircleRounded class="w-8 h-8 text-green-500" />
    </div>
    <div class="flex-1 text-dark">
      <div class="mb-1 font-bold text-base">{{ title }}</div>
      <div>
        <Anchor :href="`${APP_CHAIN_DATA.explorer}/tx/${txHash}`">View on explorer </Anchor>
      </div>
    </div>
  </div>
</template>
