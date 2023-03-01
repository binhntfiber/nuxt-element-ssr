<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '594',
  },
  headerBorder: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)

const customClasses = computed(() => {
  let custom = ''

  if (props.headerBorder) {
    custom += 'base-modal--header-border'
  }
  return custom
})

const setModalValue = (value: boolean) => {
  modelValue.value = value
}

function closeModal() {
  modelValue.value = false
}
</script>
<template>
  <client-only>
    <el-dialog
      v-model="modelValue"
      :title="title"
      :width="width"
      align-center
      :show-close="false"
      :class="customClasses"
    >
      <template #header>
        <div class="flex justify-end">
          <button @click="closeModal">
            <IconPrime:times-circle class="w-8 h-8 text-secondary" />
          </button>
        </div>
        <div class="font-semibold text-3xl font-semibold text-center">
          <slot v-if="$slots.title"></slot>
          <template v-else>
            {{ title }}
          </template>
        </div>
      </template>
      <div class="text-dark">
        <slot></slot>
      </div>
      <template v-if="$slots.button" #footer>
        <slot name="button"></slot>
      </template>
    </el-dialog>
  </client-only>
</template>

<style lang="scss">
.el-dialog {
  @apply bg-dropdown-modal;
  @apply text-dark;
  @apply rounded-3xl;
  &__header {
    @apply p-8;
    @apply mr-0;
  }
  &__footer {
    @apply p-8;
    @apply border-t-2 border-primary;
  }
}

.base-modal--header-border {
  .el-dialog__header {
    @apply border-b-2 border-primary;
  }
}
</style>
