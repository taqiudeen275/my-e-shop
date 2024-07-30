'use client'
import React, { useState, useEffect, useRef } from 'react';

interface FloatingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({  children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ y: 100 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && buttonRef.current) {
      const containerHeight = window.innerHeight;
      const buttonHeight = buttonRef.current.offsetHeight;
      let newY = e.clientY - buttonHeight / 2;

      // Ensure the button stays within the screen bounds
      newY = Math.max(0, Math.min(newY, containerHeight - buttonHeight));

      setPosition({ y: newY });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, isDragging]);

  return (
    <button
      ref={buttonRef}
      className={`
        fixed right-4 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg
        cursor-move active:cursor-grabbing transition-all duration-200
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400
      `}
      style={{ top: `${position.y}px` }}
      onClick={isDragging ? undefined : undefined}
      onMouseDown={handleMouseDown}
    //   onTouchMove={handleMouseDown}
    >
      {children}
    </button>
  );
};

export default FloatingButton;