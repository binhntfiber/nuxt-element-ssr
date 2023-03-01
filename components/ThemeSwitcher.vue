<script lang="ts" setup>
import { IThemeSettingOptions, availableThemes } from '~/utils/theme'
import type { DropdownItemType } from '~/types'

// micro compiler
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})
const { t } = useLang()

const themes = computed(() =>
  availableThemes.map((el) => {
    return {
      value: el.key,
      title: t(el.text),
    }
  })
)

// state
const themeSetting = useState<IThemeSettingOptions>('theme.setting')
const selectedTheme = computed({
  get() {
    return {
      title:
        themes.value.find((el) => el.value === themeSetting.value)?.title || '',
      value: themeSetting.value as string,
    }
  },
  set(val: DropdownItemType) {
    themeSetting.value = val.value as IThemeSettingOptions
  },
})
const currentStyle = toRef(props, 'type')
</script>

<template>
  <BaseDropdown v-model="selectedTheme" :items="themes">
    <template #toggle>
      <div class="flex items-center justify-center w-full h-full">
        <span class="dark:hidden">
          <IconUil:sun />
        </span>
        <span class="hidden dark:block">
          <IconUil:moon />
        </span>
      </div>
    </template>
  </BaseDropdown>
</template>
