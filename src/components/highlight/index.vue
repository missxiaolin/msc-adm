<template>
  <div class="hljs-container" codetype="JavaScript" :errorLine="props.errorLine" v-code="props.errorLine">
      <highlightjs language="JavaScript" :autodetect="false" :code="props.htmlCode"></highlightjs>
  </div>
</template>

<script setup lang="ts">
import vCode from './line';

interface Props {
  htmlCode?: '',
  errorLine?: 0
}
const props = withDefaults(defineProps<Props>(), {
  htmlCode: '',
  errorLine: 0
});
</script>

<style scoped lang="scss">
@import "./code.scss";
</style>