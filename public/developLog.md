# 2024/4/8

## 关于聚集和失焦

1. 在标签上添加 `tabindex: 0`可以让非交互元素获取焦点，使其能够触发 `@focus`和 `@blur`事件
2. 添加 `autofocus`属性可以在挂载时自动聚焦
3. 通过 `outline: none`来去除默认的聚焦样式


## 关于classList.toggle()

- 描述：

  * 如果元素的 class 列表中包含指定的类名，则该类名将被移除，并返回 `false`。
  * 如果元素的 class 列表中不包含指定的类名，则该类名将被添加，并返回 `true`。
- 语法：`element.classList.toggle(className);`
- 参数：

  - 第一个参数传入类名
  - 第二个参数传入布尔值，该布尔值为真则会添加类名，否则删除类名
