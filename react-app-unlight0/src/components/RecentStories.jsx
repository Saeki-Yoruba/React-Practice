import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/RecentStories.css";

const RecentStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecentStories = async () => {
            try {
                const response = await fetch("http://localhost:8080/stories");
                if (!response.ok) {
                    throw new Error("無法獲取故事列表");
                }
                const data = await response.json();

                // 按故事 ID 降序排序並選擇前 10 條
                const sortedStories = data.data
                    .sort((a, b) => b.id - a.id) // ID 從大到小排序
                    .slice(0, 10); // 取前 10 條

                setStories(sortedStories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentStories();
    }, []);

    if (loading) {
        return <p>加載中...</p>;
    }

    if (error) {
        return <p className="error-message">錯誤：{error}</p>;
    }

    return (
        <div className="recent-stories">
            <h2>最近新增故事</h2>
            {stories.length > 0 ? (
                <ul>
                    {stories.map((story) => (
                        <li key={story.id} className="story-item">
                            <h4>{story.title}</h4>
                            <p>章節：{story.chapter}</p>
                            <Link to={`/characters/${story.characterId}`}>
                                查看角色
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>暫無故事</p>
            )}
        </div>
    );
};

export default RecentStories;
