import axios, {AxiosInstance} from "axios";

const API_URL = "http://localhost:5002/api/"
const create = () => {
  let http = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      // Authorization: Authorization ? `Bearer ${Authorization}` : '',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS'
    }
  })
  return http;
}

export default create();