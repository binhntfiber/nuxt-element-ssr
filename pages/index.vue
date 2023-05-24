<script lang="ts" setup>
import { transfer } from '~~/services/blockchain'

// composable
const { t } = useLang()

useHead({
  title: 'Index page',
  titleTemplate: '%s - Nuxt 3 Starter',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt 3 Element Plus SSR',
    },
    {
      property: 'og:image',
      content: '/preview_new.png',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
// meta
definePageMeta({
  layout: 'page',
})
const { setModalConnectState, address } = useConnectWallet()
const { handleApprove } = useApprove({
  spenderAddress: () => '0x26dbA5F67B6EF5111A19EA41a4Ab7c354d9Afef0',
  tokenAddress: () => '0xde27609e2b16C425150354CA26A03B4a83580592',
  tokenDecimals: () => 6,
  amount: () => '10',
})
const handleTransfer = async () => {
  await useSendTx({
    call: transfer,
    params: {
      to: '0x76FeF668b0de8bf28866B2D1A087899888499c23',
      tokenAddress: '0xde27609e2b16C425150354CA26A03B4a83580592',
      amount: '1000000',
    },
    txConfirmContent: 'Confirmed',
    txSuccessContent: `Transfered`,
  })
}
</script>

<template>
  <PageWrapper class="flex-1 flex">
    <PageBody class="flex-1 flex">
      <PageSection class="flex-1 flex items-center">
        <ElButton type="success">button</ElButton>
        <client-only>
          <el-tooltip
            content="Bottom center"
            placement="bottom"
            effect="light"
          >
            <el-button>Light</el-button>
          </el-tooltip>
        </client-only>

        <MessageSuccess message="abasdasd" />
        <BaseButton @click="handleApprove('USDC')">Approve</BaseButton>
        <BaseButton @click="handleTransfer">Transfer</BaseButton>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style lang="scss">
@import '../assets/sass/variables';

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }

  33.333%,
  83.333% {
    opacity: 0;
  }
}

@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }

  33.333%,
  50% {
    opacity: 1;
  }
}

@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }

  66.667%,
  83.333% {
    opacity: 1;
  }
}

.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme('colors.slate.800');
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: $padding;
  padding-right: $padding;
  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme('colors.slate.800');
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: $padding;
    padding-right: $padding;
  }
}
.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: $padding;
  padding-right: $padding;
  background-image: linear-gradient(90deg, var(--start-color), var(--end-color));
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}

html.dark {
  .animated-text-bg {
    color: theme('colors.gray.100');
    &:before {
      color: theme('colors.gray.100');
    }
  }
}

.triangle-shape {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 40px solid theme('colors.green.600');
  transform: translate(-15rem, -6rem) rotate(45deg);
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
