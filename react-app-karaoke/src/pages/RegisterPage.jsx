import React, { useState } from 'react';
import authService from '../services/authService';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '' });

    const handleRegister = async () => {
        try {
            await authService.register(formData);
            alert('註冊成功！');
        } catch (err) {
            alert('註冊失敗：' + err.message);
        }
    };

    return (
        <div className="register-page">
            <h2>註冊帳號</h2>
            <form className="register-form">
                <label>
                    使用者名稱
                    <input
                        type="text"
                        placeholder="輸入使用者名稱"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </label>
                <label>
                    電子郵件
                    <input
                        type="email"
                        placeholder="輸入電子郵件"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <label>
                    電話號碼
                    <input
                        type="text"
                        placeholder="輸入電話號碼"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </label>
                <label>
                    密碼
                    <input
                        type="password"
                        placeholder="輸入密碼"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </label>
                <button type="button" onClick={handleRegister}>
                    註冊
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
