<template>
  <div class="hljs-container" codetype="JavaScript" v-code>
      <highlightjs language="JavaScript" :autodetect="false" :code="props.htmlCode"></highlightjs>
  </div>
</template>

<script setup lang="ts">
import vCode from './line';

interface Props {
  htmlCode?: '';
}
const props = withDefaults(defineProps<Props>(), {
  htmlCode: '',
});
</script>

<style scoped lang="scss">
@import "./code.scss";
</style>