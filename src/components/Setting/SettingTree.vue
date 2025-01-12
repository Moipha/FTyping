<template>
  <div class="q-pa-md setting-tree">
    <q-tree
      ref="tree"
      :dense="isPhone"
      no-selection-unset
      text-color="text"
      color="text"
      :nodes="simple"
      node-key="label"
      selected-color="active"
      v-model:selected="innerSelected"
      default-expand-all
    >
      <template v-slot:default-header="prop">
        <div class="row items-center q-ma-xs">
          <q-icon :name="prop.node.icon || 'share'" :size="prop.node.iconSize" class="q-mr-sm" />
          <div class="text-weight-bold" :style="`font-size: ${prop.node.fontSize}`">{{ prop.node.label }}</div>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/stores/useSettingStore'
import { ref, watch } from 'vue'
// 获取当前设备是否为移动端
const { isPhone } = useSettingStore()

// 接收传入的model：当前选中节点
const { modelValue } = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// 定义组件内的过渡值
const innerSelected = ref(modelValue)

// 监听父组件中的改动，修改组件中的值
watch(
  () => modelValue,
  (newVal) => {
    innerSelected.value = newVal
  }
)

// 禁止切换的选项
const disableOptions = ['设置', '主题']

// 获取树状图ref
const tree = ref()

// 监听组件中的改动，更新父组件中的值
watch(innerSelected, (n, o) => {
  // 若新选项为禁止切换的选项
  if (disableOptions.includes(n)) {
    // 修改当前选项为旧选项
    innerSelected.value = o
    // 收缩对应折叠栏
    const expanded = !tree.value.isExpanded(n)
    tree.value.setExpanded(n, expanded)
  } else {
    // 正常更新父组件中的值
    emit('update:modelValue', n)
  }
})

// 树状选项
const simple = ref([
  {
    label: '设置',
    icon: 'settings',
    fontSize: '1.5rem',
    iconSize: '2rem',
    children: [
      {
        label: '通用',
        icon: 'tune',
        fontSize: '1rem',
        iconSize: '1.4rem'
      },
      {
        label: '主题',
        icon: 'color_lens',
        fontSize: '1rem',
        iconSize: '1.4rem',
        children: [
          {
            label: '切换主题',
            icon: 'compare_arrows',
            fontSize: '1rem',
            iconSize: '1.4rem'
          },
          {
            label: '自定义主题',
            icon: 'colorize',
            fontSize: '1rem',
            iconSize: '1.4rem'
          }
        ]
      }
    ]
  }
])
</script>

<style lang="scss">
// 左侧除active状态的节点添加透明度
.setting-tree .q-tree__node--link {
  &:not(.q-tree__node--selected) {
    opacity: 0.8;
  }
}
</style>
