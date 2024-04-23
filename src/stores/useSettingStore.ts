import type { Block, Settings } from "@/types"
import { defineStore } from "pinia"
import { pinyin } from "pinyin-pro"
import { Platform, useQuasar } from "quasar"
import { ref } from "vue"


export const useSettingStore = defineStore('setting', () => {
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



    // 默认配置项
    const settings = ref<Settings>({
        // 是否使用默认词组
        useDefaultWords: true,
        // 词组总字符串，词组间用 | 分隔
        wordsString: '你好|世界|测试|信息|发展|趋势|互联网|核心|边缘|计算机|网络|性能|指标|体系|结构|分组|交换|概念|协议|服务|抽象|具体|掌握|数字化|迅速|完善|影响|电信|有线|分工|内容|技术|文件|数据|存储|变革|领域|委员会|因特网|科研|特征|冗长|控制|资料|局部|范围|简介|原理|视频|社交|邮件|照片|信函|业务|购买|方便|经济|实惠|传统|购物|方式|操作|智能|范围|应用|共享|连通性|终端|缴纳|昂贵|地点|软件|服务器|文档|读取|下载|无偿|有偿|瘫痪|工作|生活|学习|交往|停顿|交易|检索|依赖|可靠性|生产力|通信量|负面|病毒|犯罪|机密|盗窃|沉溺|积极|主流|欺诈|初步|了解',
        // 默认生成词数
        generateWordsNum: 30,
        // 自定义词组字符串
        customString: '',
        // 默认限制时间
        limitTime: 20
    })

    // 是否已有弹窗
    const isNotificationShowing = ref(false)

    // 获取设置的全部词块
    let allWords = ref<null | Block>(null)
    if (localStorage.getItem('words')) {
        allWords.value = JSON.parse(localStorage.getItem('words') as string)
    }

    // 根据内存中的设置设定设置的初始值
    if (localStorage.getItem('settings')) {
        settings.value = JSON.parse(localStorage.getItem('settings') as string)
    } else {
        // 如果内存中没有设置，将初始设置保存
        isNotificationShowing.value = true
        saveSettings(settings.value)
        allWords.value = JSON.parse(localStorage.getItem('words') as string)
        isNotificationShowing.value = false
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
        if (blocks.length == 0) {
            showNotify(false)
            return
        }

        // 分别保存blocks和设置项
        localStorage.setItem('words', JSON.stringify(blocks))
        localStorage.setItem('settings', JSON.stringify(setting))

        // 设置当前词组
        allWords.value = JSON.parse(localStorage.getItem('words') as string)

        showNotify(true)
    }

    // 操作弹窗
    function showNotify(b: boolean) {
        // 如果已经有弹窗在显示，则不再重复显示
        if (isNotificationShowing.value) {
            return
        }
        // 显示弹窗
        isNotificationShowing.value = true
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
            if (b) {
                notif({
                    type: 'positive',
                    message: '已保存当前设置',
                    timeout: 1000,
                })
            } else {
                // 有错误的
                notif({
                    type: 'negative',
                    message: '设置保存失败！请至少添加一个自定义词组',
                    timeout: 5000,
                })
            }

        }, 1500)
    }

    return { allWords, isPhone, settings, saveSettings }
})