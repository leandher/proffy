import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://192.168.2.17:3333/',
});

export default api;
