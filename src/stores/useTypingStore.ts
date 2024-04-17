import { defineStore } from 'pinia'
import { ref } from 'vue'

import { pinyin } from 'pinyin-pro'
import type { Block, Settings } from '@/types'
import { useQuasar, Platform } from 'quasar'

export const useTypingStore = defineStore('typing', () => {

    // 获取quasar内置插件
    const $q = useQuasar()

    if (Platform.is.mobile) {
        $q.notify({
            type: 'negative',
            message: '请使用PC端进行访问',
            position: 'center',
            timeout: Infinity
        })
    }

    // 判断是否是竖屏模式
    const mediaQuery = window.matchMedia('(max-width: 500px)')
    const isPhone = ref<boolean>(mediaQuery.matches)
    // 定义一个处理函数，用于更新 isPhone 的值
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
        isPhone.value = event.matches
    }
    // 添加监听器，监听媒体查询结果的变化
    mediaQuery.addEventListener('change', handleMediaQueryChange)



    // 计时：开始时间
    const startTime = ref<number | null>(null)
    // 获取设置的全部词块
    let allWords: null | Block = null
    if (localStorage.getItem('words')) {
        allWords = JSON.parse(localStorage.getItem('words') as string)
    }

    const words = ref<{ cn: string, en: string }[]>([])
    const enWords = ref<Block[]>([])

    // 配置项
    const settings = ref<Settings>({
        // 是否使用默认词组
        useDefaultWords: true,
        // 词组总字符串，词组间用 | 分隔
        wordsString: '邮件|离开|准备|庆祝|宿舍|注意|非常|家庭|去年|点心|上课|美丽|德国|一定|着急|铅笔|痛苦|必须|病人|现在|牛奶|月亮|早上|简单|瓶子|哥哥|音乐|筷子|还是|桌子|看见|一边|大声|风景|餐厅|木头|新年|嘴巴|应该|过来|今天|真好|奥利奥|键盘|真实|优联|蓝牙|无线|三明治|胶条|星夜|奶油|熊猫|可乐|海外|矩阵|塑料|大骨|营地|无限|虚拟|电玩|徽章|北极圈|仁王|怪物|猎人|大佬|开车|代组|亚克力|黄铜|不锈钢|铝锭|注塑|菠萝|霓虹|螺丝|卫星轴|红白机|幻影|日文|俄文|键帽|套件|碳纤维|玻纤|热升华|头发|客厅|游泳池|周末|弟弟|可爱|鹦鹉|漂白|电泳|武士道|码农|脉冲|蒸汽波|青柠|声波|橄榄|前锋|深空|原点|樱花|原厂|静电容|抛光|佳达隆|宁芝|北极星|退烧|吃瓜|解毒|摸鱼|樱桃|树懒|模拟|激光|阳极|喷涂|便当|夜行者|锤头鲨|核子|涂改|神佑|注音|桃花|暗黑|海岸|巧克力|斯巴达|鬼魂|爆裂|绿洲|标本|巫妖|永恒|奶昔|河马|使命|召唤|黑色|行动|白色|牛头|个性|战神|现代|战争|凯华|精微科|空间|东方|山水|微光|西装|血缘|诅咒|钢板|打卡|签到|上班|双模|单模|划水|外卖|赞助|打赏|机械|开关|游戏|无敌|瞎眼|心态|照片|润滑|联机|配重|设计|装饰|铭牌|定制|独木舟|边牧|产品|鼠标|外设|交流|磨砂|透光|打字|玩具|品牌|工作室',
        // 默认生成词数
        generateWordsNum: 20,
        // 自定义词组字符串
        customString: ''
    })

    // 是否已有弹窗
    const isNotificationShowing = ref(false)

    // 根据内存中的设置设定设置的初始值
    if (localStorage.getItem('settings')) {
        settings.value = JSON.parse(localStorage.getItem('settings') as string)
    } else {
        // 如果内存中没有设置，将初始设置保存
        isNotificationShowing.value = true
        saveSettings(settings.value)
        allWords = JSON.parse(localStorage.getItem('words') as string)
        isNotificationShowing.value = false
    }
    // 生成指定数量的随机词块
    function generateWords(amount: number) {
        // 浅拷贝，以避免直接修改allWords
        const availableWords = JSON.parse(JSON.stringify(allWords))

        if (!availableWords) {
            console.error('当前无词块')
            return
        }
        // 如果可用词块数量不足，则直接返回
        if (availableWords.length < amount) {
            console.error(`可用词块数不足${amount}个！当前最多生成${availableWords.length}个词块`)
            amount = availableWords.length

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

    // 保存设置至本地内存
    function saveSettings(setting: Settings) {

        // 获取词组
        let wordsArr
        if (setting.useDefaultWords) {
            wordsArr = setting.wordsString.split('|')
        } else {
            wordsArr = setting.customString.split('|')
        }
        // 去重
        const uniqueWords = [...new Set(wordsArr)]
        // 去空
        const resultArr = uniqueWords.filter(str => str.trim() !== '')
        // 转换成block对象
        const blocks = [] as Block[]
        resultArr.forEach((cn: string) => {
            // 去除全部空格
            cn = cn.replace(/\s/g, "")
            const en = pinyin(cn, { toneType: 'none', type: 'array', v: true }).join('')
            const block = { cn, en }
            blocks.push(block)
        })

        // 分别保存blocks和设置项
        localStorage.setItem('words', JSON.stringify(blocks))
        localStorage.setItem('settings', JSON.stringify(setting))

        // 设置当前词组
        allWords = JSON.parse(localStorage.getItem('words') as string)

        // 如果已经有弹窗在显示，则不再重复显示
        if (isNotificationShowing.value) {
            return
        }
        // 显示弹窗
        isNotificationShowing.value = true;
        const notif = $q.notify({
            type: 'ongoing',
            message: '更新设置中...',
            position: isPhone.value ? 'bottom' : 'bottom-right',
            onDismiss: () => {
                isNotificationShowing.value = false; // 弹窗关闭时更新状态
            }
        })
        // 延迟关闭弹窗
        setTimeout(() => {
            notif({
                type: 'positive',
                message: '已保存当前设置',
                timeout: 1000,
            })
        }, 2000)
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


    return { words, caret, blockRefs, enWords, startTime, blocksContainer, settings, isPhone, setBlockRef, generateWords, updateRefs, saveSettings }

})