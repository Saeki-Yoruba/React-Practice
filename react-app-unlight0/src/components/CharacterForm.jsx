import React, { useState } from "react";
import "../styles/CharacterForm.css";

const CharacterForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setMessage("");

        const newCharacter = { name, description, mainImage, images };

        fetch("http://localhost:8080/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Role: "ADMIN",
            },
            body: JSON.stringify(newCharacter),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setMessage("角色新增成功！");
                    setName("");
                    setDescription("");
                    setMainImage("");
                    setImages([]);
                } else {
                    setMessage("新增失敗：" + data.message);
                }
            })
            .catch((error) => setMessage("新增失敗：" + error.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="character-form">
            <h2>新增角色</h2>
            <div className="form-group">
                <label htmlFor="name">角色名稱</label>
                <input
                    id="name"
                    type="text"
                    placeholder="角色名稱"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">角色描述</label>
                <textarea
                    id="description"
                    placeholder="角色描述"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mainImage">主圖片 URL</label>
                <input
                    id="mainImage"
                    type="text"
                    placeholder="主圖片 URL"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="images">其他圖片 URL (用逗號分隔)</label>
                <input
                    id="images"
                    type="text"
                    placeholder="其他圖片 URL (用逗號分隔)"
                    value={images.join(",")}
                    onChange={(e) => setImages(e.target.value.split(","))}
                />
            </div>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "提交中..." : "提交"}
            </button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CharacterForm;
