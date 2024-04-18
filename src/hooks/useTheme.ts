import type { Theme } from "@/types"
import { getCssVar, setCssVar } from "quasar"

export default function () {

    // 可选的主题
    const themes: { [key: string]: Theme } = {

        // quasar自带配色
        quasar: {
            active: '#1976d2',
            error: '#c10015',
            text: 'white',
            btnText: 'white',
            bg: '#1d1d1d'
        },

        // amber配色
        amber: {
            active: '#ffc107',
            error: '#c10015',
            text: 'whitesmoke',
            btnText: 'black',
            bg: '#282c34'
        }
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
        Object.entries(theme).forEach(([key, value]) => {
            setCssVar(key as keyof Theme, value)
        })
        // 保存至本地内存
        localStorage.setItem('theme', JSON.stringify(theme))
    }

    return { changeTheme, themes}
}