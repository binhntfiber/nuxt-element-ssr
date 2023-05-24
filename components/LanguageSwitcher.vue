<script lang="ts" setup>
import { availableLocales } from '~/utils/lang'
import type { DropdownItemType } from '~/types'

// state
const localeSetting = useState<string>('locale.setting')

const selectedLocale = computed({
  get() {
    return {
      title: availableLocales[localeSetting.value].name,
      value: localeSetting.value,
    }
  },
  set(val: DropdownItemType) {
    localeSetting.value = val.value
  },
})

const handleCommand = (command: string) => {
  localeSetting.value = command
}

const items = computed(() => {
  return Object.values(availableLocales).map((el) => {
    return {
      title: el.name,
      value: el.iso,
    }
  })
})
</script>

<template>
  <BaseDropdown
    v-model="selectedLocale"
    :items="items"
  >
    <template #toggle>
      <div class="flex items-center justify-center w-full h-full">
        <IconLa:language />
      </div>
    </template>
  </BaseDropdown>
</template>
