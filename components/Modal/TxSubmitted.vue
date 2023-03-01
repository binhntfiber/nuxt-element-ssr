<script lang="ts" setup>
const { isShowModalTxSubmitted, submittedTxHash } = useModals()
const { APP_CHAIN_DATA } = useConnectWallet()
</script>

<template>
  <ModalBase v-model="isShowModalTxSubmitted" title="Transaction Submitted">
    <div class="box-border p-4">
      <div class="pb-16 pt-12 flex items-center justify-center flex-col">
        <IconMaterial-symbols:check-circle-rounded class="w-16 h-16" />
        <a
          :href="`${APP_CHAIN_DATA.explorer}tx/${submittedTxHash}`"
          target="_blank"
          class="text-sm font-semibold mt-3.5 flex items-center"
        >
          View on explorer
        </a>
      </div>
    </div>
  </ModalBase>
</template>
