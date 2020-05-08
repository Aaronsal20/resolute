import axios from 'axios';
import auth from './utils/auth';

const token = auth.getToken()
console.log("token", token)
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers:  {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
});

export default instance;