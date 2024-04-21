// 词块元素
export interface Word {
    // 汉字
    cn: string
    // 拼音
    en: string
}

// 词块
export interface Block {
    // 原字符串
    en: string
    // 已输入字符串
    typing?: string
    // 输入是否正确
    isCorrect?: boolean
}

// 结果窗口显示数据
export interface TypingResult {
    // 键入速度，每分钟输入正确词组个数
    wpm: string
    // 正确率
    correctness: string
    // 总用时
    during: string
}

// 配置项
export interface Settings {
    // 是否使用默认词组
    useDefaultWords: boolean
    // 词组总字符串，词组间用 | 分隔
    wordsString: string
    // 默认生成词数
    generateWordsNum: number,
    // 自定义词组字符串
    customString: string
}

// 主题对象
export interface Theme {
    // 主题描述
    desc: string
    // 主题颜色
    color: {
        active: string
        error: string
        bg: string
        text: string
        btnText: string
    }
}

// 限时模式中已输入的卡片对象
export interface WordCard {
    // 卡片id
    id: string
    // 原汉字内容
    cn: string
    // 原拼音内容
    en: string
    // 用户输入的内容
    typing?: string
    // 是否正确
    isCorrect?: boolean
}

// 限时模式结果
export interface LimitResult {
    // 拼写速度
    wpm: string
    // 拼写正确的词组
    correctWords: WordCard[]
    // 拼写错误的词组
    wrongWords: WordCard[]
}