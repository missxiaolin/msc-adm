import dayjs from "dayjs";
import moment from "moment";
import { removeConfigLayout } from "@/utils/cache/local-storage";

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).format("YYYY-MM-DD HH:mm:ss") : "N/A";
};

/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = "";
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariableName);
  } catch (error) {
    console.error(error);
  }
  return cssVariableValue;
};

/** 用 JS 设置全局 CSS 变量 */
export const setCssVariableValue = (
  cssVariableName: string,
  cssVariableValue: string
) => {
  try {
    document.documentElement.style.setProperty(
      cssVariableName,
      cssVariableValue
    );
  } catch (error) {
    console.error(error);
  }
};

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout();
  location.reload();
};

/**
 * 日期
 * @param formatting  { subtractDay?: 0; format?: [] }
 * @returns 
 */
export const timeQuantum = (formatting: any) => {
  let { subtractDay = 0, format = <any>[] } = formatting;
  format = format.length ? format : ["HH:mm:ss", "HH:mm:ss"];
  let startDateTime = moment()
      .subtract("days", subtractDay)
      .format(`YYYY-MM-DD ${format[0]}`),
    endDateTime = moment().format(`YYYY-MM-DD ${format[1]}`);
  return [startDateTime, endDateTime];
};


/**
 * @d 当前日期
 * @returns
 */
export const currentDate = (subtractDay: number = 0) => {
	let now = moment().format("YYYY-MM-DD");
	if (subtractDay) {
		now = moment().subtract("days", subtractDay).format("YYYY-MM-DD");
	}
	return now;
};

/**
 * 数值转换 千，万
 */
export const numberFormat = (value: any = "") => {
	let k = 10000;
	let sizes = ["", "万", "亿", "万亿"];
	let i, lastNum;
	if (value < k) {
		value = value;
	} else {
		i = Math.floor(Math.log(value) / Math.log(k));
		lastNum = value / Math.pow(k, i);
		value = Math.floor(lastNum * 100) / 100 + sizes[i];
	}
	return value;
};