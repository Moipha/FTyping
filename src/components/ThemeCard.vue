<template>
    <q-card @click="changeTheme(themeKey as string)" flat>
        <div class="card-inner">
            <!-- 正面 -->
            <div class="front shadow-5" :style='`background-color: ${value.color.bg};color: ${value.color.active}`'>
                {{ themeKey }}
                <div v-if="current == themeKey" class="icon-container">
                    <q-icon name="check_circle_outline" size="3rem" class="q-ma-sm"></q-icon>
                </div>
            </div>
            <!-- 背面 -->
            <div class="back shadow-5 column justify-center"
                :style='`background: linear-gradient(to bottom right ,${value.color.bg}, ${value.color.active})`'>
                <!-- 主题描述 -->
                <div class="q-mb-sm"
                    :style='`color: ${value.color.active};text-shadow:  -1px -1px 0 ${value.color.btnText},  1px -1px 0 ${value.color.btnText},-1px  1px 0 ${value.color.btnText}, 1px  1px 0 ${value.color.btnText}; `'>
                    {{ value.desc }}</div>
                <!-- 颜色列表 -->
                <div class="row items-center q-px-xl" v-for="(v, k) in value.color" :style='`color: ${v}`'>
                    <div class="color-square" :style='`background-color: ${v}`'></div>
                    <div class="color-key q-ml-md">{{ k }} : </div>
                    <div class="color-value">{{ v }}</div>
                </div>
            </div>
        </div>
    </q-card>
</template>

<script lang="ts" setup>

// 接收父组件传来的数据
defineProps(['themeKey', 'value', 'current', 'changeTheme'])

</script>

<style lang="scss" scoped>
// 主题卡片容器
.q-card {
    width: 300px;
    height: 200px;
    perspective: 1000px; // 为了实现3D效果，添加透视
    background-color: transparent;
    cursor: pointer;
    transition: 0.2s ease;

    // 卡片内部元素
    .card-inner {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d; // 保持3D变换
        transition: transform 0.8s ease-in-out;

        // 正反样式
        .front,
        .back {
            width: 100%;
            height: 100%;
            position: absolute;
            backface-visibility: hidden; // 防止从背面看到正面
            border-radius: 10px;
        }

        // 正面
        .front {
            line-height: 200px;
            font-size: 25px;
            text-align: center;

            .icon-container {
                position: absolute;
                bottom: 0;
                right: 0;

                .q-icon {
                    float: inline-end;
                }
            }
        }

        // 背面
        .back {
            transform: rotateY(180deg); // 初始时背面朝上
            font-size: 18px;
            text-align: center;
            font-weight: bold;

            .color-square {
                height: 18px;
                width: 18px;
                border-radius: 5px;
            }

            .color-value {
                text-decoration: underline;
                margin-left: auto;
            }

        }
    }

    // 鼠标悬停时翻转
    &:hover .card-inner {
        transform: rotateY(180deg);
        transition-delay: .5s;
    }

    &:hover {
        transform: translateY(5px);
    }

    &:active {
        transform: translateY(10px);
    }
}
</style>