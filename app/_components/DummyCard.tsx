import CompanionRecruitmentCard from './companion-recruitment-card';

export const DummyCard = () => {
  return (
    <div className="flex items-center justify-center">
      <CompanionRecruitmentCard
        id={12}
        title="동행 구해요"
        writer="작성자"
        createdAt={'2024-03-18'}
        updatedAt={'2024-03-18'}
        status="모집 중"
        concertName="콘"
        viewCount={3}
        commentCount={3}
        gender="남"
        totalPeople={2}
      />
    </div>
  );
};
