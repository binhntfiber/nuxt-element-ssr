<script lang="ts" setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import type { PropType } from 'vue'

enum ActionSheetPosition {
  BOTTOM = 'bottom',
  TOP = 'top',
  CENTER = 'center',
}

defineProps({
  position: {
    type: String as PropType<ActionSheetPosition>,
    default: 'center',
  },
  containerClasses: {
    type: String,
    default: '',
  },
})

// micro compiler
const emit = defineEmits(['onClose'])

// state
const show = ref(false)

// methods
const close = () => {
  show.value = false
  setTimeout(() => emit('onClose'), 100)
}

// lifecycle
onMounted(() => {
  setTimeout(() => (show.value = true), 100)
})
</script>

<template>
  <Teleport to="body">
    <TransitionRoot :show="show" appear>
      <div>
        <ActionSheetOverlay @click="close" />
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="w-screen z-50 flex fixed h-screen bottom-0">
            <div
              class="relative max-w-8xl px-4 pb-4 w-full mx-auto flex flex-col flex-1 space-y-1 overflow-y-auto"
              :class="[
                {
                  'justify-end': position === ActionSheetPosition.BOTTOM,
                  'justify-start': position === ActionSheetPosition.TOP,
                  'justify-center': position === ActionSheetPosition.CENTER,
                },
                containerClasses,
              ]"
            >
              <slot />
            </div>
          </div>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </Teleport>
</template>

<style lang="scss">
.slide-fade-from-bottom-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-bottom-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-bottom-enter-from,
.slide-fade-from-bottom-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
