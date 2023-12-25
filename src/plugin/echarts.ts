// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import {
	BarChart,
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	LineChart,
	ScatterChart,
	EffectScatterChart,
	PieChart,
	LineSeriesOption,
} from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
	TitleComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponent,
	TooltipComponentOption,
	LegendComponent,
	ToolboxComponent,
	GridComponent,
	GridComponentOption,
	GeoComponent,
	// 缩放
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	VisualMapComponent,
	// 数据集组件
	DatasetComponent,
	DatasetComponentOption,
	// DataZoomComponentOption,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<BarSeriesOption | LineSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption>;

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	GeoComponent,
	BarChart,
	ScatterChart,
	EffectScatterChart,
	PieChart,
	LineChart,
	LabelLayout,
	LegendComponent,
	ToolboxComponent,
	UniversalTransition,
	VisualMapComponent,
	CanvasRenderer,
]);

export default echarts;
