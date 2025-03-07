import axios from "axios";
import * as AJAX  from './AJAX';

const baseURL = process.env.BACKEND_URL;
const instance = axios.create({
  baseURL: baseURL
});

const checkCurrentUser = async() =>{
  try {
    let result = await AJAX.get(`${b4aSettings.BACK4APP_API_PATH}/me`);
    if (!result.username) window.location = '/'
  } catch (err){
    if (err.message == "Unauthorized!") window.location = '/'
  }
}

instance.interceptors.response.use(async (response) => {
  const { data, status } = response;
  if (status === 200 && typeof data !== "object"){
    await checkCurrentUser();
  }
  return response;
}, async (error) => {
    await checkCurrentUser();
    return Promise.reject(error);
  }
)

export default instance