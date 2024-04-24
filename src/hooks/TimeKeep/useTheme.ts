import type { Theme } from "@/types"
import { getCssVar, setCssVar } from "quasar"
import { ref } from "vue"

export default function () {
    // 当前主题
    const current = ref('amber')

    // 获取当前主题
    localStorage.getItem('theme')
    const theme = localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme') as string) : null
    if (theme) {
        current.value = theme.name
    }

    // 可选的主题
    const themes: { [key: string]: Theme } = {

        // quasar自带配色
        quasar: {
            desc: 'Quasar默认主题',
            color: {
                active: '#1976d2',
                error: '#c10015',
                text: 'white',
                btnText: 'white',
                bg: '#1d1d1d'
            }
        },

        // amber配色
        amber: {
            desc: '琥珀',
            color: {
                active: '#ffc107',
                error: '#c10015',
                text: 'whitesmoke',
                btnText: 'black',
                bg: '#282c34'
            }
        },

        // vue官方文档配色
        vue: {
            desc: 'Vue官网配色',
            color: {
                active: '#42b883',
                error: '#ff6464',
                text: '#213547',
                btnText: '#ffffff',
                bg: '#ffffff'
            }
        },

        bootstrap: {
            desc: 'Bootstrap 配色',
            color: {
                active: '#007bff',
                error: '#dc3545',
                text: '#343a40',
                btnText: '#ffffff',
                bg: '#f8f9fa'
            }
        },
        flatUI: {
            desc: 'Flat UI 配色',
            color: {
                active: '#18bc9c',
                error: '#e74c3c',
                text: '#2c3e50',
                btnText: '#ffffff',
                bg: '#ecf0f1'
            }
        },
        summerVibes: {
            desc: '夏日气息',
            color: {
                active: '#ff6f61',
                error: '#ffcc5c',
                text: '#293241',
                btnText: '#ffffff',
                bg: '#f2cc8f'
            }
        },
        oceanBreeze: {
            desc: '海洋微风',
            color: {
                active: '#40bad5',
                error: '#ff5e78',
                text: '#1f2833',
                btnText: '#ffffff',
                bg: '#90ced6'
            }
        },
        sunsetGlow: {
            desc: '日落余晖',
            color: {
                active: '#40bad5',
                error: '#ff8c94',
                text: '#6a0572',
                btnText: '#ffffff',
                bg: '#f4acb7'
            }
        },
        tropicalParadise: {
            desc: '热带天堂',
            color: {
                active: '#ffaf7b',
                error: '#ff4d4d',
                text: '#35477d',
                btnText: '#ffffff',
                bg: '#9ad3bc'
            }
        },
        midnightMagic: {
            desc: '午夜魔法',
            color: {
                active: '#ffc93c',
                error: '#ff6f61',
                text: '#2d3142',
                btnText: '#ffffff',
                bg: '#f8f9fa'
            }
        },
        springBlossom: {
            desc: '春日花开',
            color: {
                active: '#a8d8ea',
                error: '#ff7e67',
                text: '#4a4e69',
                btnText: '#ffffff',
                bg: '#f6f6f6'
            }
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