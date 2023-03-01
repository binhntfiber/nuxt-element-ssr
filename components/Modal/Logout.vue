<script setup lang="ts">
const { isShowLogoutModal, setLogoutModalState } = useModals()
const { address, resetState, APP_CHAIN_DATA } = useConnectWallet()

const handleLogout = () => {
  setLogoutModalState(false)
  resetState()
}
</script>

<template>
  <ModalBase v-if="address" v-model="isShowLogoutModal" title="Your wallet">
    <div>
      <div class="">
        <div class="py-2 font-semibold">
          <span class="font-medium break-all"> {{ address }}</span>
        </div>
        <!-- <div class="mb-4 font-semibold">
          <NumberValue
            :value="nativeBalance"
            :suffix="APP_CHAIN_DATA.nativeCurrency.symbol"
          />
        </div> -->
        <div ref="container" class="flex font-light">
          <a
            class="flex items-center mr-6 group"
            target="_blank"
            :href="`${APP_CHAIN_DATA.explorer}address/${address}`"
          >
            <IconPrime:external-link class="mr-1 group-hover:opacity-70" />

            <span class="group-hover:opacity-70">View on explorer</span>
          </a>
          <!-- <a
            class="flex items-center cursor-pointer group"
            @click="toClipboard(address)"
          >
            <CopyIcon class="mr-1 group-hover:opacity-70 w-4 h-4" />
            <span class="group-hover:opacity-70">Copy address</span>
          </a> -->
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          class="px-6 py-3 cursor-pointer hover:opacity-70 rounded-xl"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </ModalBase>
</template>
