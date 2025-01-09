import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入導航
import authService from '../services/authService';
import '../styles/LoginPage.css';

const LoginPage = ({ setUser }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // 初始化導航

    const handleLogin = async () => {
        try {
            const response = await authService.login(credentials);
            setUser(response.data);
            alert('登入成功！');
            navigate('/'); // 成功後跳轉到首頁
        } catch (err) {
            alert('登入失敗：' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="login-page">
            <h2>登入</h2>
            <form className="login-form">
                <label>
                    使用者名稱
                    <input
                        type="text"
                        placeholder="輸入使用者名稱"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                </label>
                <label>
                    密碼
                    <input
                        type="password"
                        placeholder="輸入密碼"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </label>
                <button type="button" onClick={handleLogin}>
                    登入
                </button>
            </form>
        </div>
    );
};

export default LoginPage;