import axios from '@/axios';
import { GetResponseType, GetRequestType, PostResponseType, PostRequestType } from './ParamsType';

// get信息
const getApiInfo = (params?: GetRequestType): Promise<GetResponseType> => axios.get(APIURL.getApiInfo, { params });

// post信息
const postApiInfo = (data?: PostRequestType): Promise<PostResponseType> => axios.post(APIURL.postIApinfo, data);

export { getApiInfo, postApiInfo };
