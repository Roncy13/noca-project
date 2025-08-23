import logger from '@config/logger';

export default async () => {
  logger.info('Implement async await app use for DB connection before starting the app');
  await new Promise((resolve) => setTimeout(resolve, 3000));
}