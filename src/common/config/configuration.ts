export default () => {
  const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

  return {
    environment: process.env.NODE_ENV || 'development',
    refreshToken: process.env[`${env}_REFRESH_TOKEN`],
    accessToken: process.env[`${env}_ACCESS_TOKEN`],
    baseUrl: process.env[`${env}_BASE_URL`],
    swaggerUser: process.env.SWAGGER_USER,
    swaggerPassword: process.env.SWAGGER_PASSWORD
  };
};
