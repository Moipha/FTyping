import type { Block, TypingResult } from "@/types"
import type { Ref } from "vue"

export default function (
    startTime: Ref<number | null>,
    words: Ref<{ cn: string, en: string }[]>,
    typingResult: Ref<TypingResult>,
    curIndex: Ref<[number, number]>,
    showResult: Ref<boolean>
) {
    // 输入完成后的操作
    function handleEnd(enWords: Block[]) {
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

        // 复位索引
        curIndex.value = [0, 0]
        // 开始时间设为初始状态
        startTime.value = null
        // 显示结果
        showResult.value = true
    }

    // 重新开始
    function restart() {
        showResult.value = false
    }


    return { handleEnd, restart }
}