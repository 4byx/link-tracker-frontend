// src/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};
