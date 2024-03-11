import { CompanionRecruitmentCard } from './scheme/accompany';

import api from '.';

const getCompanions = async (): Promise<CompanionRecruitmentCard[]> => {
  const { data } = await api.get<CompanionRecruitmentCard[]>({
    url: '/search/posts',
  });

  return data;
};

export default getCompanions;
