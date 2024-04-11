<template>
  <div class="items-center column">
    <div class="q-my-xl"></div>
    <div @focus="startTyping" @blur="endTyping" @keydown.prevent="typing" ref="inputContainer" tabindex="0" autofocus
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useCaret from '@/hooks/useCaret'
import useTyping from '@/hooks/useTyping'
import { type Block } from '@/types'

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

// 拼音映射
let enWords = ref<Block[]>(words.value.map(({ cn, ...rest }) => rest))

// 当前已输入

// 当前caret索引，格式为 [block索引, code索引]
let curIndex = ref([0, 0])

// 监听索引变化
watch(curIndex, () => {
  handleTyping()
}, { deep: true })

// caret节点
let caret = ref<HTMLElement | null>(null)

// 定位caret与样式修改
let { setBlockRef, handleTyping, blockRefs } = useCaret(caret, curIndex)

// 键盘输入与修改索引
let { startTyping, endTyping, typing } = useTyping(caret, curIndex, enWords, words, blockRefs)

/* 生命周期 */
onMounted(() => {
  window.addEventListener('resize', handleTyping)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleTyping)
})

</script>

<style lang="scss" scoped>
// 词组容器
.words-container {
  width: 900px;
  gap: 15px;
  user-select: none;

  // 浮标
  .caret {
    display: block;
    position: absolute;
    width: 3px;
    height: 28px;
    background-color: deepskyblue;
    border-radius: 10px;
    transition: .2s ease-out;
  }

  // 词组
  .word-block {
    
    // 下方拼音
    .en-word {
      margin-top: -3px;

      // 单个字母
      code {
        transition: 0.2s;
        font-family: 'Consolas';
        margin: 0 0.5px;
        font-size: 23px;
        opacity: .5;
      }
    }

    // 上方汉字
    .cn-word {
      transition: 0.2s;
      font-size: medium;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    }
  }

  // 容器聚焦样式
  &:focus {
    outline: none;
  }

}

// 重启按钮
.re-btn {
  margin-top: 80px;
  opacity: .5 !important;
}
</style>