// meetingApi.ts
import {
  CreateMeetingFormData,
  CategoryResponse,
  UpdateMeetingFormData,
} from '../types/meeting';
import { requestHeader } from './requestHeader';

export const createMeeting = async (
  data: CreateMeetingFormData
): Promise<CreateMeetingFormData> => {
  const response = await requestHeader.post<CreateMeetingFormData>(
    '/meetings',
    data,
    { withCredentials: true }
  );
  return response.data;
};

export const getCategory = async (): Promise<String[]> => {
  const response = await requestHeader.get<CategoryResponse>(
    `/meetings/category`,
    { withCredentials: true }
  );
  return response.data.categories;
};

// 모임 수정
export const updateMeeting = async (
  meetingid: number,
  data: UpdateMeetingFormData
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingid}`, data, {
    withCredentials: true,
  });
  return response.data;
};

// 모든 API 함수들을 하나의 객체로 내보내기
export const meetingApi = {
  createMeeting,
  getCategory,
};
