<template>
  <div class="items-center column">
    <div class="q-my-xl"></div>
    <div @focus="startTyping" @blur="endTyping" @keydown="typing" ref="inputContainer" tabindex="0" autofocus
      class="row words-container">
      <div ref="caret" class="caret"></div>
      <div :ref="(el) => setBlockRef(el as HTMLElement, index)" v-for="(word, index) in words" :key="index"
        class="column items-center word-block">
        <div class="cn-word">{{ word.cn }}</div>
        <div class="en-word">
          <code v-for="(code, cIndex) in word.en" :key="cIndex">{{ code }}</code>
        </div>
      </div>
    </div>
    <q-btn class="re-btn" padding="xl" icon="refresh" size="lg" unelevated />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useCaret from '@/hooks/useCaret'

// 词组
let words = ref([
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'yruiwer' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'nmxzcxvnm' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshiiiii' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshillkenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
])


// 当前caret索引，格式为 [block索引, 字母索引]
let curIndex = ref([0, 0])

// 监听索引变化
watch(curIndex, (v) => {
  console.log(v)
  handleTyping()
}, { deep: true })

// caret节点
let caret = ref<HTMLElement | null>(null)

// 定位caret相关
let { setBlockRef, handleTyping } = useCaret(curIndex, caret)


// 开始输入
function startTyping() {
  if (caret.value) {
    caret.value.classList.remove('hide')
    caret.value.classList.add('waiting')
  }
}
// 结束输入
function endTyping() {
  if (caret.value) {
    caret.value.classList.add('hide')
  }
}
// 输入
function typing() {
  // 设置样式
  if (caret.value) {
    caret.value.classList.remove('waiting')
  }
  // 设置索引
  if (words.value.length > curIndex.value[0]) {
    if (curIndex.value[1] + 1 < words.value[curIndex.value[0]].en.length) {
      // 同一block中code索引增加
      curIndex.value[1]++
    } else {
      if (words.value.length > curIndex.value[0] + 1) {
        // code索引到最大值，增加block索引
        curIndex.value = [curIndex.value[0] + 1, 0]
      } else {
        console.log('结束')
        curIndex.value = [0, 0]
      }
    }
  }

}

</script>

<style lang="scss" scoped>
.words-container {
  width: 900px;
  gap: 15px;
  user-select: none;

  .caret {
    display: block;
    position: absolute;
    width: 3px;
    height: 28px;
    background-color: deepskyblue;
    border-radius: 10px;
    transition: .2s ease-out;
  }

  .word-block {
    .en-word {
      margin-top: -4px;

      code {
        font-family: 'Consolas';
        margin: 0 0.5px;
        font-size: 22px;
        opacity: .5;
      }
    }

    .cn-word {
      font-size: medium;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    }
  }

  &:focus {
    outline: none;
  }

}

.re-btn {
  margin-top: 80px;
  opacity: .5 !important;
}
</style>