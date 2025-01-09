import React, { useState, useEffect } from 'react';
import bookingService from '../services/bookingService';
import roomService from '../services/roomService';
import '../styles/AddBooking.css';

const AddBooking = () => {
    const [rooms, setRooms] = useState([]); // 存儲房型資料
    const [roomId, setRoomId] = useState(''); // 已選擇的房型
    const [date, setDate] = useState(''); // 已選擇的日期
    const [startTime, setStartTime] = useState(null); // 已選擇的開始時間
    const [endTime, setEndTime] = useState(null); // 已選擇的結束時間

    // 時間範圍從 10:00 到 21:00，但開始時間最晚為 20:00
    const startTimes = Array.from({ length: 11 }, (_, i) => 10 + i); // 10:00 到 20:00
    const endTimes = Array.from({ length: 12 }, (_, i) => 10 + i); // 10:00 到 21:00

    // 獲取房型列表
    useEffect(() => {
        roomService
            .getAllRooms()
            .then((data) => {
                setRooms(data);
            })
            .catch((err) => console.error('無法獲取房型資料:', err));
    }, []);

    const handleTimeSelection = (type, time) => {
        if (type === 'start') {
            setStartTime(time);
            if (endTime && time >= endTime) {
                setEndTime(null); // 重置結束時間，避免時間範圍錯誤
            }
        } else if (type === 'end') {
            setEndTime(time);
        }
    };

    const handleBooking = async () => {
        if (!roomId) {
            alert('請選擇房型。');
            return;
        }

        if (!date || startTime === null || endTime === null) {
            alert('請選擇日期、開始時間和結束時間。');
            return;
        }

        if (startTime >= endTime) {
            alert('結束時間必須晚於開始時間。');
            return;
        }

        const startTimeFormatted = `${date}T${startTime.toString().padStart(2, '0')}:00:00`;
        const endTimeFormatted = `${date}T${endTime.toString().padStart(2, '0')}:00:00`;

        const requestData = {
            roomId,
            startTime: startTimeFormatted,
            endTime: endTimeFormatted
        };

        console.log('預約資料:', requestData);

        try {
            await bookingService.createBooking(requestData);
            alert('預約成功！');
            setRoomId('');
            setDate('');
            setStartTime(null);
            setEndTime(null);
        } catch (err) {
            console.error('預約失敗:', err.response?.data || err.message);
            alert('預約失敗: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="add-booking">
            <h2>新增預約</h2>
            <label>
                選擇房型：
                <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                >
                    <option value="">請選擇房型</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.roomNumber} - {room.capacity}人 - 每小時{room.hourlyPrice}元
                        </option>
                    ))}
                </select>
            </label>
            <label>
                選擇日期：
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <div className="time-selection">
                <div>
                    <label>開始時間：</label>
                    <div className="time-buttons">
                        {startTimes.map((time) => (
                            <button
                                key={time}
                                className={startTime === time ? 'selected' : ''}
                                onClick={() => handleTimeSelection('start', time)}
                            >
                                {time}:00
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label>結束時間：</label>
                    <div className="time-buttons">
                        {endTimes.map((time) => (
                            <button
                                key={time}
                                className={
                                    endTime === time
                                        ? 'selected'
                                        : startTime !== null && time <= startTime
                                            ? 'disabled'
                                            : ''
                                }
                                onClick={() => handleTimeSelection('end', time)}
                                disabled={startTime !== null && time <= startTime}
                            >
                                {time}:00
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={handleBooking}>確認預約</button>
        </div>
    );
};

export default AddBooking;
