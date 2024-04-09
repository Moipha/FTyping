import { onMounted, ref, type Ref } from 'vue';

export default (caret: Ref, curIndex: Ref) => {
    // 设置block动态ref
    const blockRefs = ref<HTMLElement[]>([])
    const setBlockRef = (el: HTMLElement, index: number) => {
        if (el) {
            blockRefs.value[index] = el
        }
    }

    // 定位caret
    const positionCaret = (n: number, block: HTMLElement | null) => {
        const caretElement = caret.value as HTMLElement | null
        if (caretElement && block) {
            // const codeElements = block.querySelectorAll('.en-word code')
            const en = block.children[1] as HTMLElement
            const codeElements = en.children
            if (codeElements.length > n) {
                // 定位浮标至对应的字母前
                const targetCode = codeElements[n] as HTMLElement
                const caretTop = targetCode.offsetTop + targetCode.offsetHeight / 2 - caretElement.offsetHeight / 2
                const caretLeft = targetCode.offsetLeft

                // 设置caret的位置
                if (caretElement) {
                    caretElement.style.top = caretTop + 'px'
                    caretElement.style.left = caretLeft + 'px'
                }
            } else if (codeElements.length == n) {
                // 如果该block中的全部字母都定位过了，将浮标定位至最后一个字母的右边
                
                const targetCode = codeElements[n - 1] as HTMLElement
                const caretTop = targetCode.offsetTop + targetCode.offsetHeight / 2 - caretElement.offsetHeight / 2
                const caretLeft = targetCode.offsetLeft + targetCode.offsetWidth
                // 设置caret的位置
                if (caretElement) {
                    caretElement.style.top = caretTop + 'px'
                    caretElement.style.left = caretLeft + 'px'
                }
            } else {
                console.error(`Block does not have ${n + 1} code elements.`)
            }
        } else {
            console.error('Caret or block element is not defined.')
        }
    }

    // 进行输入，重新定位
    const handleTyping = () => {
        // 获取当前block的ref
        let block = blockRefs.value[curIndex.value[0]]
        // 定位caret
        if (block) {
            positionCaret(curIndex.value[1], block)
            console.log(blockRefs)

        } else {
            console.error('Block element is not defined.')
        }
    }


    /* 生命周期 */

    // 挂载
    onMounted(() => {
        handleTyping()
    })

    return { setBlockRef, handleTyping }
}