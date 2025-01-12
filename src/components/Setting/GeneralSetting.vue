<template>
  <div class="q-px-lg q-py-sm">
    <div class="text-h5">词组设置</div>
    <div class="q-pa-md q-mt-lg">
      <!-- 开关 -->
      <div class="row items-center">
        <q-toggle
          @update:model-value="(b: boolean) => handleToggleChange(b)"
          size="50px"
          color="active"
          dark
          keep-color
          v-model="settings.useDefaultWords"
          ><span class="text-subtitle1">使用默认词组</span></q-toggle
        >
        <q-icon size="20px" color="text" class="q-ml-xs cursor-pointer" name="info">
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            class="text-btnText bg-active"
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
          >
            <b style="font-size: 13px">设置词组时注意词组间用 | 分隔；</b><br />
            <b style="font-size: 13px">在保存时会自动忽略重复词组</b>
          </q-tooltip>
        </q-icon>
        <span class="words-count q-ml-lg"
          >共{{ [...new Set(calcString.split('|'))].filter((str) => str.trim() !== '').length }}词</span
        >
      </div>
      <!-- 文本域 -->
      <div class="q-mt-sm words-setting">
        <q-input
          placeholder="请在此处输入自定义词组..."
          :disable="settings.useDefaultWords"
          color="active"
          input-class="words-input"
          v-model="calcString"
          autogrow
          outlined
        >
          <q-resize-observer @resize="handleTextAreaResize" />
        </q-input>
        <div class="row justify-end">
          <q-btn
            @click="saveSettings(settings)"
            :disable="settings.useDefaultWords"
            push
            class="q-mt-sm q-mr-sm"
            size="16px"
            color="active"
            text-color="btnText"
            ><span class="q-px-md">保存</span></q-btn
          >
        </div>
      </div>
    </div>

    <q-separator class="q-my-xl divider" color="text" />
    <!-- 计时模式 -->
    <div class="text-h5 q-mt-xl">计时模式</div>
    <div class="row q-pa-md q-mt-lg">
      <div class="row items-center text-subtitle1 q-ml-sm" :class="isPhone ? 'col-12' : 'col-2'">默认生成词数</div>
      <div class="col">
        <q-option-group
          @update:model-value="(num: number) => handleWordsNumChange(num)"
          v-model="settings.generateWordsNum"
          :options="options"
          color="active"
          dark
          inline
        />
      </div>
    </div>
    <q-separator class="q-my-xl divider" color="text" />
    <!-- 限时模式 -->
    <div class="text-h5">限时模式</div>
    <div class="row q-pa-md q-mt-lg time-limit-setting">
      <div class="row items-center text-subtitle1 q-ml-sm" :class="isPhone ? 'col-12' : 'col-2'">默认限定时长</div>
      <div class="col row">
        <q-input
          @blur="saveSettings(settings)"
          @keydown.enter="saveSettings(settings)"
          suffix="秒"
          input-class="time-input"
          v-model="limitTime"
          color="active"
          outlined
        ></q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/stores/useSettingStore'
import { computed, nextTick } from 'vue'

// 获取store中的数据
const { isPhone, settings, saveSettings } = useSettingStore()

// 计算属性：文本域
const calcString = computed({
  get() {
    return settings.useDefaultWords ? settings.wordsString : settings.customString
  },
  set(value) {
    if (settings.useDefaultWords) {
      settings.wordsString = value
    } else {
      settings.customString = value
    }
  }
})

// 生成词数选项
const options = [
  {
    label: '20',
    value: 20
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

/* 限时模式 */

// 处理默认限定时间变动
const limitTime = computed({
  get() {
    return settings.limitTime || 20
  },
  set(value) {
    // 如果试图设置时长为非正数时，不修改设置中的值
    if (value > 0) {
      settings.limitTime = value
    }
  }
})
</script>

<style lang="scss" scoped>
// 词数统计
.words-count {
  opacity: 0.5;
}
</style>

<style lang="scss">
.words-setting {
  // 修改文本域样式
  .words-input {
    color: $text;
    font-size: 18px;
    line-height: 1.5 !important;
    padding: 10px 0 !important;
    letter-spacing: 2px;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      Segoe UI Symbol,
      'Noto Color Emoji';
  }

  // 删除文本域的边框
  .q-field__control::before {
    border-color: transparent !important;
  }

  // 选型组
  .q-radio__inner {
    &:not(.q-radio__inner--truthy) {
      color: $text;
    }
  }

  // 开关
  .q-toggle__inner--falsy {
    .q-toggle__thumb {
      &::after {
        border: solid 1px;
      }
    }
  }
}

// 单选框按钮边框
.q-radio--dark .q-radio__inner {
  color: $text;
}

// 输入框
.time-limit-setting {
  .time-input {
    width: 100px;
    color: $text;
    font-size: 2em;
  }

  // 删除输入框的边框
  .q-field__control::before {
    border: solid $text 2px !important;
  }
}
</style>
