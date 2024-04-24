import type { Block, TypingResult } from "@/types"
import { onBeforeUnmount, type Ref, nextTick } from "vue"
import { useTypingStore } from '@/stores/useTypingStore'
import { storeToRefs } from "pinia"
import { useSettingStore } from "@/stores/useSettingStore"

export default function (
    typingResult: Ref<TypingResult>,
    curIndex: Ref<[number, number]>,
    showResult: Ref<boolean>
) {

    // 获取store中的数据
    const { settings } = useSettingStore()
    const { generateWords, updateRefs } = useTypingStore()
    const { words, startTime, blocksContainer, blockRefs } = storeToRefs(useTypingStore())

    // 输入完成后的操作
    function handleEnd(enWords: Block[]) {
        // 判断最后未记录正误的block输入是否正确
        enWords[curIndex.value[0]].isCorrect = enWords[curIndex.value[0]].typing == enWords[curIndex.value[0]].en
        // 计时：结束时间
        const endTime = Date.now()
        if (!startTime.value) {
            console.error('计时未开始')
            return
        }
        // 计算总用时，单位秒
        const duringNumber = (endTime - startTime.value) / 1000
        const during = Math.round(duringNumber) + 's'
        // 计算WPM，四舍五入保留两位小数
        const correctWord = enWords.filter((block) => block.isCorrect).length
        let wpmNumber = (correctWord / duringNumber * 60)
        wpmNumber = Math.round(wpmNumber * 100) / 100.
        const wpm = wpmNumber.toFixed(2)

        // 计算正确率，四舍五入保留两位小数
        let correctnessNumber = correctWord / words.value.length
        correctnessNumber = Math.round(correctnessNumber * 100)
        const correctness = correctnessNumber + '%'

        // 保存结果数据
        typingResult.value.wpm = wpm
        typingResult.value.correctness = correctness
        typingResult.value.during = during

        // 显示结果
        showResult.value = true
    }

    // 重新开始
    function restart(wordsNum: number) {
        // 去除所有样式
        blockRefs.value.forEach((r) => {
            // 去除汉字样式
            r.children[0].classList.remove('wrong', 'correct', 'skip')
            // 去除拼音样式
            const codes = [...r.children[1].children]
            codes.forEach((code) => {
                code.classList.remove('wrong', 'correct', 'skip')
            })
        })
        // 开始时间设为初始状态
        startTime.value = null
        // 生成新的词块
        generateBlocks(wordsNum)
        // 隐藏结果界面
        showResult.value = false
        // 需要渲染后进行的操作
        nextTick(() => {
            // 聚焦
            if (blocksContainer.value) {
                blocksContainer.value.focus()
            }
            // 复位索引（定位浮标）
            curIndex.value = [0, 0]
        })
    }

    // 生成词块
    function generateBlocks(wordsNum: number) {
        // 更新动态节点
        updateRefs()
        // 获取随机词块
        generateWords(wordsNum)
    }

    /* 生命周期 */

    // 载入时生成随机词组
    generateWords(settings.generateWordsNum)

    onBeforeUnmount(() => {
        // 组件销毁时计时结束
        startTime.value = null
    })

    return { handleEnd, restart }
}