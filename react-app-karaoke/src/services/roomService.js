import axios from 'axios';

const API_BASE = 'http://localhost:8080/rooms';

const getAllRooms = async () => {
    try {
        const response = await axios.get(API_BASE);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch rooms:', error);
        throw error; // 將錯誤向上拋出以供調用方處理
    }
};

export default {
    getAllRooms,
};
