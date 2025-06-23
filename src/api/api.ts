import axios from "axios";

// export const api: string = "https://user-management-api-54gc.onrender.com/api";
const api: string = "http://localhost:4989/api";

const API = axios.create({ baseURL: api })

API.interceptors.request.use(req => {
  const token = localStorage.getItem("token")
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export default API