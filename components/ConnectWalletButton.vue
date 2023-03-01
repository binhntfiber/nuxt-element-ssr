<script lang="ts" setup>
import { shortenAddress } from '~/utils'

defineProps({
  showTxLoadingIndicator: {
    type: Boolean,
    default: false,
  },
})

const { address: account, setModalConnectState } = useConnectWallet()
const { setLogoutModalState } = useModals()
</script>

<template>
  <BaseButton
    v-if="!account"
    size="md"
    class="text-base !py-2 w-max"
    @click="setModalConnectState(true)"
  >
    {{ $t('button.connect-wallet') }}
  </BaseButton>
  <template v-else>
    <div v-if="showTxLoadingIndicator">
      <!-- <BaseButton
        v-if="txHashPending"
        disabled
        size="md"
        class="text-base !py-2"
      >
        <div class="flex items-center">
          <LoadingIndicator size="16px" class="mr-1" />
          {{ $t('app.1-tx-pending') }}
        </div>
      </BaseButton>
      <BaseButton
        v-else
        @click="setLogoutModalState(true)"
        size="md"
        class="text-base !py-2"
      >
        {{ shortenAddress(account) }}
      </BaseButton> -->
      <BaseButton
        class="text-base !py-2"
        size="md"
        @click="setLogoutModalState(true)"
      >
        {{ shortenAddress(account) }}
      </BaseButton>
    </div>
    <BaseButton
      v-else
      size="md"
      class="text-base !py-2"
      @click="setLogoutModalState(true)"
    >
      {{ shortenAddress(account) }}
    </BaseButton>
  </template>
</template>
