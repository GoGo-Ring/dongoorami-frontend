export type Domain = 'kakao' | 'naver' | 'google';

export const getButtonStyle = (domain: Domain) => {
  return {
    kakao: 'bg-kakao text-black hover:bg-kakao',
    naver: 'bg-naver text-white hover:bg-naver',
    google: 'bg-google text-black hover:bg-google',
  }[domain];
};

export const getButtonConfig = (domain: Domain) => {
  return {
    kakao: {
      name: '카카오',
      icon: '/kakao-icon.svg',
    },
    naver: {
      name: '네이버',
      icon: '/naver-icon.svg',
    },
    google: {
      name: '구글',
      icon: '/google-icon.svg',
    },
  }[domain];
};
