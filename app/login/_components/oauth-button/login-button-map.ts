import { domain } from './type';

export type ButtonStyle = {
  [key in domain]: {
    name: string;
    bgColor: string;
    icon: string;
    txtColor: 'black' | 'white';
  };
};

export const buttonStyle: {
  [key in domain]: {
    name: string;
    bgColor: string;
    icon: string;
    txtColor: 'black' | 'white';
  };
} = {
  kakao: {
    name: '카카오',
    bgColor: 'bg-kakao',
    icon: '/kakao-icon.svg',
    txtColor: 'black',
  },
  naver: {
    name: '네이버',
    bgColor: 'bg-naver',
    icon: '/naver-icon.svg',
    txtColor: 'white',
  },
  google: {
    name: '구글',
    bgColor: 'bg-naver',
    icon: '/naver-icon.svg',
    txtColor: 'white',
  },
};
