import axios from 'axios';
import config from './config';

// use this as axios instead of axios node module
const appAxios = axios.create({ baseURL: config.apiBaseUri });
export default appAxios;