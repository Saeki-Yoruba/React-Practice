const API_BASE_URL = "http://localhost:8080/characters";

// 獲取所有角色
export const fetchCharacters = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error("無法獲取角色列表");
        }
        const data = await response.json();
        const characters = data.data || [];

        // 提取主要圖片（主圖片是角色的字段之一）
        return characters.map(character => ({
            id: character.id,
            name: character.name,
            description: character.description,
            mainImage: character.mainImage, // 主圖片
        }));
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 新增角色
export const addCharacter = async (character, role) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Role: role,
            },
            body: JSON.stringify(character),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "新增角色失敗");
        }
        return data;
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 更新角色
export const updateCharacter = async (id, character, role) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Role: role,
            },
            body: JSON.stringify(character),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "更新角色失敗");
        }
        return data;
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 刪除角色
export const deleteCharacter = async (id, role) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Role: role,
            },
        });
        if (!response.ok) {
            throw new Error("刪除角色失敗");
        }
        return "角色已刪除";
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};
