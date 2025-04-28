import axios from 'axios';


const API_URL = "http://localhost:8080";

export const getAuthToken = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth`, {
        username, password
    });

    return response.data;
}
