<template>
  <q-separator color="white" />

  <q-splitter v-model="splitterModel" separator-style="background-color: white" style="height: calc(100vh - 170px)">
    <!-- 左侧 -->
    <template v-slot:before>
      <div class="q-pa-md">
        <q-tree no-selection-unset text-color="white" color="white" :nodes="simple" node-key="label"
          selected-color="amber" v-model:selected="selected" default-expand-all>
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
      <q-avatar color="amber" text-color="black" size="40px" icon="drag_indicator" />
    </template>
    <!-- 右侧 -->
    <template v-slot:after>
      <q-tab-panels class="q-pa-sm" v-model="selected" animated transition-prev="slide-down" transition-next="slide-up">
        <q-tab-panel name="计时模式">
          <div class="q-px-lg q-py-sm">
            <div class="text-h5 q-pl-sm">词组设置</div>
            <!-- 开关 -->
            <q-toggle @update:model-value="((b: boolean) => handleToggleChange(b))" class="q-mt-lg" size="50px"
              color="amber" dark v-model="settings.useDefaultWords"><span
                class="text-subtitle1 q-ml-sm">使用默认词组</span></q-toggle>
            <!-- 文本域 -->
            <q-input :disable="settings.useDefaultWords" color="amber" input-class="words-input" class="q-mt-sm"
              v-model="settings.wordsString" autogrow outlined />
            <q-btn @click="saveSettings(settings)" :disable="settings.useDefaultWords" push class="float-right q-mt-sm"
              size="16px" color="amber" text-color="black"><span class="q-px-md">保存</span></q-btn>
            <!-- 选项组 -->
            <div class="row q-mt-xl">
              <div class="col-2 row items-center text-subtitle1 q-ml-md">默认生成词数</div>
              <div class="col">
                <q-option-group @update:model-value="((num: number) => handleWordsNumChange(num))"
                  v-model="settings.generateWordsNum" :options="options" color="amber" dark inline />
              </div>

            </div>

          </div>
        </q-tab-panel>

        <q-tab-panel name="限时模式">
          <div class="text-h4 q-mb-md">Food</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>

        <q-tab-panel name="其他设置">
          <div class="text-h4 q-mb-md">Room service</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>

        <q-tab-panel name="Room view">
          <div class="text-h4 q-mb-md">Room view</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
  <q-separator color="white" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTypingStore } from '@/stores/useTypingStore'

// 获取store中的数据
const { saveSettings, settings } = useTypingStore()

// 切分窗口中线位置
const splitterModel = ref(20)
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
      label: '其他设置',
      icon: 'more_horiz',
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
.words-input {
  color: white;
  font-size: 18px;
  line-height: 1.5 !important;
  padding: 10px 0 !important;
  letter-spacing: 2px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}

.q-field__control::before {
  border-color: transparent !important;
}
</style>