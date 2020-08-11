import { handlebarsMailTemplateProvider } from '@providers/MailTemplateProvider';

import { MailTrapMailProvider } from './implementations/MailTrapMailProvider';

const mailTrapMailProvider = new MailTrapMailProvider(handlebarsMailTemplateProvider);

export { mailTrapMailProvider };
