import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CharacterDetails.css";

const AdminCharacterDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingCharacter, setEditingCharacter] = useState(false);
    const [editedCharacter, setEditedCharacter] = useState({ name: "", description: "" });
    const [editingStory, setEditingStory] = useState(null);
    const [storyImages, setStoryImages] = useState([]);

    useEffect(() => {
        const role = sessionStorage.getItem("role");
        if (role !== "ADMIN") {
            alert("無權訪問此頁面");
            navigate("/login");
            return;
        }

        const fetchCharacter = async () => {
            try {
                const response = await fetch(`http://localhost:8080/characters/${id}`);
                if (!response.ok) {
                    throw new Error("無法獲取角色資料");
                }
                const data = await response.json();
                setCharacter(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchStories = async () => {
            try {
                const response = await fetch(`http://localhost:8080/stories/character/${id}`);
                if (!response.ok) {
                    throw new Error("無法獲取故事列表");
                }
                const data = await response.json();
                setStories(data.data || []);
            } catch (err) {
                setError(err.message);
            }
        };

        Promise.all([fetchCharacter(), fetchStories()]).finally(() => setLoading(false));
    }, [id, navigate]);

    const startEditingCharacter = () => {
        setEditingCharacter(true);
        setEditedCharacter({
            name: character.name,
            description: character.description,
        });
    };

    const saveCharacterChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8080/characters/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Role: "ADMIN",
                },
                body: JSON.stringify(editedCharacter),
            });
            if (!response.ok) {
                throw new Error("無法保存角色更改");
            }
            setCharacter({ ...character, ...editedCharacter });
            setEditingCharacter(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const startEditingStory = (story) => {
        setEditingStory(story);
        setStoryImages([]); // 清空選擇的圖片
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setStoryImages(files);
    };

    const saveStoryChanges = async () => {
        const formData = new FormData();
        formData.append("story", JSON.stringify(editingStory));
        storyImages.forEach((image) => formData.append("images", image));

        try {
            const response = await fetch(`http://localhost:8080/stories/${editingStory.id}`, {
                method: "PUT",
                headers: {
                    Role: "ADMIN",
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error("無法保存故事更改");
            }
            const updatedStory = await response.json();
            setStories(stories.map((s) => (s.id === editingStory.id ? updatedStory.data : s)));
            setEditingStory(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const deleteStory = async (storyId) => {
        if (!window.confirm("確定要刪除此故事嗎？")) return;
        try {
            const response = await fetch(`http://localhost:8080/stories/${storyId}`, {
                method: "DELETE",
                headers: {
                    Role: "ADMIN",
                },
            });
            if (!response.ok) {
                throw new Error("無法刪除故事");
            }
            setStories(stories.filter((s) => s.id !== storyId));
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <p>加載中...</p>;
    }

    if (error) {
        return <p className="error-message">錯誤：{error}</p>;
    }

    return (
        <div className="character-details">
            {character && (
                <div className="character-info-section">
                    {editingCharacter ? (
                        <>
                            <input
                                type="text"
                                value={editedCharacter.name}
                                onChange={(e) =>
                                    setEditedCharacter({ ...editedCharacter, name: e.target.value })
                                }
                            />
                            <textarea
                                value={editedCharacter.description}
                                onChange={(e) =>
                                    setEditedCharacter({
                                        ...editedCharacter,
                                        description: e.target.value,
                                    })
                                }
                            ></textarea>
                            <button onClick={saveCharacterChanges}>保存</button>
                            <button onClick={() => setEditingCharacter(false)}>取消</button>
                        </>
                    ) : (
                        <>
                            <h2>{character.name}</h2>
                            <p>{character.description}</p>
                            <button onClick={startEditingCharacter}>編輯角色</button>
                        </>
                    )}
                </div>
            )}
            <div className="character-stories">
                <h3>「{character?.name}」的故事列表</h3>
                {stories.length > 0 ? (
                    <ul>
                        {stories.map((story) => (
                            <li key={story.id} className="story-item">
                                <h4>{story.title}</h4>
                                {story.images && (
                                    <div className="story-images">
                                        {story.images.map((image, index) => (
                                            <img key={index} src={image} alt={`故事圖片 ${index + 1}`} />
                                        ))}
                                    </div>
                                )}
                                <button onClick={() => startEditingStory(story)}>編輯</button>
                                <button onClick={() => deleteStory(story.id)}>刪除</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>暫無故事</p>
                )}
            </div>

            {editingStory && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setEditingStory(null)}>
                            &times;
                        </span>
                        <h4>編輯故事</h4>
                        <input
                            type="text"
                            value={editingStory.title}
                            onChange={(e) =>
                                setEditingStory({ ...editingStory, title: e.target.value })
                            }
                        />
                        <textarea
                            value={editingStory.content}
                            onChange={(e) =>
                                setEditingStory({ ...editingStory, content: e.target.value })
                            }
                        ></textarea>
                        <div className="form-group">
                            <label htmlFor="story-images">新增圖片</label>
                            <input
                                id="story-images"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                        <button onClick={saveStoryChanges}>保存</button>
                        <button onClick={() => setEditingStory(null)}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCharacterDetails;
