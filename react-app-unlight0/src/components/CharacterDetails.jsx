import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/CharacterDetails.css";

const CharacterDetails = () => {
    const { id } = useParams(); // 確保與路由中的參數名稱一致
    const [character, setCharacter] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
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
                    throw new Error("無法獲取該角色的故事列表");
                }
                const data = await response.json();
                setStories(data.data || []);
            } catch (err) {
                setError(err.message);
            }
        };

        Promise.all([fetchCharacter(), fetchStories()]).finally(() => setLoading(false));
    }, [id]);

    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };

    const closeModal = () => {
        setSelectedStory(null);
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
                    <h2>{character.name}</h2>
                    <p>{character.description}</p>
                </div>
            )}
            {character?.images && character.images.length > 0 && (
                <div className="character-images-section">
                    <h3>卡面</h3>
                    <div className="character-images">
                        {character.images.map((image, index) => (
                            <img key={index} src={image} alt={`${character.name} 圖片 ${index + 1}`} />
                        ))}
                    </div>
                </div>
            )}
            <div className="character-stories">
                <h3>「{character.name}」的故事列表</h3>
                {stories.length > 0 ? (
                    <ul>
                        {stories.map((story) => (
                            <li
                                key={story.id}
                                className="story-item"
                                onClick={() => handleStoryClick(story)}
                            >
                                <h4>{story.title}</h4>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>暫無故事</p>
                )}
            </div>

            {selectedStory && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h4>{selectedStory.title}</h4>
                        <p>{selectedStory.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterDetails;
