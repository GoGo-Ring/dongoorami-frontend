import { Domain } from '~/app/login/_components/oauth-button/utils';

export const linkSocialLogin = (domain: Domain) => {
  return (window.location.href = `https://www.dongoorami.shop:8080/oauth2/authorization/${domain}`);
};
