const API_BASE_URL = "http://localhost:8080/auth/login";

export const loginAdmin = async (username, password) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include", // 可選，若需要帶認證信息
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "登入失敗");
        }

        return await response.json();
    } catch (error) {
        console.error("登入失敗:", error);
        throw error;
    }
};
