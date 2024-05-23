<template>
  <q-separator color="text" />
  <q-splitter :horizontal="isPhone" v-model="splitterModel" separator-style="background-color: var(--q-text)"
    style="height: calc(100vh - 170px)">
    <!-- 左侧 -->
    <template v-slot:before>
      <SettingTree v-model="selected" />
    </template>
    <!-- 分割线 -->
    <template v-slot:separator>
      <q-avatar color="active" text-color="btnText" size="40px" icon="drag_indicator" />
    </template>
    <!-- 右侧 -->
    <template v-slot:after>
      <q-tab-panels v-model="selected" animated transition-prev="slide-down" transition-next="slide-up"
        transition-duration="500">
        <q-tab-panel name="通用">
          <GeneralSetting />
        </q-tab-panel>

        <q-tab-panel name="切换主题">
          <div class="q-px-lg q-py-md row q-gutter-lg">
            <ThemeCard v-for="(value, key) in themes" :key="key" :themeKey="key" :value="value" :current="current"
              :changeTheme="changeTheme" />
          </div>
        </q-tab-panel>

        <q-tab-panel name="自定义主题">
          <CustomTheme />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
  <q-separator color="text" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingStore } from '@/stores/useSettingStore'
import useTheme from '@/hooks/Setting/useTheme'
import ThemeCard from '@/components/Setting/ThemeCard.vue'
import SettingTree from '@/components/Setting/SettingTree.vue'
import GeneralSetting from '@/components/Setting/GeneralSetting.vue'
import CustomTheme from '@/components/Setting/CustomTheme.vue'

// 获取store中的数据
const { isPhone } = useSettingStore()

// 获取主题数据
const { themes, current, changeTheme } = useTheme()

// 切分窗口中线位置
const splitterModel = ref(isPhone ? 30 : 20)

// 当前选中树状图节点
const selected = ref('通用')

</script>

<style lang="scss" scoped>
// 右侧背景
.q-tab-panels {
  background-color: transparent;
}

// 设置中的分割线
.divider {
  opacity: .3 !important;
  height: 2px;
}

// 右侧整体
.q-tab-panels.q-panel-parent {
  height: 100%;
}
</style>