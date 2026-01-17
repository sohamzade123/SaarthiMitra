'use client';

import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'default' | 'glass' | 'gradient';
    hoverable?: boolean;
    padding?: 'none' | 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
}

export default function Card({
    children,
    className = '',
    onClick,
    variant = 'default',
    hoverable = true,
    padding = 'medium',
    style
}: CardProps) {
    return (
        <div
            className={`
        ${styles.card} 
        ${styles[variant]} 
        ${styles[`padding-${padding}`]}
        ${hoverable ? styles.hoverable : ''}
        ${onClick ? styles.clickable : ''}
        ${className}
      `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            style={style}
        >
            {children}
        </div>
    );
}

