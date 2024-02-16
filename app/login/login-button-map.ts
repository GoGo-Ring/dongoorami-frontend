export const ButtonStyle: {
  [key: string]: {
    name: string;
    bgcolor: string;
    icon: string;
    txtcolor: string;
    alt: string;
  };
} = {
  kakao: {
    name: '카카오',
    bgcolor: 'bg-kakao',
    icon: '/kakao-icon.svg',
    txtcolor: 'black',
    alt: '카카오 로그인',
  },
  X: {
    name: 'X',
    bgcolor: 'bg-black',
    icon: '/x-white-icon.svg',
    txtcolor: 'white',
    alt: 'X 로그인',
  },
  naver: {
    name: '네이버',
    bgcolor: 'bg-naver',
    icon: '/naver-icon.svg',
    txtcolor: 'white',
    alt: '네이버 로그인',
  },
};
