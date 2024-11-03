// MyPage.tsx
import React, { useEffect, useState } from 'react';
import MyInfo from '../components/MyPage/MyInfo';
import MyReviews from '../components/MyPage/MyReviews';
import MeetingHistory from '../components/MyPage/MeetingHistory';
import Tab from '../components/MyPage/Tab';
import '../styles/mypage/MyPage.scss';
import axios from 'axios';
import { extractUserIdFromCookie } from '../utils/extractUserIdFromCookie';

const MyPage: React.FC = () => {
  const tabs = ['내 정보', '모임 내역', '나의 리뷰'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null); // 유저 정보를 저장할 상태

  // 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    const userIdFromCookie = extractUserIdFromCookie();
    console.log(userIdFromCookie);

    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchUserInfo(userIdFromCookie); // 사용자 정보 요청
    }
  }, []);

  // 사용자 조회 api
  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data.data); // 응답 데이터를 상태로 설정
    } catch (error) {
      console.error('유저 정보를 불러오는 중 오류 발생:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case '내 정보':
        return <MyInfo userId={userId} userInfo={userInfo} />;
      case '모임 내역':
        return <MeetingHistory userId={userId} />;
      case '나의 리뷰':
        return <MyReviews />;
      default:
        return null;
    }
  };

  return (
    <section id="mypage">
      <div className="title-wrap">
        <h2 className="title">마이페이지</h2>
      </div>
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </section>
  );
};

export default MyPage;
