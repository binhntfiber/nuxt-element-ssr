<script lang="ts" setup>
const { isShowModalTxRejected } = useModals()
</script>

<template>
  <ModalBase v-model="isShowModalTxRejected" title="Transaction rejected">
    <div class="box-border p-4">
      <div class="py-4 flex items-center justify-center flex-col">
        <IconUis:times-circle class="w-36 h-36 text-red-500" />
        <div class="text-xl mt-3.5">Transaction has been rejected</div>
      </div>
    </div>
  </ModalBase>
</template>
