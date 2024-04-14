import { type Ref } from 'vue'
import { useTypingStore } from '@/stores/useTypingStore'
import { storeToRefs } from 'pinia'

export default function (
    curIndex: Ref<[number, number]>
) {
    // 获取store中的数据
    const { blockRefs, caret, blocksContainer } = storeToRefs(useTypingStore())


    // 处理键盘事件
    const handleTyping = () => {
        // 获取当前block的ref
        const block = blockRefs.value[curIndex.value[0]]
        // 重新定位caret
        if (!block) {
            console.error('Block元素未定义')
            return
        }
        positionCaret(curIndex.value[1], block)
    }

    // 根据传入code索引和block元素定位caret
    const positionCaret = (n: number, blockElement: HTMLElement | null) => {
        // 检查参数是否为null
        if (!blockElement) {
            console.error('Block元素不存在')
            return
        }
        // 获取子元素en-word和cn-word
        const en = blockElement.children[1] as HTMLElement
        // 获取code元素集合
        const codeElements = en.children
        // 如果n大于元素总数则无法定位
        if (codeElements.length < n) {
            console.error(`Block中不足${n}个code`)
            return
        }
        // 定位至对应字母左方。如果已在最后一个字母左方，定位至其右方
        const positionTargetCode = codeElements[n] as HTMLElement || codeElements[n - 1] as HTMLElement
        n != codeElements.length
        moveCaret(positionTargetCode, n != codeElements.length)
    }

    // 根据传入目标和左右方位确定caret位置
    function moveCaret(target: HTMLElement, onLeft: boolean) {
        const caretElement = caret.value as HTMLElement | null
        // 设置caret的位置
        if (!caretElement) {
            console.error('CaretElement元素不存在')
            return
        }
        const caretTop = target.offsetTop + target.offsetHeight / 2 - caretElement.offsetHeight / 2
        // 定位至右侧计算中需考虑自身宽度
        const caretLeft = target.offsetLeft + (onLeft ? 0 : target.offsetWidth)
        caretElement.style.top = `${caretTop}px`
        caretElement.style.left = `${caretLeft}px`
    }

    return { handleTyping }
}