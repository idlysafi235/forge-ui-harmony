
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  glowColor?: string;
}

export const BentoCard = ({ className, children, glowColor = '#A579F9' }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white dark:bg-card border border-gray-200 dark:border-gray-800 transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-purple-500/10",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: isHovering
          ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}15, transparent 40%)`
          : undefined,
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
      {isHovering && (
        <div
          className="absolute inset-0 opacity-30 dark:opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}20, transparent 40%)`,
          }}
        />
      )}
    </div>
  );
};
