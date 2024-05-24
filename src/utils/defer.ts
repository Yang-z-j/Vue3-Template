import { ref, onUnmounted } from 'vue';
/**
 * 使用 `useDefer` 组件提供递归帧计数的功能。
 *
 * @description 递归帧计数器，用于根据最大延迟帧数判断是否达到或超过指定帧数。
 * @param {number} maxDefer 最大延迟帧数，默认为100。
 * @return {Function} 返回一个函数，用于根据帧数判断是否达到或超过指定帧数。
 */
export function useDefer(maxDefer: number = 100): Function {
  // 响应式数据
  const frameCount = ref(1);
  let refId: number;

  /**
   * @description 递归更新帧数。
   * @returns {void}
   */
  function updateFrameCount(): void {
    refId = requestAnimationFrame(() => {
      frameCount.value++;
      // 超过最大帧数退出
      if (frameCount.value >= maxDefer) {
        return;
      }
      updateFrameCount();
    });
  }

  updateFrameCount();

  // 组件卸载清除
  onUnmounted(() => {
    cancelAnimationFrame(refId);
  });

  /**
   * 根据传入的帧数判断是否达到或超过该帧数。
   *
   * @description 根据传入的帧数判断是否达到或超过该帧数。
   * @param {number} n 需要判断的帧数。
   * @returns {boolean} 返回一个布尔值，表示是否达到或超过该帧数。
   */
  return function (n: number): boolean {
    return frameCount.value >= n;
  };
}
