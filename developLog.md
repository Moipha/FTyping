# 2024/4/8

## 关于聚集和失焦

1. 在标签上添加 `tabindex: 0`可以让非交互元素获取焦点，使其能够触发 `@focus`和 `@blur`事件
2. 添加 `autofocus`属性可以在挂载时自动聚焦
3. 通过 `outline: none`来去除默认的聚焦样式

# 2024/4/10

## 关于classList.toggle()

- 描述：

  - 如果元素的 class 列表中包含指定的类名，则该类名将被移除，并返回 `false`。
  - 如果元素的 class 列表中不包含指定的类名，则该类名将被添加，并返回 `true`。

- 语法：`element.classList.toggle(className);`
- 参数：

  - 第一个参数传入类名
  - 第二个参数传入布尔值，该布尔值为真则会添加类名，否则删除类名

# 2024/4/12

## 关于ref

- 在使用 `pinia`存储ref节点数据时，需要在ref所在的组件中获取一下，否则ref数据仍为初始值
- `const { words, caret, blocksContainer } = storeToRefs(useTypingStore())`

> 这里我引入 `blocksContainer`之后该ref才有了数据

# 2024/4/13

## 引入全局scss变量

- 在 `vite.config.ts`中进行配置

```typescript
// 默认引入quasar提供的样式变量
css: {
  preprocessorOptions: {
    scss: {
      additionalData: '@import "@/assets/variables.scss";'
    }
  }
}
```

# 2024/4/19

## TransitionGroup

- 关于shift()后动画播放错误的问题
  - 在 Vue 中，当使用 `v-for` 渲染列表时，每个列表项都会关联一个唯一的 `key`。当列表项发生变化时，Vue 会根据这些 `key` 来判断如何应用过渡效果。
  - 在之前的代码中，我们将 `index` 作为每个卡片容器的 `key`，这样当卡片发生变化时，Vue 可以正确识别每个卡片，并进行合适的过渡。但是，当使用 `shift()` 方法从数组中移除第一个元素时，由于 `v-for` 仅仅是根据索引来判断是否需要重新渲染，因此 Vue 不会重新计算卡片的 `key`。这就导致了在动画过程中，实际上移除的是第一个卡片，但 Vue 却认为是最后一个卡片被移除，从而产生了不符合预期的动画效果。
  - 解决办法：将 `key`设置成索引之外的值，如列表项内容
