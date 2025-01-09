import React, { useEffect, useState } from 'react';
import roomService from '../services/roomService'; // 確保正確導入默認導出
import '../styles/RoomList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        roomService
            .getAllRooms() // 使用 roomService.getAllRooms()
            .then((data) => {
                console.log('Fetched rooms:', data); // 確認數據是否正確
                setRooms(data);
            })
            .catch((err) => console.error('Failed to fetch rooms:', err));
    }, []);

    return (
        <div className="room-list">
            <h2>房型介紹</h2>
            {rooms.length === 0 ? (
                <p>No rooms available.</p>
            ) : (
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id}>
                            <h3>房名 {room.roomNumber}</h3>
                            <p>最多容納人數: {room.capacity} 人</p>
                            <p>機型: {room.machineType}</p>
                            <p>一小時價格(每人): ${room.hourlyPrice}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomList;
