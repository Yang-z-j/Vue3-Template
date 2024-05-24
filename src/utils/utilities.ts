/**
 * @description: 获取范围内的随机整数
 * @param number min - 最小值
 * @param number max - 最大值
 * @returns number 随机整数
 * @throws Error 如果min或max不是数字，或者min大于max，则抛出错误
 */
export const getRandomInt = (min: number, max: number): number => {
  const isValidNumber = (value: number): boolean => {
    return typeof value === 'number' && !isNaN(value);
  };

  if (!isValidNumber(min) || !isValidNumber(max) || min > max) {
    throw new Error('Invalid arguments. Both min and max must be numbers, and min <= max.');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @description: 递归深拷贝对象
 * @param visitedMap: WeakMap<{}, T> 用于存储已访问过的对象的 WeakMap (可选)
 * @returns {*} 深拷贝后的对象
 */
export const deepClone = <T>(obj: T, visitedMap: WeakMap<{}, T> = new WeakMap()): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj as T;
  }

  if (visitedMap.has(obj)) {
    return visitedMap.get(obj) as T;
  }

  visitedMap.set(obj, obj);

  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  if (obj instanceof Error) {
    return new Error(obj.message) as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  }

  if (typeof obj === 'function') {
    return new Function((obj as Function).toString())() as T;
  }

  if (Array.isArray(obj)) {
    const clone = [];
    for (let item of obj) {
      clone.push(deepClone(item, visitedMap));
    }
    return clone as T;
  }

  if (obj.constructor === Object) {
    const clone = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
    for (let [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, visitedMap);
    }
    return clone as T;
  }

  if (obj instanceof Set) {
    const clone = new Set();
    for (let item of obj) {
      clone.add(deepClone(item, visitedMap));
    }
    return clone as T;
  }

  if (obj instanceof Map) {
    const clone = new Map();
    for (let [key, value] of obj.entries()) {
      clone.set(key, deepClone(value, visitedMap));
    }
    return clone as T;
  }

  return obj as T;
};

/**
 * @description: 生成一个带有随机RGB和指定透明度的RGBA颜色字符串。
 * @param opacity - 颜色的透明度，默认为不透明。
 * @returns string - RGBA颜色字符串。
 * @throws Error 如果opacity不是数字，则抛出错
 */
export const getRandomColor = (opacity: number = 1): string => {
  const isValidNumber = (value: number): boolean => {
    return typeof value === 'number' && !isNaN(value);
  };

  if (!isValidNumber(opacity)) {
    throw new Error('Invalid arguments. opacity value must be numbers.');
  }

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const alpha = +opacity.toFixed(2);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * @description: 获取元素大小
 * @param element 元素标识
 * @returns 返回一个包含元素宽度和高度的对象
 * @throws Error 如果未获取到元素或元素尚未渲染，则抛出错
 */
export const getElementSize = (element: string): { width: number; height: number } => {
  const dom = document.querySelector(element);

  if (!dom) {
    throw new Error(`Element with ID '${element}' not found.`);
  }

  const rect = dom.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height
  };
};
