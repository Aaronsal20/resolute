import axios from 'axios';
import auth from './utils/auth';

const token = auth.getToken()
console.log("token", token)
const instance = axios.create({
    baseURL: 'https://resoluteai12.herokuapp.com',
    headers:  {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
});

export default instance;