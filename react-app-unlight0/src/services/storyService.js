const API_BASE_URL = "http://localhost:8080/stories";

// 獲取所有故事
export const fetchStories = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error("無法獲取故事列表");
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 獲取特定角色的故事
export const fetchStoriesByCharacter = async (characterId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/character/${characterId}`);
        if (!response.ok) {
            throw new Error("無法獲取該角色的故事列表");
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 新增故事（含圖片上傳）
export const addStoryWithImages = async (story, images, role) => {
    const formData = new FormData();
    formData.append("title", story.title);
    formData.append("content", story.content);
    formData.append("chapter", story.chapter);
    formData.append("characterId", story.characterId);

    if (images && images.length > 0) {
        images.forEach((image) => formData.append("images", image));
    }

    try {
        const response = await fetch("http://localhost:8080/stories", {
            method: "POST",
            headers: {
                Role: role, // 不要設置 Content-Type
            },
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "新增故事失敗");
        }
        return data;
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};


// 更新故事（含圖片上傳）
export const updateStoryWithImages = async (id, story, images, role) => {
    const formData = new FormData();
    formData.append("story", new Blob([JSON.stringify(story)], { type: "application/json" }));

    if (images && images.length > 0) {
        images.forEach((image) => formData.append("images", image));
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                Role: role,
            },
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "更新故事失敗");
        }
        return data;
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};

// 刪除故事
export const deleteStory = async (id, role) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Role: role,
            },
        });
        if (!response.ok) {
            throw new Error("刪除故事失敗");
        }
        return "故事已刪除";
    } catch (error) {
        console.error("錯誤:", error.message);
        throw error;
    }
};
