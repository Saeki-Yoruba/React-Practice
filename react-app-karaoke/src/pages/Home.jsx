import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // 引入樣式

const Home = ({ user }) => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>歡迎來到 KTV 預約系統</h1>
                <p>快速預訂房間，享受唱歌的樂趣！</p>
            </header>
            <div className="home-actions">
                {user ? (
                    <>
                        <Link to="/all-bookings" className="home-button">
                            預約狀況
                        </Link>
                        <Link to="/bookings" className="home-button">
                            我的預約
                        </Link>
                        <Link to="/add-booking" className="home-button">
                            新增預約
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/rooms" className="home-button">
                            查看房間
                        </Link>
                        <Link to="/login" className="home-button">
                            登入系統
                        </Link>
                        <Link to="/register" className="home-button">
                            註冊帳號
                        </Link>
                    </>
                )}
            </div>
            <section className="home-features">
                <h2>功能介紹</h2>
                <ul>
                    <li>輕鬆瀏覽所有可用的 KTV 房間</li>
                    <li>快速預訂，選擇適合你的時間和房型</li>
                    <li>即時查看個人預約紀錄</li>
                </ul>
            </section>
        </div>
    );
};

export default Home;
