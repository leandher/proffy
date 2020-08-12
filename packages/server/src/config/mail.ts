const config = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  default: {
    from: 'Equipe Proffy <noreply@proffy.com>',
  },
};

export default config;
