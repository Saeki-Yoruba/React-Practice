import axios from 'axios';

const API_BASE = 'http://localhost:8080/auth';

const authService = {
    login: (credentials) => axios.post(`${API_BASE}/login`, credentials, { withCredentials: true }),
    register: (user) => axios.post(`${API_BASE}/register`, user, { withCredentials: true }),
    logout: () => axios.get(`${API_BASE}/logout`, { withCredentials: true }),
    isLoggedIn: () => axios.get(`${API_BASE}/isLoggedIn`, { withCredentials: true }),
    getUserInfo: () => axios.get(`${API_BASE}/userInfo`, { withCredentials: true }),
};

export default authService;
