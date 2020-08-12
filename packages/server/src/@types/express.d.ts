/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}

declare module 'nodemailer-express-handlebars';
