import { onMounted, ref, type Ref } from 'vue';

export default (curIndex: Ref, caret: Ref) => {
    // 设置block动态ref
    const blockRefs = ref<HTMLElement[]>([])
    const setBlockRef = (el: HTMLElement, index: number) => {
        if (el) {
            blockRefs.value[index] = el
        }
    }

    // 定位caret
    const positionCaret = (n: number, block: HTMLElement | null) => {
        const caretElement = caret.value as HTMLElement | null;
        if (caretElement && block) {
            const codeElements = block.querySelectorAll('.en-word code');
            if (codeElements.length > n) {
                const targetCodeElement = codeElements[n] as HTMLElement;
                const targetRect = targetCodeElement.getBoundingClientRect();
                const caretTop = targetRect.top + targetRect.height / 2 - caretElement.offsetHeight / 2;
                const caretLeft = targetRect.left - caretElement.offsetWidth;

                // 设置caret的位置
                if (caretElement) {
                    caretElement.style.top = caretTop + 'px';
                    caretElement.style.left = caretLeft + 2 + 'px';
                }
            } else {
                console.error(`Block does not have ${n + 1} code elements.`);
            }
        } else {
            console.error('Caret or block element is not defined.');
        }
    }



    // 进行输入，重新定位
    const handleTyping = () => {
        // 获取当前block的ref
        let block = blockRefs.value[curIndex.value[0]]
        // 定位caret
        if (block) {
            positionCaret(curIndex.value[1], block)
        } else {
            console.error('Block element is not defined.');
        }
    }


    /* 生命周期 */

    // 挂载
    onMounted(() => {
        handleTyping()
    })

    return { setBlockRef, handleTyping }
}