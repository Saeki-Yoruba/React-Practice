import React, { useState, useEffect } from "react";
import "../styles/StoryForm.css";

const StoryForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [chapter, setChapter] = useState(1);
    const [characterId, setCharacterId] = useState("");
    const [images, setImages] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // 獲取角色列表
        const fetchCharacters = async () => {
            try {
                const response = await fetch("http://localhost:8080/characters");
                if (!response.ok) {
                    throw new Error("無法獲取角色列表");
                }
                const data = await response.json();
                setCharacters(data.data || []);
            } catch (error) {
                console.error("錯誤:", error.message);
            }
        };

        fetchCharacters();
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("story", JSON.stringify({ title, content, chapter, characterId }));
        images.forEach((image) => formData.append("images", image));

        fetch("http://localhost:8080/stories", {
            method: "POST",
            headers: {
                Role: "ADMIN",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setMessage("故事新增成功！");
                    setTitle("");
                    setContent("");
                    setChapter(1);
                    setCharacterId("");
                    setImages([]);
                } else {
                    setMessage("新增失敗：" + data.message);
                }
            })
            .catch((error) => setMessage("新增失敗：" + error.message));
    };

    return (
        <div className="story-form">
            <h2>新增故事</h2>
            <div className="form-group">
                <label htmlFor="title">故事標題</label>
                <input
                    id="title"
                    type="text"
                    placeholder="故事標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">故事內容</label>
                <textarea
                    id="content"
                    placeholder="故事內容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="chapter">章節</label>
                <select
                    id="chapter"
                    value={chapter}
                    onChange={(e) => setChapter(parseInt(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            第 {num} 章
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="characterId">關聯角色</label>
                <select
                    id="characterId"
                    value={characterId}
                    onChange={(e) => setCharacterId(e.target.value)}
                >
                    <option value="">選擇角色</option>
                    {characters.map((character) => (
                        <option key={character.id} value={character.id}>
                            {character.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="images">上傳圖片</label>
                <input
                    id="images"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />
            </div>
            <button onClick={handleSubmit}>提交</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default StoryForm;
