// 参数和返回值类型
// 获取数据参数类型
export interface GetRequestType {
  name: string;
  age: number;
  sex: string;
}
// 获取数据返回值类型
export interface GetResponseType {
  data: {
    code: number;
    msg: string;
    data: unknown;
  };
}

// 发送数据参数类型
export interface PostRequestType {
  name: string;
  age: number;
  sex: string;
}
// 发送数据返回值类型
export interface PostResponseType {
  data: {
    code: number;
    msg: string;
    data: unknown;
  };
}
