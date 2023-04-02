import React from "react";
import { Link } from "react-router-dom";

const Header = ({ room }) => {
return (
    <>
        <div>
            <div className="chat_room_header">

                <h2>{room}</h2>
                <div>

                <Link to="/GenerateClips">
                    <button>GenerateClips</button>
                </Link>
                <Link to="/UserSettings">
                    <button>Settings</button>
                </Link>
                <Link to="/Gallery">
                    <button>Gallery</button>
                </Link>
                </div>
            </div>
    </div>
    </>
);
};

export default Header;
