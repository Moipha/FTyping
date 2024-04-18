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
    active: string
    error: string
    bg: string
    text: string
    btnText: string
}