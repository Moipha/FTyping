<template>
    <div class="q-px-lg q-py-sm">
        <div class="text-h5 q-mb-xl">定制主题</div>
        <div class="q-pa-md q-mt-lg row">
            <!-- 示例 -->
            <div class="col q-mx-lg q-pa-md example-container column justify-center"
                :style="`background: ${customTheme.color.bg}`">
                <!-- 计时模式 -->
                <div class="row q-gutter-lg justify-center">
                    <div class="column items-center word-block" :style="`color: ${customTheme.color.active}`">
                        <div class="cn-word">示例</div>
                        <div class="en-word">
                            <code>shili</code>
                        </div>
                    </div>
                    <div class="column items-center word-block" :style="`color: ${customTheme.color.error}`">
                        <div class="cn-word">示例</div>
                        <div class="en-word">
                            <code>shili</code>
                        </div>
                    </div>
                    <div class="column items-center word-block" :style="`color: ${customTheme.color.text}`">
                        <div class="cn-word">示例</div>
                        <div class="en-word" style="opacity: 0.5">
                            <div class="caret waiting" :style="`background: ${customTheme.color.active}`"></div>
                            <code style="margin-left: -2.5px;">shili</code>
                        </div>
                    </div>
                </div>
                <!-- 限时模式 -->
                <div class="q-my-md row q-gutter-md justify-center">
                    <q-card class="column justify-center items-center shadow-3"
                        :style="`color: ${customTheme.color.btnText};background: ${customTheme.color.active}`">
                        <div>示例</div>
                        <div>shili</div>
                    </q-card>
                    <q-card class="column justify-center items-center shadow-3"
                        :style="`color: ${customTheme.color.btnText};background: ${customTheme.color.error}`">
                        <div>示例</div>
                        <div>shili</div>
                    </q-card>
                    <q-card class="column justify-center items-center shadow-3"
                        :style="`color: ${customTheme.color.text}; background: ${customTheme.color.bg}`">
                        <div>示例</div>
                        <div>shili</div>
                    </q-card>
                </div>
            </div>
            <!-- 调色板 -->
            <div class="column q-gutter-lg col-4 color-choose">
                <div v-for="key in Object.keys(defaultColor)" class="row items-center">
                    <Transition name="dot">
                        <div v-if="customTheme.color[key]" class="color-dot q-mr-sm"
                            :style='`background-color: ${customTheme.color[key]}`'></div>
                    </Transition>
                    <div :ref="(el) => setColorInputRef(el as HTMLElement, key)">
                        <q-input input-class="theme-input" color="active" label-color="text"
                            v-model="customTheme.color[key]" :label="colorDesc[key]" outlined>
                            <template v-slot:append>
                                <q-icon name="colorize" color="text" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-color v-model="customTheme.color[key]" :default-value="defaultColor[key]"
                                            no-header-tabs />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
            <!-- 按钮组 -->
            <div class="row justify-start q-ml-lg q-mt-lg btn-group">
                <q-btn @click="saveTheme" class="q-mr-sm" icon="save" label="保存" size="16px" color="active"
                    text-color="btnText" push></q-btn>
                <q-btn @click="useCustom" class="q-mr-sm" icon="check_circle" label="应用" size="16px" color="active"
                    text-color="btnText" push></q-btn>
                <q-btn @click="addToTL" class="q-mr-sm" icon="dashboard" label="添加至主题列表" size="16px" color="active"
                    text-color="btnText" push></q-btn>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import type { Theme } from '@/types'
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import useTheme from '@/hooks/Setting/useTheme'

// 获取quasar内置插件
const $q = useQuasar()

// 获取切换主题的方法
const {changeTheme} = useTheme()

// 获取本地内存的自定义主题
const ct = localStorage.getItem('custom-theme') ? JSON.parse(localStorage.getItem('custom-theme') as string) : {
    active: '', error: '', bg: '', text: '', btnText: ''
}
// 当前自定义的主题颜色
const customTheme = ref<Theme>({
    desc: '',
    color: ct
}) as any

