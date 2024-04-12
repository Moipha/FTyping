import { defineStore } from 'pinia'
import { ref } from 'vue'

import pinyin from 'js-pinyin'
import type { Block } from '@/types'

export const useTypingStore = defineStore('typing', () => {
    // 计时：开始时间
    const startTime = ref<number | null>(null)
    // 获取设置的全部词块
    const allWords = JSON.parse(localStorage.getItem('words') || '')
    const words = ref<{ cn: string, en: string }[]>([])
    const enWords = ref<Block[]>([])
    // 生成指定数量的随机词块
    function generateWords(amount: number) {
        // 浅拷贝，以避免直接修改allWords
        const availableWords = JSON.parse(JSON.stringify(allWords))

        // 如果可用词块数量不足，则直接返回
        if (availableWords.length < amount) {
            console.error("可用词块数不足")
            return
        }

        // 清空现有的 words 数组
        words.value = []

        // 随机选择词块并添加到 words 数组中
        for (let i = 0; i < amount; i++) {
            // 生成一个随机索引
            const randomIndex = Math.floor(Math.random() * availableWords.length)

            // 从可用词块中获取并移除随机选择的词块
            const selectedWord = availableWords.splice(randomIndex, 1)[0]

            // 将选定的词块添加到 words 数组中
            words.value.push(selectedWord)
        }

        // 拼音映射，包括原字符串、当前输入字符串、输入是否正确三个属性的对象集合
        enWords.value = words.value.map(({ cn, ...rest }) => rest)
    }


    /* 节点 */
    const caret = ref<HTMLElement | null>(null)   // caret元素节点
    const blockRefs = ref<HTMLElement[]>([])    // block元素ref节点集合
    const blocksContainer = ref<HTMLElement | null>(null)    // 聚焦容器

    // 设置block动态ref集合
    const setBlockRef = (el: HTMLElement, index: number) => {
        if (el) {
            blockRefs.value[index] = el
        }
    }
    // 重新获取ref集合
    function updateRefs() {
        blockRefs.value = []
        for (let index = 0; index < words.value.length; index++) {
            const blockRef = blockRefs.value[index]
            if (blockRef) {
                blockRefs.value.push(blockRef)
            }
        }
    }

    return { words, caret, blockRefs, enWords, startTime, blocksContainer, setBlockRef, generateWords, updateRefs }

})