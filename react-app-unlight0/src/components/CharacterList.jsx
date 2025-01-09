import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CharacterList.css";

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("http://localhost:8080/characters");
                if (!response.ok) {
                    throw new Error("無法獲取角色列表");
                }
                const data = await response.json();
                setCharacters(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const handleCharacterClick = (characterId) => {
        const userRole = sessionStorage.getItem("role");
        if (userRole === "ADMIN") {
            navigate(`/admin/characters/${characterId}`);
        } else {
            navigate(`/characters/${characterId}`);
        }
    };

    if (loading) {
        return <p>加載中...</p>;
    }

    if (error) {
        return <p className="error-message">錯誤：{error}</p>;
    }

    return (
        <div className="character-list">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="character-card"
                    onClick={() => handleCharacterClick(character.id)}
                >
                    <img src={character.mainImage} alt={character.name} className="character-image" />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
