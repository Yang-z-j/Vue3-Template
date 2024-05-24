// 定义状态类型
interface stateType {
  text: string;
}

const useUserInfoStore = defineStore(
  StoreID.userInfoStoreID, // 唯一ID
  {
    // 状态
    state: (): stateType => {
      return {
        text: 'Hello,World!'
      };
    },
    // 获取
    getters: {
      getText(): string {
        return this.text;
      }
    },
    // 操作
    actions: {
      setText(text: string) {
        this.text = text;
      }
    }
  }
);

export default useUserInfoStore;
