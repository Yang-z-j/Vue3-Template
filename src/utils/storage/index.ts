import { StorageType, Key, expire, Data, Result } from './storageType';
import { Dictionaries } from './dictionaries';

export const useStorage: StorageType = {
  //存储接受 key value 和过期时间 默认永久
  set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent) {
    //格式化数据
    const data = {
      value,
      [Dictionaries.expire]: expire
    };
    //存进去
    localStorage.setItem(key, JSON.stringify(data));
  },

  get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key);
    //读出来的数据是否有效
    if (value) {
      const obj: Data<T> = JSON.parse(value);
      const now = new Date().getTime();
      //有效并且是数组类型 并且过期了 进行删除
      if (typeof obj[Dictionaries.expire] == 'number' && obj[Dictionaries.expire] < now) {
        this.remove(key);
        return null;
      } else {
        //否则成功返回
        return obj.value;
      }
    } else {
      //否则key值无效
      return null;
    }
  },
  //删除某一项
  remove(key: Key) {
    localStorage.removeItem(key);
  },
  //清空所有值
  clear() {
    localStorage.clear();
  }
};
