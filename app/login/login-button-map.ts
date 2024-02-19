type Corp = 'kakao' | 'naver' | 'X' | 'google';

export type ButtonStyle = {
  [key in Corp]: {
    name: string;
    bgcolor: string;
    icon: string;
    txtcolor: 'black' | 'white';
  };
};

export const buttonStyle: {
  [key in Corp]: {
    name: string;
    bgcolor: string;
    icon: string;
    txtcolor: 'black' | 'white';
  };
} = {
  kakao: {
    name: '카카오',
    bgcolor: 'bg-kakao',
    icon: '/kakao-icon.svg',
    txtcolor: 'black',
  },
  X: {
    name: 'X',
    bgcolor: 'bg-black',
    icon: '/x-white-icon.svg',
    txtcolor: 'white',
  },
  naver: {
    name: '네이버',
    bgcolor: 'bg-naver',
    icon: '/naver-icon.svg',
    txtcolor: 'white',
  },
  google: {
    name: '구글',
    bgcolor: 'bg-naver',
    icon: '/naver-icon.svg',
    txtcolor: 'white',
  },
};
