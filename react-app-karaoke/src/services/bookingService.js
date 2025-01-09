import axios from 'axios';

const API_BASE = 'http://localhost:8080/booking';

const bookingService = {
    /**
     * 新增預約
     * @param {Object} booking - 包含 startDateTime, endDateTime, userId, roomId 等
     * @returns {Promise} 返回新增預約的結果
     */
    createBooking: (booking) =>
        axios.post(`${API_BASE}/reservation`, booking, { withCredentials: true }),

    /**
     * 獲取用戶的所有預約
     * @returns {Promise} 返回當前用戶的預約列表
     */
    getUserBookings: () =>
        axios.get(API_BASE, { withCredentials: true }).then((res) => res.data.data),

    /**
     * 獲取所有預約（無需登入）
     * @returns {Promise} 返回所有預約列表
     */
    getAllBookings: () =>
        axios.get(`${API_BASE}/all`).then((res) => res.data.data),

    /**
     * 獲取單一預約詳情
     * @param {number} bookingId - 預約 ID
     * @returns {Promise} 返回指定預約的詳細信息
     */
    getBookingById: (bookingId) =>
        axios.get(`${API_BASE}/${bookingId}`, { withCredentials: true }).then((res) => res.data.data),

    /**
     * 更新預約
     * @param {number} bookingId - 預約 ID
     * @param {Object} booking - 包含更新的預約數據
     * @returns {Promise} 返回更新結果
     */
    updateBooking: (bookingId, booking) => {
        console.log('Sending update request:', bookingId, booking);
        return axios.put(`${API_BASE}/${bookingId}`, booking, { withCredentials: true })
            .then((res) => {
                console.log('Update successful:', res.data);
                return res.data;
            })
            .catch((err) => {
                console.error('Failed to update booking:', err.response || err.message);
                throw err;
            });
    },

    /**
     * 刪除預約
     * @param {number} bookingId - 預約 ID
     * @returns {Promise} 返回刪除結果
     */
    deleteBooking: (bookingId) =>
        axios.delete(`${API_BASE}/${bookingId}`, { withCredentials: true }),
};

export default bookingService;
