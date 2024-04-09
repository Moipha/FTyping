import { nextTick, type Ref } from "vue"

export default function (caret: Ref, curIndex: Ref, enWords: Ref, words: Ref) {
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
    function typing(e: KeyboardEvent) {
        // 设置样式
        if (caret.value) {
            caret.value.classList.remove('waiting')
        }
        // 按下字母区按键，设置索引
        if (e.code.startsWith('Key')) {
            // 设置索引
            if (words.value.length > curIndex.value[0]) {
                if (curIndex.value[1] < words.value[curIndex.value[0]].en.length) {
                    // 同一block中code索引增加
                    curIndex.value[1]++
                } else {
                    if (words.value.length > curIndex.value[0] + 1) {
                        // code索引到最大值，将多出的输入添加至末尾
                        words.value[curIndex.value[0]].en += e.key
                        // 待新增字符渲染完成后更新索引
                        nextTick(() => {
                            curIndex.value[1]++
                        })
                    } else {
                        handleEnd()
                    }
                }
            }
        } else if (e.code === 'Space') {
            // 按下空格，跳转至下一个block
            if (curIndex.value[0] >= words.value.length - 1) {
                handleEnd()
            } else {
                curIndex.value = [curIndex.value[0] + 1, 0]
            }
        } else if (e.code === 'Backspace') {
            // 按下退格，回到上一个位置
            // 如果已是初始位置，不进行退格
            if (curIndex.value[0] == 0 && curIndex.value[1] == 0) {
                return
            }
            // 如果code索引为0，回到上一个block的末尾
            if (curIndex.value[1] <= 0) {
                curIndex.value = [curIndex.value[0] - 1, words.value[curIndex.value[0] - 1].en.length]
            } else if (curIndex.value[1] > enWords.value[curIndex.value[0]].length) {
                // 如果有多出的输出，删掉一位
                words.value[curIndex.value[0]].en = words.value[curIndex.value[0]].en.slice(0, -1)
                // 渲染完成后更新索引
                nextTick(() => {
                    curIndex.value[1]--
                })
            } else {
                // code索引不为0，减一
                curIndex.value[1]--
            }
        } else { }

    }

    // 输入完成
    function handleEnd() {
        console.log('结束')
        curIndex.value = [0, 0]
    }

    return { startTyping, endTyping, typing }
}