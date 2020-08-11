import FakeMailTemplateProvider from './fakes/FakeMailTemplateProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const fakeMailTemplateProvider = new FakeMailTemplateProvider();
const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();

export { fakeMailTemplateProvider, handlebarsMailTemplateProvider };
