export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC__KAKAO_REST_API_KEY;
export const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC__KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const NAVER_REST_API_KEY = process.env.NEXT_PUBLIC__NAVER_REST_API_KEY;
export const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC__NAVER_REDIRECT_URI;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=STATE_STRING`;
