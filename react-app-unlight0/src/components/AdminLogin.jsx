import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import { loginAdmin } from "../services/adminService";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setMessage("用戶名和密碼不能為空");
            return;
        }

        try {
            const data = await loginAdmin(username, password);
            sessionStorage.setItem("username", data.data.username);
            sessionStorage.setItem("role", data.data.role);
            setMessage("登入成功！");
            setTimeout(() => {
                navigate("/"); // 登入成功後跳轉到首頁
            }, 1000);
        } catch (error) {
            setMessage(`登入失敗：${error.message}`);
        }
    };

    return (
        <div className="admin-login">
            <form onSubmit={handleLogin}>
                <h2>管理員登入</h2>
                <input
                    type="text"
                    placeholder="用戶名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">登入</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