// 监听五个颜色属性，如果不为空移除shake样式
Object.keys(customTheme.value.color).forEach((p: string) => {
    watch(() => customTheme.value.color[p], (n) => {
        if (n !== '') {
            removeShake(p)
        }
    })
})
// 自定义主题时默认的颜色
const defaultColor = {
    active: '#00aaff',
    error: '#ff0000',
    bg: '#ffffff',
    text: '#000000',
    btnText: '#ffffff'
} as { [key: string]: string }
// 颜色名和映射
const colorDesc = {
    active: '主题颜色',
    error: '错误颜色',
    bg: '背景颜色',
    text: '文字颜色',
    btnText: '按钮文字颜色'
} as { [key: string]: string }

// 保存当前主题
function saveTheme() {
    // 校验是否符合
    const checkResult = checkBeforeSave(customTheme.value)
    if (!checkResult) {
        // 保存
        localStorage.setItem('custom-theme', JSON.stringify(customTheme.value.color))
        // 弹窗提示
        $q.notify({
            type: 'positive',
            message: '当前主题已保存！',
            position: 'bottom-right',
            timeout: 2000
        })
    } else {
        // 给不通过的输入框添加样式
        colorInputRefs[checkResult].classList.remove('shake')
        void colorInputRefs[checkResult].offsetWidth
        colorInputRefs[checkResult].classList.add('shake')
        // 弹窗提示
        $q.notify({
            type: 'negative',
            message: `请确定${colorDesc[checkResult]}！`,
            position: 'bottom-right',
            timeout: 2000
        })
    }
}

// 检查是否可以保存
function checkBeforeSave(theme: Theme): string {
    for (const [key, value] of Object.entries(theme.color)) {
        if (value === '') {
            return key
        }
    }
    return ''
}

// 移除当前shake样式
function removeShake(key: string) {
    colorInputRefs[key].classList.remove('shake')
}

// 设置block动态ref集合
const colorInputRefs = {} as { [key: string]: HTMLElement }   // block元素ref节点集合
const setColorInputRef = (el: HTMLElement, color: string) => {
    if (el) {
        colorInputRefs[color] = el
    }
}



// 使用当前主题
function useCustom() {
    changeTheme('custom')
}
// 添加自定义主题至主题列表
function addToTL() {

}

</script>

<style lang="scss" scoped>
// 自定义主题
.color-choose {
    min-width: 150px;
    transition: all .2s;

    // 色块
    .color-dot {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        border: solid 1.5px $text;
    }
}

// 自定义主题示例
.example-container {
    min-width: 300px;
    border: 1.5px solid;
    border-radius: 8px;

    // 词组
    .word-block {

        // 下方拼音
        .en-word {
            margin-top: -3px;

            // 单个字母
            code {
                transition: 0.2s;
                font-family: 'Consolas';
                margin: 0 0.5px;
                font-size: 22px;
            }
        }

        // 上方汉字
        .cn-word {
            transition: 0.1s;
            font-size: medium;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Rodoto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
        }
    }

    // 浮标
    .caret {
        float: inline-start;
        width: 3px;
        height: 28px;
        border-radius: 10px;
        transition: .2s ease-out;
    }

    // 示例卡片
    .q-card {
        width: 100px;
        height: 100px;
        transition: all 0.5s ease;
        font-size: 1.2em;
        border-radius: 10px;
    }
}

// 按钮样式
.btn-group {
    .q-btn {
        font-weight: bold;
    }
}
</style>
<style lang="scss">
.color-choose {

    // 自定义主题输入框
    .theme-input {
        color: $text;
    }

    // 删除输入框的边框
    .q-field__control::before {
        border: solid $text 1.5px;
    }
}

.shake {
    box-shadow: inset 0 0 0 2px $error, 0 0 0 1px $error;
    border-radius: 4px;
    animation: shake 0.5s ease-in-out 0s 1;

    .q-field__control::before {
        border-color: transparent !important;
        transition: border-color 0s;
    }

    .text-active {
        color: transparent !important;
    }
}
</style>