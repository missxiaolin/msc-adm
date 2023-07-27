<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>


<script setup lang="ts">
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { resetConfigLayout } from "@/utils"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()
/** 初始化主题 */
initTheme()
// ElNotification({
//   title: "Hello",
//   type: "success",
//   message: h(
//     "a",
//     { style: "color: teal", target: "_blank", href: "" },
//     ""
//   ),
//   duration: 0,
//   position: "bottom-right"
// })
// ElNotification({
//   title: "破坏性更新",
//   type: "warning",
//   message: h(
//     "span",
//     {
//       style: "color: teal; cursor: pointer;",
//       onClick: resetConfigLayout
//     },
//     ""
//   ),
//   duration: 0,
//   position: "bottom-right",
//   offset: 150
// })
</script>



<style scoped lang="scss">
</style>
