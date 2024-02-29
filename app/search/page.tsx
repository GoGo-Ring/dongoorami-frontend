import PerformanceInfoCard from './_component/PerformanceInfoCard';
import CompanionRecruitmentCard from '../_components/CompanionRecruitmentCard';
import FilterTabs from '../_components/filter-tabs';

const Page = () => {
  const performList = [
    {
      _id: 0,
      posterSrc: '',
      title: '제목',
      facilityName: '장소',
      startDate: new Date(),
      status: '공연 예정' as const,
    },
    {
      _id: 1,
      posterSrc: '',
      title: '제목22',
      facilityName: '장소',
      startDate: new Date(),
      status: '공연 예정' as const,
    },
    {
      _id: 2,
      posterSrc: '',
      title: '제목33',
      facilityName: '장소',
      startDate: new Date(),
      status: '공연 예정' as const,
    },
  ];

  const accompanyList = [
    {
      _id: 11,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 12,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 13,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 14,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
    {
      _id: 15,
      title: '콘서트 동행하실 분 구해요',
      concertName: '아이유 콘서트',
      userId: '작성자',
      gender: '무관',
      personCount: 1,
      viewCount: 3,
      commentsCount: 3,
      date: new Date(),
      status: '모집 중' as const,
    },
  ];

  return (
    <div className="flex">
      <FilterTabs />
      <span className="font-semibold">공연</span>
      <div className="mx-auto grid grid-cols-3">
        {performList.map(
          ({ _id, posterSrc, title, facilityName, startDate, status }) => (
            <PerformanceInfoCard
              key={_id}
              posterSrc={posterSrc}
              title={title}
              facilityName={facilityName}
              startDate={startDate}
              status={status}
            />
          ),
        )}
      </div>
      <div className="mx-auto grid grid-cols-3 gap-4">
        {accompanyList.map(
          ({
            _id,
            title,
            concertName,
            userId,
            gender,
            personCount,
            viewCount,
            commentsCount,
            date,
            status,
          }) => (
            <CompanionRecruitmentCard
              key={_id}
              title={title}
              concertName={concertName}
              userId={userId}
              gender={gender}
              personCount={personCount}
              viewCount={viewCount}
              commentsCount={commentsCount}
              date={date}
              status={status}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Page;
