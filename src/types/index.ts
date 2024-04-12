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