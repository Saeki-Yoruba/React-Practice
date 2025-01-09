import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import '../styles/AllBookings.css';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份從 0 開始
        const day = date.getDate();
        const hour = date.getHours(); // 取得 24 小時制的時間
        return `${year}/${month}/${day} ${hour}點`;
    };

    useEffect(() => {
        bookingService
            .getAllBookings()
            .then((data) => {
                console.log('Fetched all bookings:', data);
                const now = new Date();
                const upcomingBookings = data.filter(
                    (booking) => new Date(booking.endTime) > now
                );
                const sortedBookings = upcomingBookings.sort((a, b) =>
                    new Date(a.startTime) - new Date(b.startTime)
                );
                setBookings(sortedBookings);
            })
            .catch((err) => console.error('Failed to fetch all bookings:', err));
    }, []);

    return (
        <div className="all-bookings">
            <h2>所有預約</h2>
            {bookings.length === 0 ? (
                <p>No upcoming bookings available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>預約編號</th>
                            <th>用戶ID</th>
                            <th>房號</th>
                            <th>開始時間</th>
                            <th>結束時間</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.userId}</td>
                                <td>{booking.roomId}</td>
                                <td>{formatDateTime(booking.startTime)}</td>
                                <td>{formatDateTime(booking.endTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBookings;
