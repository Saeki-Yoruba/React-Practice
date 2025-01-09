import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 引入 useNavigate
import "../styles/Navbar.css";

function Navbar({ user, setUser }) {
    const navigate = useNavigate(); // 初始化導航

    const handleLogout = () => {
        setUser(null); // 清除使用者狀態
        alert("已成功登出");
        navigate("/"); // 返回首頁
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2 className="navbar-title">
                    <Link to="/" className="navbar-logo">
                        KTV 預約系統
                    </Link>
                </h2>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">
                        首頁
                    </Link>
                </li>
                <li>
                    <Link to="/rooms" className="navbar-link">
                        房間列表
                    </Link>
                </li>
                <li>
                    <Link to="/all-bookings" className="navbar-link">
                        所有預約
                    </Link>
                </li>
                {user ? (
                    <>
                        <li>
                            <Link to="/bookings" className="navbar-link">
                                我的預約
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-booking" className="navbar-link">
                                新增預約
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="navbar-button">
                                登出
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="navbar-link">
                                登入
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="navbar-link">
                                註冊
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
