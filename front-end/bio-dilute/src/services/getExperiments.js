import axios from 'axios';


const API_URL = "http://localhost:8080";

export const getExperiments = async (token) => {
    const response = await axios.get(`${API_URL}/experiments`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response;
}

export default getExperiments
