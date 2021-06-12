import axios from 'axios';

const httpClient = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 90000,
    headers: {
        "Content-Type": "application/json",
    }
});

httpClient.interceptors.request.use(request => {
    return request
})

export default httpClient;