import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const isLoggedIn = !!sessionStorage.getItem("username");

    return (
        <nav className="navbar">
            <h2 className="navbar-title">
                <Link to="/">Unlight圖書館</Link>
            </h2>
            <ul className="navbar-links">
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/characters">角色列表</Link>
                        </li>
                        <li>
                            <Link to="/characters/new">新增角色</Link>
                        </li>
                        <li>
                            <Link to="/stories/new">新增故事</Link>
                        </li>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/characters">角色列表</Link>
                        </li>
                        <li>
                            <Link to="/recent-stories">最新故事列表</Link>
                        </li>
                        <li>
                            <Link to="/login">登入</Link>
                        </li>
                    </>

                )}
            </ul>
        </nav>
    );
};

export default Navbar;
