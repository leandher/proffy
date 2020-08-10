export default {
  secret: process.env.APP_SECRET || 'default',
  expiresIn: 8 * 60 * 60,
};
