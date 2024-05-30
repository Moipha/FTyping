<template>
  <div class="items-center column">
    <!-- 词组卡片 -->
    <div class="q-mt-sm q-mb-xl row card-container items-center">
      <TransitionGroup name="card" appear>
        <q-card v-for="(card, index) in cards" :key="card.id" :class="getCardClass(index, card)"
          class="column justify-center items-center shadow-5">
          <div>{{ card.cn }}</div>
          <div>{{ card.en }}</div>
        </q-card>
      </TransitionGroup>
    </div>
    <!-- 计时、输入框、按钮 -->
    <div class="q-mt-xl row items-center full-width">
      <div class="col row justify-end">
        <div>
          <div class="time-limit shadow-3" :class="status ? '' : 'wrong'">{{ formatTime }}</div>
          <q-popup-edit class="popup" v-model="timeLimit" auto-save v-slot="scope">
            <q-input color="active" placeholder="限时时长(单位: 秒)" v-model="scope.value" autofocus
              @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </div>
      <div class="input-container shadow-3">
        <q-input ref="inputRef" :disable="!status" v-model="input" @keydown="handleTyping" input-class="input"
          borderless />
      </div>
      <div class="col row justify-start">
        <div class="btn-container shadow-3">
          <q-btn @keydown.space.prevent="restart" @click="restart" class="re-btn" icon="refresh" size="lg" flat />
        </div>
      </div>
    </div>
    <!-- 结果显示 -->
    <div class="result-container">
      <!-- wpm显示 -->
      <Transition name="wpm">
        <q-card v-if="!status" class="shadow-3 row justify-center">
          <div class="wpm correct">WPM {{ result.wpm }}</div>
        </q-card>
      </Transition>

      <!-- 正误词组显示 -->
      <Transition name="word">
        <div v-if="!status" class="row item-container">
          <div class="result-item col">
            <q-card class="col shadow-3 correct row justify-center">
              <q-expansion-item header-class="expansion" class="fit"
                :label='`正确 ${result.correctWords.length.toString()}`'>
                <div class="row expansion-container">
                  <q-card v-for="word in result.correctWords"
                    class="shadow-3 correct-card column justify-center items-center result-block">
                    <div>{{ word.cn }}</div>
                    <div>{{ word.typing }}</div>
                  </q-card>
                </div>
              </q-expansion-item>
            </q-card>
          </div>
          <div class="result-item col">
            <q-card class="col shadow-3 wrong row justify-center">
              <q-expansion-item header-class="expansion" class="fit"
                :label='`错误 ${result.wrongWords.length.toString()}`'>
                <div class="row expansion-container">
                  <q-card v-for="word in result.wrongWords"
                    class="shadow-3 wrong-card column justify-center items-center result-block">
                    <div>{{ word.cn }}</div>
                    <div>{{ word.typing }}</div>
                  </q-card>
                </div>
              </q-expansion-item>
            </q-card>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { WordCard } from '@/types'
import useTime from '@/hooks/TimeLimit/useTime'

const { cards, status, formatTime, timeLimit, input, inputRef, result, handleTyping, restart } = useTime()


// 动态属性
function getCardClass(index: number, card: WordCard) {
  let result = ''
  // 对指定位置的卡片添加样式
  if (index == 2) {
    result += 'mid-card '
  } else if (index == 0 || index == 4) {
    result += 'edge-card '
  }
  // 添加正误样式
  if (card.isCorrect != null) {
    if (card.isCorrect) {
      result += 'correct-card'
    } else {
      result += 'wrong-card'
    }
  }

  return result
}


</script>

<style lang="scss" scoped>
// 卡片
.card-container {
  gap: 40px;
  width: 1000px;
  height: 300px;
  overflow-x: hidden;
   
  .q-card {
    width: 180px;
    height: 180px;
    background-color: $bg;
    color: $text;
    opacity: .5;   
    transition: all 0.5s ease;
    font-size: 1.4em;
    border-radius: 20px;
  }

  // 中间的卡片
  .mid-card {
    height: 240px;
    width: 240px;
    opacity: 1;
    font-size: 2.5em;
  }

  // 边缘的卡片
  .edge-card {
    height: 120px;
    width: 120px;
    opacity: .2;
    font-size: 1em;
  }
}

// 计时器
.time-limit {
  height: 80px;
  line-height: 80px;
  padding: 0 20px;
  font-size: 3.4em;
  border-radius: 10px;
  cursor: pointer;
}

// 输入框
.input-container {
  height: 80px;
  border-radius: 10px;
  padding: 8px 0;
  margin: 0 10px;
  transition: .4s ease;
  border: solid 3px transparent;

  .q-input {
    width: 240px;
    font-size: 2.5em;
    padding-left: 10px;
  }

  &:focus-within {
    border-color: $active;
  }
}

// 重启按钮
.btn-container {
  border-radius: 10px;
  height: 80px;

  .re-btn {
    border-radius: 10px;
    height: 80px;
    width: 158px;
  }
}

// 结果
.result-container {
  margin: 10px 0;
  width: 580px;

  .q-card {
    border-radius: 10px;
    background-color: $bg;
  }

  .wpm {
    font-size: 3em;
    height: 80px;
    line-height: 80px;
  }

  .item-container {
    margin-top: 10px;
    gap: 10px;

    .result-item {
      .result-block {
        line-height: normal;
        font-size: 1.2em;
        padding: 10px 15px;
      }

      .expansion-container {
        gap: 5px;
        padding: 5px;
      }
    }

  }
}
</style>
<style lang="scss">
// 输入框
.input-container .input {
  color: $text;
  caret-color: $active;
}

// 扩展内容title样式
.expansion {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 2em;
  border-radius: 10px;
}


// 弹出代理样式
.popup {
  width: 100px;
  border-radius: 10px;
  box-shadow: none;

  .q-input {
    font-size: 3em;

    ::placeholder {
      font-size: 14px;
    }
  }
}
</style>