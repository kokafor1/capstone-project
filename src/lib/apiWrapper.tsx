import axios from 'axios';
import { FactType, TokenType, UserFormDataType, UserType, FactFormDataType } from '../types';


const baseURL: string = 'https://capstone-backend-vipd.onrender.com'
const userEndpoint: string = '/users'
const tokenEndpoint: string = '/token'
const factEndpoint: string = '/dog_facts'

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
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

// async function getMe(token: string): Promise<{ data: any; error: string | undefined }> {
//     let data;
//     let error;
//     try {
//         const response = await axios.get(userEndpoint, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         data = response.data;
//     } catch (err) {
//         if (axios.isAxiosError(err)) {
//             const axiosError = err as AxiosError<any>;
//             if (axiosError.response) {
//                 error = axiosError.response.data.error;
//             } else {
//                 error = 'Network Error';
//             }
//         } else {
//             error = 'Something went wrong';
//         }
//     }
//     return { data, error };
// }

async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
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

async function createFact(token:string, factData: FactFormDataType): Promise<APIResponse<FactType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(factEndpoint, factData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function getAllFacts(): Promise<APIResponse<FactType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(factEndpoint);
        data = response.data
        console.log(data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getFactById(factId:string|number): Promise<APIResponse<FactType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(factEndpoint + '/' + factId)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Fact with ID ${factId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editFactById(factId:string|number, token:string, editedPostData:FactFormDataType): Promise<APIResponse<FactType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(factEndpoint + '/' + factId, editedPostData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Fact with ID ${factId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteFactById(factId:string|number, token:string): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(factEndpoint + '/' + factId)
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Fact with ID ${factId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

export {
    getMe,
    login,
    register,
    createFact,
    getAllFacts,
    getFactById,
    editFactById,
    deleteFactById
}