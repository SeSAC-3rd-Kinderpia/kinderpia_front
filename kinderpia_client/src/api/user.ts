import { LoginFormInputs } from '../types/user';
import { requestHeader } from './requestHeader';

// 로그인
export const postUserLogin = async (data: LoginFormInputs) => {
  const response = await requestHeader.post('/api/user/login', data, {
    withCredentials: true,
  });
  return response.data;
};

// 회원정보 중복검사
export const checkDuplicate = async (field: string, value: string) => {
  const response = await requestHeader.post(`/api/user/check/${field}`, {
    [field]: value,
  });
  return response;
};

// 회원조회
export const getUser = async () => {
  const response = await requestHeader.get(`/api/user`);
  return response;
};

// 회원정보수정
export const updateUser = async (data: { [key: string]: any }) => {
  const response = await requestHeader.put('/api/user', data);
  return response;
};

export const getUserMeetingScheduleList = async () => {
  const response = await requestHeader.get(`/api/user/meetingTime/list`);
  return response;
};
