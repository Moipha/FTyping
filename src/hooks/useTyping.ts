import { nextTick, type Ref } from "vue"

export default function (caret: Ref, curIndex: Ref, enWords: Ref, words: Ref, blockRefs: Ref) {

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

        // 获取block子元素
        const { codeElements } = getTargetElement(curIndex.value[0]) as { codeElements: HTMLCollection }


        // 按下字母区按键，设置索引
        if (e.code.startsWith('Key')) {


            // 判断输入是否正确
            if (curIndex.value[1] != codeElements.length) {
                // 要进行着色的元素
                const target = codeElements[curIndex.value[1]] as HTMLElement
                // 判断正误
                if (e.key == enWords.value[curIndex.value[0]].en[curIndex.value[1]]) {
                    target.classList.add('correct')
                    target.classList.remove('skip')
                } else {
                    target.classList.add('wrong')
                    target.classList.remove('skip')
                }
            }

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
                            // 多余输入直接设置成wrong
                            const target = codeElements[curIndex.value[1]] as HTMLElement
                            target.classList.add('wrong')
                            curIndex.value[1]++
                        })
                    } else {
                        handleEnd()
                    }
                }
            }


        } else if (e.code === 'Space') {
            // 至少在该block中输入了一个字母后才可通过space跳转
            if (curIndex.value[1] != 0) {
                if (curIndex.value[0] < words.value.length - 1) {
                    // 将跳转略过的字母都进行着色
                    if (curIndex.value[1] - 1 != codeElements.length) {
                        // 要着色的元素
                        const targets = [...codeElements].slice(curIndex.value[1], codeElements.length)
                        targets.forEach(code => {
                            code.classList.add('skip')
                        })
                    }
                    // 修改block索引
                    curIndex.value = [curIndex.value[0] + 1, 0]
                } else {
                    // 如果已是最后一个block，直接结束
                    handleEnd()
                }
            }
        } else if (e.code === 'Backspace') {
            // 按下退格，回到上一个位置
            // 如果已是初始位置，不进行退格
            if (curIndex.value[0] == 0 && curIndex.value[1] == 0) {
                return
            }

            // 如果code索引为0，回到上一个block中跳过前所在位置
            if (curIndex.value[1] <= 0) {

                // 获取上一个block的子元素
                const { codeElements: lastBlockCodes } = getTargetElement(curIndex.value[0] - 1) as { codeElements: HTMLCollection }
                const lastBlockArr = [...lastBlockCodes]
                // 检测上一个block有无跳过的元素
                const haveSkip = lastBlockArr.filter(code => code.classList.contains('skip')).length > 0
                // 如果上一个block中元素有跳过，索引回到跳转处
                if (haveSkip) {
                    let startIndex
                    // 检查从哪个位置跳转过去的
                    for (let i = 0; i < lastBlockArr.length; i++) {
                        if (lastBlockArr[i].classList.contains('skip')) {
                            startIndex = i
                            break
                        }
                    }
                    // TODO 汉字区着色
                    // 删除该位置到最后的所有元素的样式
                    const targets = lastBlockArr.slice(startIndex, lastBlockArr.length)
                    targets.forEach(code => {
                        code.classList.remove('skip')
                    })
                    // 修改索引
                    curIndex.value = [curIndex.value[0] - 1, startIndex]
                } else {
                    // 上一个block中元素无跳过，则直接回到最后一位
                    curIndex.value = [curIndex.value[0] - 1, words.value[curIndex.value[0] - 1].en.length]
                }
            } else if (curIndex.value[1] > enWords.value[curIndex.value[0]].en.length) {
                // 如果有多出的输出，删掉一位
                words.value[curIndex.value[0]].en = words.value[curIndex.value[0]].en.slice(0, -1)
                // 渲染完成后更新索引
                nextTick(() => {
                    curIndex.value[1]--
                })
            } else {
                // code索引不为0，减一
                curIndex.value[1]--
                // 去除之前的样式
                const target = codeElements[curIndex.value[1]] as HTMLElement
                target.classList.remove('correct')
                target.classList.remove('wrong')
            }
        }
    }

    // 获取指定索引的block元素对象
    function getTargetElement(index: number) {
        // 获取当前block的ref
        const blockRef = blockRefs.value[index]
        // 检查参数是否为null
        if (!blockRef) {
            console.error('Block元素不存在')
            return
        }

        // 获取子元素en-word和cn-word
        const cn = blockRef.children[0] as HTMLElement
        const en = blockRef.children[1] as HTMLElement
        // 获取code元素集合
        const codeElements = en.children
        return { cn, codeElements }
    }

    // 输入完成
    function handleEnd() {
        console.log('结束')
        curIndex.value = [0, 0]
    }

    return { startTyping, endTyping, typing }
}