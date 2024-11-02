// meetingApi.ts
import {
  CreateMeetingFormData,
  CategoryResponse,
  UpdateMeetingFormData,
  MeetingJoinData,
} from '../types/meeting';
import { requestHeader } from './requestHeader';

export const postMeeting = async (
  data: CreateMeetingFormData
): Promise<CreateMeetingFormData> => {
  const response = await requestHeader.post<CreateMeetingFormData>(
    '/api/meeting',
    data,
    { withCredentials: true }
  );
  return response.data;
};

export const getCategory = async (): Promise<String[]> => {
  const response = await requestHeader.get<CategoryResponse>(
    `/api/meetings/category`,
    { withCredentials: true }
  );
  return response.data.categories;
};

export const putMeeting = async (
  meetingid: number,
  data: UpdateMeetingFormData
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingid}`, data, {
    withCredentials: true,
  });
  return response.data;
};

// 모임 떠나기
export const postLeaveMeeting = async (meetingid : number) => {
  const response = await requestHeader.post(`/api/userMeeting/leave`, meetingid, {withCredentials : true})
  return response;
}

// 모임 가입하기
export const postJoinMeeting = async (
  data: MeetingJoinData
) => {
  const response = await requestHeader.put(`/api/meeting/${data.meetingId}`, data, {
    withCredentials: true,
  });
  return response.data;
};


// 모든 API 함수들을 하나의 객체로 내보내기
export const meetingApi = {
  postMeeting,
  getCategory,
  putMeeting,
  postLeaveMeeting,
  postJoinMeeting
};
