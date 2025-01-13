import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TypingRecord } from '@/types'

export const useDataStore = defineStore(
  'data',
  () => {
    // 打字记录
    const typing_records = ref<TypingRecord[]>([])
    // 新增打字记录
    function addTypingRecord(record: TypingRecord) {
      typing_records.value.unshift(record)
    }

    // 计算总打字数
    const total_words = computed(() => {
      return typing_records.value.reduce((sum, record) => sum + record.total_words, 0)
    })

    // 计算今日打字数
    const today_words = computed(() => {
      const today = new Date().toLocaleString().split(' ')[0] // 获取今天的日期（YYYY-MM-DD）
      return typing_records.value
        .filter((record) => {
          const recordDate = new Date(record.timestamp).toLocaleString().split(' ')[0] // 获取记录的日期
          return recordDate === today
        })
        .reduce((sum, record) => sum + record.total_words, 0)
    })

    // 计算平均打字速度
    const average_wpm = computed(() => {
      if (typing_records.value.length === 0) return 0
      const totalWPM = typing_records.value.reduce((sum, record) => sum + record.wpm, 0)
      return parseFloat((totalWPM / typing_records.value.length).toFixed(2))
    })

    // 计算平均正确率
    const average_accuracy = computed(() => {
      if (typing_records.value.length === 0) return 0
      const totalAccuracy = typing_records.value.reduce((sum, record) => sum + record.accuracy, 0)
      return parseFloat((totalAccuracy / typing_records.value.length).toFixed(2))
    })

    // 计算最好成绩（WPM）
    const best_wpm = computed(() => {
      if (typing_records.value.length === 0) return 0
      return Math.max(...typing_records.value.map((record) => record.wpm))
    })

    return {
      total_words,
      today_words,
      typing_records,
      average_wpm,
      average_accuracy,
      best_wpm,
      addTypingRecord
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'typing_data',
          storage: localStorage
        }
      ]
    }
  } as any
)
