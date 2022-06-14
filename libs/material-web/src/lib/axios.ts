import axios from 'axios';
// import config from './config';

// use this as axios instead of axios node module
const appAxios = axios.create({ baseURL: 'http://localhost:4000' });
export default appAxios;
