export const ACITY_DOMAIN = process.env.REACT_APP_ACITY_DOMAIN;

export const buildUrl = (path: string) => `${ACITY_DOMAIN}${path}`;
