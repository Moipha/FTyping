<template>
    <div class="q-px-lg q-py-sm">
        <div class="text-h5 q-mb-xl">定制主题</div>
        <div class="q-pa-md q-mt-lg row">
            <!-- 示例 -->
            <div class="col q-mx-lg q-pa-md example-container column justify-center"
                :style="`background: ${customTheme.color.bg};color: ${customTheme.color.text}`">
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
                <div v-if="current === 'custom'" class="checked-icon">
                    <q-icon name="check_circle_outline" size="3rem" class="q-ma-sm"></q-icon>
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
        </div>
        <!-- 按钮组 -->
        <div class="row justify-start q-ml-lg q-mt-md btn-group">
            <q-btn @click="saveTheme" class="q-mr-sm q-ml-md" icon="save" label="保存" size="16px" color="active"
                text-color="btnText" push></q-btn>
            <q-btn @click="useCustom" class="q-mr-sm" icon="check_circle" label="应用" size="16px" color="active"
                text-color="btnText" push></q-btn>
            <q-btn @click="addToTL" icon="dashboard" label="添加至主题列表" size="16px" color="active" text-color="btnText"
                push></q-btn>
        </div>
    </div>
    <!-- 弹窗 -->
    <q-dialog v-model="dialog" persistent>
        <q-card style="min-width: 350px;background-color: var(--q-bg)">
            <q-card-section>
                <div class="text-h6">为该主题命名</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input input-class="theme-input" color="active" dense v-model="themeName" autofocus
                    @keyup.enter="dialog = false" :rules="[val => checkThemeName(val) || '已存在该名称的主题！']" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn color="error" flat label="算了" v-close-popup />
                <q-btn @click="addTheme" color="active" flat label="确定" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import type { Theme } from '@/types'
import { ref, watch } from 'vue'
import { setCssVar, useQuasar } from 'quasar'
import { useThemeStore } from '@/stores/useThemeStore'
import ts from '@/config/themes'
import { storeToRefs } from 'pinia'

// 获取刷新主题列表函数
const { refreshThemeList } = useThemeStore()
const { current } = storeToRefs(useThemeStore())

// 获取quasar内置插件
const $q = useQuasar()

// 获取本地内存的自定义主题
const ct = localStorage.getItem('custom-theme') ? JSON.parse(localStorage.getItem('custom-theme') as string) : {
    active: '', error: '', bg: '', text: '', btnText: ''
}
// 当前自定义的主题颜色
const customTheme = ref<Theme>({
    desc: '',
    color: ct,
    name: 'custom'
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
    // 保存
    localStorage.setItem('custom-theme', JSON.stringify(customTheme.value.color))
    // 弹窗提示
    $q.notify({
        type: 'positive',
        message: '当前主题已保存！',
        position: 'bottom-right',
        timeout: 2000
    })
}

// 检查是否可以保存
function checkBeforeSave() {
    let canSave = ''
    for (const [key, value] of Object.entries(customTheme.value.color).reverse()) {
        if (value === '') {
            canSave = key
        }
    }
    // 校验是否符合
    if (!Boolean(canSave)) {
        // 保存
        localStorage.setItem('custom-theme', JSON.stringify(customTheme.value.color))
    } else {
        // 给不通过的输入框添加样式
        colorInputRefs[canSave].classList.remove('shake')
        void colorInputRefs[canSave].offsetWidth
        colorInputRefs[canSave].classList.add('shake')
        // 弹窗提示
        $q.notify({
            type: 'negative',
            message: `请确定${colorDesc[canSave]}！`,
            position: 'bottom-right',
            timeout: 2000
        })
    }
    return !Boolean(canSave)
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
    // 先保存
    if (checkBeforeSave()) {
        // 设置css变量
        Object.entries(customTheme.value.color).forEach(([key, value]) => {
            setCssVar(key as keyof Theme, value as string)
        })
        // 修改当前主题名
        current.value = customTheme.value.name
        // 保存至本地内存
        localStorage.setItem('theme', JSON.stringify(customTheme.value))
    }
}
// 弹窗
const dialog = ref(false)
// 弹窗中的主题名
const themeName = ref('')

// 点击添加按钮
function addToTL() {
    // 先保存
    if (checkBeforeSave()) {
        // 打开弹窗填写主题名称
        themeName.value = ''
        dialog.value = true
    }
}
// 获取当前主题列表
const localList = localStorage.getItem('custom-theme-list')
const themeList = localList ? JSON.parse(localList) : {}

// 添加自定义主题至主题列表
function addTheme() {
    if (checkThemeName(themeName.value)) {
        // 添加当前主题
        themeList[themeName.value] = customTheme.value
        // 保存主题列表
        localStorage.setItem('custom-theme-list', JSON.stringify(themeList))

        // 弹窗提示
        $q.notify({
            type: 'positive',
            message: `已将主题 [${themeName.value}] 添加至主题列表中`,
            position: 'bottom-right',
            timeout: 2000
        })

        // 清除当前自定义主题
        localStorage.removeItem('custom-theme')
        customTheme.value.color = { active: '', error: '', bg: '', text: '', btnText: '' }

        // 刷新当前主题列表
        refreshThemeList()

        // 转移check图标
        if (current.value === 'custom') {
            current.value = themeName.value
        }

        // 关闭弹窗
        dialog.value = false
    }
}

// 检查主题名称是否合法
function checkThemeName(name: string) {
    // 初始提供主题名不冲突
    if (Object.keys(ts).includes(name)) {
        return false
    }
    // 自定义主题列表中主题名不冲突
    if (Object.keys(themeList).includes(name)) {
        return false
    }
    return true
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

    // 图标
    .checked-icon {
        height: 0;

        .q-icon {
            float: inline-end;
        }
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
// 自定义主题输入框
.theme-input {
    color: $text;
}

.color-choose {

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