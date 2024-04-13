<template>
  <q-separator color="white" />

  <q-splitter v-model="splitterModel" separator-style="background-color: white" style="height: calc(100vh - 170px)">
    <template v-slot:before>
      <div class="q-pa-lg">
        <q-tree no-selection-unset text-color="white" color="white" :nodes="simple" node-key="label"
          selected-color="amber" v-model:selected="selected" default-expand-all />
      </div>
    </template>
    <template v-slot:separator>
      <q-avatar color="amber" text-color="black" size="40px" icon="drag_indicator" />
    </template>
    <template v-slot:after>
      <q-tab-panels class="q-pa-sm" v-model="selected" animated transition-prev="slide-right"
        transition-next="slide-left">
        <q-tab-panel name="计时模式">
          <div class="text-h5">词组设置</div>
          <div class="q-pa-md q-my-md">
            <q-toggle size="50px" color="amber" dark v-model="useDefaultWords"><span
                class="text-subtitle1 q-ml-sm">使用默认词组</span></q-toggle>
            <q-input :disable="!useDefaultWords" color="amber" input-class="words-input" class="q-mt-sm"
              v-model="wordsString" autogrow outlined />
            <q-btn @click="saveWords" :disable="!useDefaultWords" push class="float-right q-mt-sm" size="16px"
              color="amber" text-color="black"><span class="q-px-md">保存</span></q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="限时模式">
          <div class="text-h4 q-mb-md">Food</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>

        <q-tab-panel name="其他设置">
          <div class="text-h4 q-mb-md">Room service</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>

        <q-tab-panel name="Room view">
          <div class="text-h4 q-mb-md">Room view</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
            quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
            In, libero.</p>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
  <q-separator color="white" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {useTypingStore} from '@/stores/useTypingStore'

// 获取store中的数据
const {setWords} = useTypingStore()

// 切分窗口中线位置
const splitterModel = ref(20)
// 默认选中
const selected = ref('计时模式')

// 树状选项
const simple = ref([{
  label: '设置',
  icon: 'settings',
  enabled: false,
  children: [
    {
      label: '计时模式',
      icon: 'restaurant_menu',
      children: [
        {
          label: '词组'
        }
      ]
    },
    {
      label: '限时模式',
      icon: 'room_service'
    },
    {
      label: '其他设置',
      icon: 'photo'
    }
  ]
}])


/* 计时模式 */

// 是否使用默认词组
const useDefaultWords = ref(false)
// 词组总字符串，词组间用 | 分隔
const wordsString = ref('邮件|离开|准备|庆祝|宿舍|注意|非常|家庭|去年|点心|上课|美丽|德国|一定|着急|铅笔|痛苦|必须|病人|现在|牛奶|月亮|早上|简单|瓶子|哥哥|音乐|筷子|还是|桌子|看见|一边|大声|风景|餐厅|木头|新年|嘴巴|应该|过来|今天|真好|奥利奥|键盘|真实|优联|蓝牙|无线|三明治|胶条|星夜|奶油|熊猫|可乐|海外|矩阵|塑料|大骨|营地|无限|虚拟|电玩|徽章|北极圈|仁王|怪物|猎人|大佬|开车|代组|亚克力|黄铜|不锈钢|铝锭|注塑|菠萝|霓虹|螺丝|卫星轴|红白机|幻影|日文|俄文|键帽|套件|碳纤维|玻纤|热升华|头发|客厅|游泳池|周末|弟弟|可爱|鹦鹉|漂白|电泳|武士道|码农|脉冲|蒸汽波|青柠|声波|橄榄|前锋|深空|原点|樱花|原厂|静电容|抛光|佳达隆|宁芝|北极星|退烧|吃瓜|解毒|摸鱼|樱桃|树懒|模拟|激光|阳极|喷涂|便当|夜行者|锤头鲨|核子|涂改|神佑|注音|桃花|暗黑|海岸|巧克力|斯巴达|鬼魂|爆裂|绿洲|标本|巫妖|永恒|奶昔|河马|使命|召唤|黑色|行动|白色|牛头|个性|战神|现代|战争|凯华|精微科|空间|东方|山水|微光|西装|血缘|诅咒|钢板|打卡|签到|上班|双模|单模|划水|外卖|赞助|打赏|机械|开关|游戏|无敌|瞎眼|心态|照片|润滑|联机|配重|设计|装饰|铭牌|定制|独木舟|边牧|产品|鼠标|外设|交流|磨砂|透光|打字|玩具|品牌|工作室')

// 保存词组至本地存储
function saveWords() {
  // 获取词组
  const words = wordsString.value.split('|')
  // 去重
  const uniqueWords = [...new Set(words)]
  // 检查词数是否足够最低限制
  if (uniqueWords.length < 20) {
    alert('保存失败，词组数量过少！')
    return
  }
  // 保存
  setWords(words)
}

</script>

<style lang="scss" scoped>
.q-tab-panels {
  background-color: transparent;

  .q-tab-panel {
    overflow: hidden;
  }
}
</style>
<style lang="scss">
.words-input {
  color: white;
  font-size: 18px;
  line-height: 1.5 !important;
  padding: 10px 0 !important;
  letter-spacing: 2px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}

.q-field__control::before {
  border-color: transparent !important;
}
</style>