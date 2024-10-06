import { cookies } from "next/headers";
import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { getNewAccessToken } from "@/src/services/AuthService";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookieStore = cookies(); // Access server-side cookies
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken; // No 'Bearer', just the token
    }
    // console.log({ accessToken });

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const newAccessToken = res.data.accessToken;

      cookies().set("accessToken", newAccessToken); // Update accessToken on server-side
      config.headers.Authorization = newAccessToken; // No 'Bearer', just the token

      return axiosInstance(config); // Retry the request with the new token
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
