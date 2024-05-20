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
                            <code>shili</code>
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
                    <Transition name="bot">
                        <div v-if="customTheme.color[key]" class="color-bot q-mr-sm"
                            :style='`background-color: ${customTheme.color[key]}`'></div>
                    </Transition>
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
</template>

<script lang="ts" setup>
import type { Theme } from '@/types'
import { ref } from 'vue'

/* 自定义主题 */

// 当前自定义的主题颜色
const customTheme = ref<Theme>({
    desc: '',
    color: {
        active: '',
        error: '',
        bg: '',
        text: '',
        btnText: ''
    }
}) as any
// 自定义主题时默认的颜色
const defaultColor = {
    active: '#00aaff',
    error: '#ff0000',
    bg: '#ffffff',
    text: '#000000',
    btnText: '#ffffff'
} as any
const colorDesc = {
    active: '主题颜色',
    error: '错误颜色',
    bg: '背景颜色',
    text: '文字颜色',
    btnText: '按钮文字颜色'
} as any
</script>

<style lang="scss" scoped>
// 自定义主题
.color-choose {
    min-width: 150px;
    transition: all .2s;

    // 色块
    .color-bot {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        border: solid 1.5px $text;
    }
}

// 自定义主题示例
.example-container {
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
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
        }

        // 浮标
        .caret {
            display: block;
            position: absolute;
            width: 3px;
            height: 28px;
            border-radius: 10px;
            transition: .2s ease-out;
        }
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
</style>
<style lang="scss">
.color-choose {

    // 自定义主题输入框
    .theme-input {
        color: $text;
    }

    // 删除输入框的边框
    .q-field__control::before {
        border: solid $text 1.5px !important;
    }
}
</style>