import React, { useEffect, useState } from 'react';
import PlaceList from '../components/common/PlaceList';
import MeetingList from '../components/common/MeetingList';
import { PlaceListInfo } from '../types/placelist';
import { MettingListInfo } from '../types/meetinglist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { getPlaces } from '../api/placelist';
import { getMeeting } from '../api/meetinglist';
import '../styles/MainPage.scss';
import { dummyMeetingList } from '../data/tempMeetingListData';
import { dummyPlaceList } from '../data/tempPlaceListdata';

function MainPage() {
  const [placeList, setPlaceList] = useState<PlaceListInfo[]>([]); // 장소 목록 관리
  const [meetingList, setMeetingList] = useState<MettingListInfo[]>([]); // 모임 목록 관리

  // GET) 장소목록데이터 가져오기
  const getPlaceList = async () => {
    try {
      const data = await getPlaces({
        // sort: 'star',
        sort: 'date',
        page: 1,
        size: 5,
      });
      console.log(`data>>>>`, data.content);

      setPlaceList(data.content);
    } catch (error) {
      console.log('장소목록 가져오는 중 에러 발생!: ', error);
    }
  };

  // GET) 모임목록데이터 가져오기
  const getMeetingList = async () => {
    try {
      const data = await getMeeting({
        // sort: 'open',
        // page: 1,
        // size: 3,
      });
      console.log('meetingdata >>>>', data.data.dataList);

      setMeetingList(data.data.dataList);
    } catch (error) {
      console.log('모임목록 가져오는 중 에러 발생!', error);
    }
  };

  useEffect(() => {
    // setPlaceList(dummyPlaceList);
    // setMeetingList(dummyMeetingList);
    getPlaceList();
    getMeetingList();
  }, []);

  return (
    <section className="main">
      <section className="introduce">소개글</section>
      <section className="placelist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">인기 장소</h2>
            <p className="add">아이들과 함께 특별한 하루를 만들어보세요!</p>
          </div>
          <Link to={'/place'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <Swiper
          slidesPerView={2.5}
          spaceBetween={10}
          modules={[Pagination]}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="swiper"
        >
          {placeList.map((place) => (
            <SwiperSlide key={place.placeId}>
              <PlaceList
                key={place.placeId}
                placeId={place.placeId}
                placeName={place.placeName}
                category={place.category}
                // rating={place.rating}
                paid={place.paid}
                placeImg={place.placeImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="meetinglist-container">
        <div className="headline-container">
          <div className="title-container">
            <h2 className="title">신규 모임</h2>
            <p className="add">
              다양한 가족들과 함께하는 특별한 시간, 지금 시작해 보세요!
            </p>
          </div>
          <Link to={'/meeting'}>
            <div className="more">더보기</div>
          </Link>
        </div>
        <div className="meetingcard">
          {meetingList.slice(0, 4).map((meeting) => (
            <MeetingList
              meetingId={meeting.meetingId}
              meetingTitle={meeting.meetingTitle}
              meetingCategory={meeting.meetingCategory}
              location={meeting.location}
              meetingTime={meeting.meetingTime}
              writer={meeting.writer}
              participants={meeting.participants}
              meetingStatus={meeting.meetingStatus}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default MainPage;
