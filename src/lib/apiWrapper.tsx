import axios, {AxiosError} from 'axios';
import { TokenType, UserFormDataType, UserType } from '../types';


const baseURL: string = 'http://127.0.0.1:5000'
const userEndpoint: string = '/users'
const tokenEndpoint: string = '/token'

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})



type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMe(token: string): Promise<{ data: any; error: string | undefined }> {
    let data;
    let error;
    try {
        const response = await axios.get(userEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<any>;
            if (axiosError.response) {
                error = axiosError.response.data.error;
            } else {
                error = 'Network Error';
            }
        } else {
            error = 'Something went wrong';
        }
    }
    return { data, error };
}

export {
    getMe,
    login,
    register
}