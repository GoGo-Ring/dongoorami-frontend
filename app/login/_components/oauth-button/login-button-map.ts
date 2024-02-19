import { Domain } from './type';

export type ButtonStyle = {
  [key in Domain]: {
    name: string;
    bgColor: string;
    icon: string;
    textColor: 'text-black' | 'text-white';
  };
};

export const buttonStyle: ButtonStyle = {
  kakao: {
    name: '카카오',
    bgColor: 'bg-kakao',
    icon: '/kakao-icon.svg',
    textColor: 'text-black',
  },
  naver: {
    name: '네이버',
    bgColor: 'bg-naver',
    icon: '/naver-icon.svg',
    textColor: 'text-white',
  },
  google: {
    name: '구글',
    bgColor: 'bg-naver',
    icon: '/naver-icon.svg',
    textColor: 'text-white',
  },
};
