'use client';

import { ReactNode, useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Track mount state for portal
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Handle escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        // Trap focus within modal
        if (e.key === 'Tab' && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Store current active element to restore later
            previousActiveElement.current = document.activeElement as HTMLElement;
            // Lock body scroll
            document.body.style.overflow = 'hidden';
            // Add keyboard listener
            document.addEventListener('keydown', handleKeyDown);
            // Focus first focusable element in modal
            setTimeout(() => {
                const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                focusableElements?.[0]?.focus();
            }, 100);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            // Restore body scroll
            document.body.style.overflow = '';
            // Remove keyboard listener
            document.removeEventListener('keydown', handleKeyDown);
            // Restore focus to previous element
            previousActiveElement.current?.focus();
            return () => clearTimeout(timer);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isVisible || !isMounted) return null;

    const modalContent = (
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : styles.overlayClosing}`}
            onClick={onClose}
            role="presentation"
            aria-hidden="true"
        >
            <div
                ref={modalRef}
                className={`${styles.modal} ${isOpen ? styles.open : styles.closing}`}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
            >
                {title && (
                    <div className={styles.header}>
                        <h3 id="modal-title" className={styles.title}>{title}</h3>
                        <button
                            className={styles.closeBtn}
                            onClick={onClose}
                            aria-label="Close modal"
                            type="button"
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );

    // Use portal to render modal at document root level
    return createPortal(modalContent, document.body);
}

