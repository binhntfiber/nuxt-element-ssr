<script lang="ts" setup>
import type { PropType } from 'vue'
import type { DropdownItemType } from '~/types'
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  items: {
    type: Array as PropType<DropdownItemType[]>,
    default: () => [],
  },
  itemClass: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as PropType<DropdownItemType>,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedItem = useSyncProps<DropdownItemType>(props, 'modelValue', emit)
const togglerRef = ref(null)
const { width } = useElementSize(togglerRef)

const dropdownMinWidth = computed(() => {
  if (width.value < 150) {
    return 150
  }
  return width.value
})

const handleCommand = (itemValue: string) => {
  const item = props.items.find((el) => el.value === itemValue)
  if (item) {
    selectedItem.value = { ...item }
  }
}
</script>

<template>
  <el-dropdown
    popper-class="base-dropdown"
    trigger="click"
    @command="handleCommand"
  >
    <div
      v-if="$slots.toggle"
      ref="togglerRef"
    >
      <slot name="toggle"></slot>
    </div>
    <BaseButton
      v-else
      ref="togglerRef"
      variant="light"
    >
      <div class="mr-2">
        {{ selectedItem.title }}
      </div>

      <IconPh:caret-down-bold />
    </BaseButton>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in items"
          :key="item.value"
          :command="item.value"
        >
          <div
            class="rounded-lg"
            :style="{ 'min-width': `${dropdownMinWidth}px` }"
          >
            <slot
              v-if="$slots.item"
              name="item"
              :item="item"
            ></slot>
            <div
              v-else
              :class="[
                itemClass,
                {
                  'bg-orange-primary !text-primary font-semibold':
                    item.value === selectedItem.value,
                },
              ]"
              class="text-center px-4 py-10px text-secondary text-sm hover:bg-orange-primary hover:text-primary hover:font-semibold"
            >
              {{ item.title }}
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
.base-dropdown {
  border: none !important;
  box-shadow: -10px 12px 16px -4px rgba(0, 0, 0, 0.2) !important;
  .el-scrollbar {
    border-radius: 8px;
  }
  .el-dropdown-menu {
    @apply py-0;
    @apply border-none;

    .el-dropdown-menu__item {
      @apply p-0;
      @apply text-primary;
      @apply bg-light;
      &:focus {
        @apply bg-transparent;
      }
      &:hover {
        @apply bg-transparent;
      }
    }
  }

  .el-popper__arrow {
    display: none;
  }
}
</style>
