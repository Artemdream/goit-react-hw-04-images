import React, { useEffect } from 'react';
import '../styles.css';

export const Modal = ({ largeImage, onClick }) => {
  //* Вішаємо слухач на window по натисканню клавіші при монтуванні

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    //* Видаляємо слухача з window при розмонтуванні
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  //* Закриваємо модалку по клавіші Esc
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  //* Закриваємо модалку по кліку
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};
