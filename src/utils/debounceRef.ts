import { customRef } from 'vue';

/**
 * 使用防抖方式获取ref值
 * @param value - 原始值
 * @param duration - 防抖时间，默认为1000毫秒
 * @returns {Ref} - 防抖的ref对象
 */
export function useDebounceRef(value: any, duration: number = 1000) {
  let timeout: any = null;
  return customRef((track, trigger) => {
    return {
      /**
       * 获取ref值
       * @returns {any} - 原始值
       */
      get() {
        track();
        return value;
      },
      /**
       * 设置ref值
       * @param val - 设置的值
       */
      set(val) {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = val;
          trigger();
        }, duration);
      }
    };
  });
}
