import type { EChartsOption } from "echarts";
import { Ref, watch } from "vue";
import { useTimeoutFn } from "@/hooks/useTimeout";
import { Fn, tryOnUnmounted } from "@vueuse/core";
import { unref, nextTick, computed, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useEventListener } from "@/hooks/useEventListener";
import echarts from "@/plugin/echarts";
/**
 * 主题
 * https://echarts.apache.org/zh/theme-builder.html
 * https://echarts.apache.org/handbook/zh/concepts/style/
 * @return {*}
 */

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: "light" | "dark" | "default" = "default"
) {
  const getDarkMode = computed(() => {
    return theme;
  });
  //echart 实例
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: Fn = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeResizeFn: Fn = () => {};

  resizeFn = useDebounceFn(resize, 200);
  /**
   * @description:  整合 默认配置项 && 设置数据项
   * @param {*} computed
   * @return {*}
   */
  const getOptions = computed(() => {
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value,
    } as EChartsOption;
  });
  /**
   * @description: 初始化 echart
   * @return {*}
   */
  function initCharts() {
    // echart dom
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el);
    //创建监听
    const { removeEvent } = useEventListener({
      el: window,
      name: "resize",
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    if (el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }
  /**
   * @description: 设置echarts 数据项
   * @param {EChartsOption} options
   * @param {*} clear
   * @return {*}
   */
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  watch(
    () => getDarkMode.value,
    () => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts();
        setOptions(cacheOptions.value);
      }
    }
  );

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
