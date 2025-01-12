import { computed, nextTick, ref, toRef, watch } from 'vue'
import { nanoid } from 'nanoid'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/useSettingStore'
import { useDataStore } from '@/stores/useDataStore'
import type { LimitResult, WordCard } from '@/types'

export default function () {
  // 获取设置项和全部词组
  const { allWords, settings } = storeToRefs(useSettingStore())
  // 剩余时间
  const restTime = ref()
  const timeLimit = toRef(settings.value.limitTime)
  // 卡片组
  const cards = ref<WordCard[]>([])
  // 已输入完成的词组
  const currentWords = ref<WordCard[]>([])
  // 当前状态，输入中或结算中
  const status = ref(true)

  // 显示结果的数据
  const result = ref<LimitResult>({ wpm: '', correctWords: [], wrongWords: [] })

  // 输入框节点
  const inputRef = ref<HTMLElement | null>(null)

  // 输入框
  const input = ref('')

  // 当前计时器
  let timer: number | undefined

  // 监听限定时间变化
  watch(
    timeLimit,
    (value, old) => {
      // 不可以设置为0或负数
      if (value > 0) {
        restTime.value = value
        nextTick(() => {
          restart()
        })
      } else {
        if (old) {
          timeLimit.value = old
        } else {
          console.error('初始设置时间为非正数')
        }
      }
    },
    { deep: true, immediate: true }
  )

  // 开始计时
  function startCount() {
    if (!timer) {
      timer = setInterval(() => {
        // 每秒更新剩余时间
        restTime.value--

        if (restTime.value <= 0) {
          clearInterval(timer)
          // 时间到
          timeOut()
        }
      }, 1000)
    }
  }

  // 计时结束后
  function timeOut() {
    cards.value.forEach((card) => {
      card.cn = '时间已到'
      card.en = 'timeout'
      card.isCorrect = false
    })
    status.value = false
    // 设置当前时间为00:00
    restTime.value = 0
    // 计算结果

    // 获取拼写正确的词组和错误的词组
    const correctWords = currentWords.value.filter((block) => block.isCorrect)
    const wrongWords = currentWords.value.filter((block) => !block.isCorrect)

    // 计算WPM，四舍五入保留两位小数
    const correctLength = correctWords.length
    let wpmNumber = (correctLength / timeLimit.value) * 60
    wpmNumber = Math.round(wpmNumber * 100) / 100
    const wpm = wpmNumber.toFixed(2)

    // 写入结果显示
    result.value = { wpm, correctWords, wrongWords }

    // 存储打字记录
    const { addTypingRecord } = useDataStore()
    addTypingRecord({
      wpm: parseFloat(result.value.wpm),
      timestamp: new Date().toLocaleString(),
      mode: 'fixed_time',
      total_words: currentWords.value.length,
      accuracy: Math.round((correctLength / currentWords.value.length) * 100)
    })
  }

  // 重新开始计时
  function restart() {
    // 恢复状态
    status.value = true
    // 清空列表
    cards.value = []
    currentWords.value = []
    input.value = ''
    // 重新计时
    restTime.value = timeLimit.value
    clearInterval(timer)
    timer = undefined
    // 重新获取词组
    getWord(true)
    // 输入框获取焦点
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }

  // 获取词组
  function getWord(getFive: boolean) {
    // 浅拷贝，以避免直接修改allWords
    const availableWords = JSON.parse(JSON.stringify(allWords.value))

    if (!availableWords) {
      console.error('当前无词块')
      return
    }

    // 如果可用词块数量不足，则直接返回
    if (availableWords.length < 5) {
      console.error('可用词块数不足5个！')
    }

    // 初始化时添加5个随机词组
    if (getFive) {
      const result = []
      // 随机选中5个词组添加到result中返回
      for (let i = 0; i < 5; i++) {
        // 生成一个随机索引
        const randomIndex = Math.floor(Math.random() * availableWords.length)
        // 从可用词块中获取随机选择的词块
        result.push({ id: nanoid(), ...availableWords[randomIndex] })
      }
      cards.value = result
    } else {
      // 否则添加1个随机词组
      const word = availableWords.splice(Math.floor(Math.random() * availableWords.length), 1)[0]
      cards.value.push({ id: nanoid(), ...word })
    }
  }

  // 进行输入
  function handleTyping(e: KeyboardEvent) {
    // 输入字母后开始计时
    if (e.code.startsWith('Key') || e.key == ' ') {
      startCount()
    }
    // 输入空格后切换至下一个卡片
    if (e.key == ' ') {
      // 判断该卡片输入是否正确并添加到已输入的卡片中
      const { id, en, cn } = cards.value[2]
      const typing = input.value.trim() // 去除可能出现的空格
      const isCorrect = typing == en || typing == cn
      currentWords.value.push({ id, cn, en, typing, isCorrect })
      // 修改词组属性以更改样式
      cards.value[2].isCorrect = isCorrect

      // 清空当前输入框
      nextTick(() => {
        input.value = ''
      })

      // 删除第一个元素并在最后添加一个元素
      cards.value.shift()
      getWord(false)
    }
  }

  // 格式化时间
  const formatTime = computed(() => {
    const minutes = Math.floor(restTime.value / 60) // 计算分钟数
    const seconds = restTime.value % 60 // 计算剩余的秒数

    // 使用模板字符串确保分钟和秒都以两位数形式表示，并添加必要的零填充
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  })

  /* 生命周期 */
  nextTick(() => {
    // 加载后聚焦
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
  // 加载时获取
  getWord(true)

  return { cards, status, formatTime, timeLimit, input, result, inputRef, handleTyping, restart }
}
