<template>
  <q-separator color="text" />

  <q-splitter :horizontal="isPhone" v-model="splitterModel" separator-style="background-color: var(--q-text)"
    style="height: calc(100vh - 170px)">
    <!-- 左侧 -->
    <template v-slot:before>
      <div class="q-pa-md">
        <q-tree :dense="isPhone" no-selection-unset text-color="text" color="text" :nodes="simple" node-key="label"
          selected-color="active" v-model:selected="selected" default-expand-all>
          <template v-slot:default-header="prop">
            <div class="row items-center q-ma-xs">
              <q-icon :name="prop.node.icon || 'share'" :size="prop.node.iconSize" class="q-mr-sm" />
              <div class="text-weight-bold" :style="`font-size: ${prop.node.fontSize}`">{{ prop.node.label }}</div>
            </div>
          </template>
        </q-tree>
      </div>
    </template>
    <!-- 分割线 -->
    <template v-slot:separator>
      <q-avatar color="active" text-color="btnText" size="40px" icon="drag_indicator" />
    </template>
    <!-- 右侧 -->
    <template v-slot:after>
      <q-tab-panels class="q-pa-sm" v-model="selected" animated transition-prev="slide-down" transition-next="slide-up">
        <q-tab-panel name="计时模式">
          <div class="q-px-lg q-py-sm">
            <div class="text-h5 q-pl-sm">词组设置</div>
            <!-- 开关 -->
            <q-toggle @update:model-value="((b: boolean) => handleToggleChange(b))" class="q-mt-lg" size="50px"
              color="active" dark v-model="settings.useDefaultWords"><span
                class="text-subtitle1 q-ml-sm">使用默认词组</span></q-toggle>
            <!-- 文本域 -->
            <q-input :disable="settings.useDefaultWords" color="active" input-class="words-input" class="q-mt-sm"
              v-model="settings.wordsString" autogrow outlined>
              <q-resize-observer @resize="handleTextAreaResize" />
            </q-input>
            <q-btn @click="saveSettings(settings)" :disable="settings.useDefaultWords" push class="float-right q-mt-sm"
              size="16px" color="active" text-color="btnText"><span class="q-px-md">保存</span></q-btn>
            <!-- 选项组 -->
            <div class="row q-mt-xl">
              <div class="row items-center text-subtitle1 q-ml-md" :class="isPhone ? 'col-12' : 'col-2'">默认生成词数</div>
              <div class="col">
                <q-option-group @update:model-value="((num: number) => handleWordsNumChange(num))"
                  v-model="settings.generateWordsNum" :options="options" color="active" dark inline />
              </div>
            </div>

          </div>
        </q-tab-panel>

        <q-tab-panel name="限时模式">
          限时模式设置
        </q-tab-panel>

        <q-tab-panel name="主题">
          主题设置
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
  <q-separator color="text" />
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useTypingStore } from '@/stores/useTypingStore'
import { storeToRefs } from 'pinia';

// 获取store中的数据
const { saveSettings, settings } = useTypingStore()
const { isPhone } = storeToRefs(useTypingStore())


// 切分窗口中线位置
const splitterModel = ref(isPhone.value ? 30 : 20)
// 默认选中
const selected = ref('计时模式')


// 树状选项
const simple = ref([{
  label: '设置',
  icon: 'settings',
  fontSize: '1.5rem',
  iconSize: '2rem',
  children: [
    {
      label: '计时模式',
      icon: 'alarm',
      fontSize: '1rem',
      iconSize: '1.4rem',
    },
    {
      label: '限时模式',
      icon: 'notifications_none',
      fontSize: '1rem',
      iconSize: '1.4rem',
    },
    {
      label: '主题',
      icon: 'color_lens',
      fontSize: '1rem',
      iconSize: '1.4rem',
    }
  ]
}])

// 选项
const options = [
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30
  },
  {
    label: '40',
    value: 40
  },
  {
    label: '50',
    value: 50
  }
]


/* 计时模式 */

// 选项组变动
function handleWordsNumChange(value: number) {
  settings.generateWordsNum = value
  // 更新配置项
  saveSettings(settings)
}
// 开关变动
function handleToggleChange(b: boolean) {
  settings.useDefaultWords = b
  // 更新配置项
  saveSettings(settings)
}

// 文本域大小变动
function handleTextAreaResize() {
  // 通过修改文本域中的内容来唤起autogrow
  if (settings.wordsString) {
    settings.wordsString += ' '
    nextTick(() => {
      settings.wordsString = settings.wordsString.substring(0, settings.wordsString.length - 1)
    })
  }
}

</script>

<style lang="scss" scoped>
.q-tab-panels {
  background-color: transparent;

  .q-tab-panel {
    overflow: hidden;
  }
}
</style>
<style lang="scss">
// 修改文本域样式
.words-input {
  color: $text;
  font-size: 18px;
  line-height: 1.5 !important;
  padding: 10px 0 !important;
  letter-spacing: 2px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}

// 删除文本域的边框
.q-field__control::before {
  border-color: transparent !important;
}

// 左侧除active状态的节点添加透明度
.q-tree__node--link {
  &:not(.q-tree__node--selected) {
    opacity: .8;
  }
}

// 选型组
.q-radio__inner {
  &:not(.q-radio__inner--truthy) {
    color: $text
  }
}
</style>