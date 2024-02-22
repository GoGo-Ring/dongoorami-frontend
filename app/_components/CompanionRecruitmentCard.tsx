import CompanionRecruitmentCardContainer from './CompanionRecruitmentCardContainer';

const CompanionRecruitmentCard = () => {
  return (
    <div className="p-4">
      <CompanionRecruitmentCardContainer>
        <CompanionRecruitmentCardContainer.Title
          title={
            '글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목'
          }
        />
        <CompanionRecruitmentCardContainer.ContentField>
          <CompanionRecruitmentCardContainer.ConditionItem
            label="공연명"
            contents="공연명공연명"
          />
          <CompanionRecruitmentCardContainer.ConditionItem
            label="성별"
            contents="무관"
          />
          <CompanionRecruitmentCardContainer.ConditionItem
            label="인원 수"
            contents={1}
          />
        </CompanionRecruitmentCardContainer.ContentField>
        <CompanionRecruitmentCardContainer.IconField>
          <CompanionRecruitmentCardContainer.IconWithCountItem
            icon={'icon'}
            count={1}
          />
          <CompanionRecruitmentCardContainer.IconWithCountItem
            icon={'icon'}
            count={1}
          />
        </CompanionRecruitmentCardContainer.IconField>
        <CompanionRecruitmentCardContainer.FooterField status={'모집 중'}>
          <CompanionRecruitmentCardContainer.UserId userId="사용자id" />
          <CompanionRecruitmentCardContainer.CreatedDate date="2024.02.19" />
        </CompanionRecruitmentCardContainer.FooterField>
      </CompanionRecruitmentCardContainer>
    </div>
  );
};

export default CompanionRecruitmentCard;
