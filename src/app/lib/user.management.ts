import { apiPost } from "../services/axios.instance";
import {LOGIN,REGISTER} from '../services/api.constant';

class AuthService{
    //Register
    async createUser(data:any):Promise<any>{
        return apiPost(REGISTER,data);
    }

    //login
    async loginUser(data:any):Promise<any>{
        return apiPost(LOGIN,data);
    }
}

export const authService=new AuthService();
