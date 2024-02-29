import PerformanceInfoCard from './_component/PerformanceInfoCard';

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

  return (
    <div className="flex">
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
  );
};

export default Page;
