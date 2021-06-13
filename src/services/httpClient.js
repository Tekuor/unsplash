import axios from 'axios';

const httpClient = axios.create({
    baseURL: "https://unsplash-api-g.herokuapp.com/api/",
    timeout: 90000,
    headers: {
        "Content-Type": "application/json",
    }
});

httpClient.interceptors.request.use(request => {
    return request
})

export default httpClient;