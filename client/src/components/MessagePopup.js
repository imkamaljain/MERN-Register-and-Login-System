import React from 'react';

export default function MessagePopup({ message, setMessage }) {
    return (
        <div className="popupContainer">
            <div className="popup">
                <h1>{message}</h1>
                <div onClick={() => setMessage('')}>X</div>
            </div>
        </div>
    );
};