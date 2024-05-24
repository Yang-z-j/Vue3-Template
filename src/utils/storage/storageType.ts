import { Dictionaries } from './dictionaries';

export type Key = string; //key类型
export type expire = Dictionaries.permanent | Date | number; //有效期类型
export interface Data<T> {
  //格式化data类型
  value: T;
  [Dictionaries.expire]: Dictionaries.expire | Date | number;
}
export type Result<T> = T | null;
export interface StorageType {
  //class方法约束
  set: <T>(key: Key, value: T, expire?: expire) => void;
  get: <T>(key: Key) => Result<T>;
  remove: (key: Key) => void;
  clear: () => void;
}
