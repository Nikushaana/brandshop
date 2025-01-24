import axios from "axios";

const axiosClient = axios.create({
  baseURL: `
  ${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosClient.interceptors.request.use((config) => {
  let token =
    localStorage.getItem("BrandShopAdmin");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
