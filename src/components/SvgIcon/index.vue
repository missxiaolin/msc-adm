<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts">
import { computed } from "vue";
export default {
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);

    return {
      symbolId,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
