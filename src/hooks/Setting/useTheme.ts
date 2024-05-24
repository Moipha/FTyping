import type { Theme } from "@/types"
import { setCssVar } from "quasar"
import { ref } from "vue"
import ts from "@/config/themes"

export default function () {
    // 当前主题; 默认主题为为vue
    const current = ref('vue')

    // 获取当前主题
    const localTheme = localStorage.getItem('theme')

    const theme = localTheme ? JSON.parse(localTheme as string) : null
    if (theme) {
        current.value = theme.name
    }
    // 获取自定义主题
    const localCustom = localStorage.getItem('custom-theme')

    const customTheme = localCustom ? JSON.parse(localCustom as string) : null
    // 可选的主题
    const themes: { [key: string]: Theme } = {
        ...ts
    }
    if (localCustom) {
        themes['custom'] = { desc: '自定义主题', color: customTheme }
    }

    // 切换至指定主题
    function changeTheme(themeName: string) {
        if (!(themeName in themes)) {
            console.error(`要切换的主题${themeName}不存在`)
            return
        }
        // 获取主题对象
        const theme = themes[themeName]
        // 设置css变量
        Object.entries(theme.color).forEach(([key, value]) => {
            setCssVar(key as keyof Theme, value)
        })
        // 修改当前主题名
        current.value = themeName
        // 将主题名一起保存
        const save = { ...theme, name: themeName }
        // 保存至本地内存
        localStorage.setItem('theme', JSON.stringify(save))

    }

    return { changeTheme, themes, current }
}