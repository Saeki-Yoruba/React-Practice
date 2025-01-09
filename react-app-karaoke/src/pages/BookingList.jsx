import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import roomService from '../services/roomService';
import '../styles/BookingList.css';

const BookingList = ({ user }) => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [editBookingId, setEditBookingId] = useState(null);

    useEffect(() => {
        if (user) {
            bookingService
                .getUserBookings()
                .then((data) => {
                    const now = new Date();
                    const upcomingBookings = data.filter(
                        (booking) => new Date(booking.endTime) > now
                    );
                    setBookings(upcomingBookings);
                })
                .catch((err) => console.error('Failed to fetch bookings:', err));
        }
    }, [user]);

    useEffect(() => {
        roomService
            .getAllRooms()
            .then((data) => setRooms(data))
            .catch((err) => console.error('Failed to fetch rooms:', err));
    }, []);

    const handleDelete = (bookingId) => {
        if (window.confirm('請問您確定要刪除預約?')) {
            bookingService
                .deleteBooking(bookingId)
                .then(() => {
                    alert('刪除成功');
                    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
                })
                .catch((err) => {
                    console.error('刪除失敗:', err);
                    alert('刪除失敗，請再試一次。');
                });
        }
    };

    const handleEdit = (bookingId) => {
        setEditBookingId(bookingId);
    };

    const handleUpdate = (bookingId, updatedBooking) => {
        bookingService
            .updateBooking(bookingId, updatedBooking)
            .then((updatedData) => {
                alert('預約修改成功');
                setEditBookingId(null);
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking.id === bookingId ? { ...booking, ...updatedData } : booking
                    )
                );
            })
            .catch((err) => {
                console.error('修改失敗:', err);
                alert(err.response?.data?.message || '修改失敗，請再試一次。');
            });
    };

    return (
        <div className="booking-list">
            <h2>我的預約</h2>
            {bookings.length === 0 ? (
                <p>目前沒有即將到來的預約。</p>
            ) : (
                <ul className="booking-cards">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="booking-card">
                            {editBookingId === booking.id ? (
                                <EditBookingForm
                                    booking={booking}
                                    rooms={rooms}
                                    onCancel={() => setEditBookingId(null)}
                                    onSubmit={(updatedBooking) =>
                                        handleUpdate(booking.id, updatedBooking)
                                    }
                                />
                            ) : (
                                <>
                                    <h3>房號: {booking.roomId}</h3>
                                    <p>
                                        開始時間:{' '}
                                        {`${new Date(booking.startTime).getFullYear()}/${new Date(booking.startTime).getMonth() + 1
                                            }/${new Date(booking.startTime).getDate()} ${new Date(booking.startTime).getHours()
                                            }點`}
                                    </p>
                                    <p>
                                        結束時間:{' '}
                                        {`${new Date(booking.endTime).getFullYear()}/${new Date(booking.endTime).getMonth() + 1
                                            }/${new Date(booking.endTime).getDate()} ${new Date(booking.endTime).getHours()
                                            }點`}
                                    </p>
                                    <button
                                        onClick={() => handleEdit(booking.id)}
                                        className="edit-btn"
                                    >
                                        編輯
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking.id)}
                                        className="delete-btn"
                                    >
                                        刪除
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const EditBookingForm = ({ booking, rooms, onCancel, onSubmit }) => {
    const [roomId, setRoomId] = useState(booking.roomId);
    const [date, setDate] = useState(booking.startTime.split('T')[0]);
    const [startTime, setStartTime] = useState(
        new Date(booking.startTime).getHours()
    );
    const [endTime, setEndTime] = useState(
        new Date(booking.endTime).getHours()
    );

    // 開始時間範圍從 10:00 到 20:00
    const startTimes = Array.from({ length: 11 }, (_, i) => 10 + i); // [10, ..., 20]
    // 結束時間範圍從 11:00 到 21:00
    const endTimes = Array.from({ length: 11 }, (_, i) => 11 + i); // [11, ..., 21]

    const handleSubmit = (e) => {
        e.preventDefault();
        const startTimeFormatted = `${date}T${startTime.toString().padStart(2, '0')}:00:00`;
        const endTimeFormatted = `${date}T${endTime.toString().padStart(2, '0')}:00:00`;
        const updatedBooking = {
            roomId,
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
        };
        onSubmit(updatedBooking);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-booking-form">
            <label>
                房型：
                <select
                    value={roomId}
                    onChange={(e) => setRoomId(Number(e.target.value))}
                >
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.roomNumber} - {room.capacity}人 - 每小時{room.hourlyPrice}元
                        </option>
                    ))}
                </select>
            </label>
            <label>
                日期：
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <label>
                開始時間：
                <select
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                >
                    {startTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}:00
                        </option>
                    ))}
                </select>
            </label>
            <label>
                結束時間：
                <select
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                >
                    {endTimes.map((time) => (
                        <option
                            key={time}
                            value={time}
                            disabled={time <= startTime}
                        >
                            {time}:00
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">儲存</button>
            <button type="button" onClick={onCancel}>
                取消
            </button>
        </form>
    );
};


export default BookingList;
