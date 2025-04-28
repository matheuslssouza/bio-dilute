import axios from "axios";

const API_URL = "http://localhost:8080";

const handleApi = async (endpoint, payload, token) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };

    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, payload ?? {}, { headers });
        return response;
    } catch (error) {
        console.log(`Error connecting to ${endpoint}`);
        throw error;
    }
};

export default handleApi;
