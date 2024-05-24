const KEY_PREFIX = 'PINIA_STORE_';

/**
 * pinia持久化插件
 * 持久化所有仓库
 * 可以根据store.$id进行过滤
 */
export default function (context: { store: any }) {
  const { store } = context;
  // 持久化仓库ID
  const persistID = ['userInfoStoreID'];
  if (!persistID.includes(store.$id)) {
    return;
  }
  const KEY = KEY_PREFIX + store.$id;
  // 保存到本地
  // 离开页面保存仓库
  window.addEventListener('beforeunload', () => {
    useStorage.set(KEY, store.$state);
  });
  // 恢复仓库
  try {
    const localState = useStorage.get(KEY);
    if (localState) {
      store.$patch(localState);
    }
  } catch (_err) {
    console.log(_err);
  }
}
