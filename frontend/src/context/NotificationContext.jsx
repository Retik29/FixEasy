import React, { createContext, useState, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Bell } from 'lucide-react';

// Create context
const NotificationContext = createContext();

// Hook to use notifications
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

// Notification types
const NOTIFICATION_TYPES = {
    success: {
        icon: CheckCircle,
        bg: '#dcfce7',
        color: '#16a34a',
        border: '#86efac'
    },
    error: {
        icon: AlertCircle,
        bg: '#fee2e2',
        color: '#dc2626',
        border: '#fca5a5'
    },
    info: {
        icon: Info,
        bg: '#dbeafe',
        color: '#2563eb',
        border: '#93c5fd'
    },
    warning: {
        icon: Bell,
        bg: '#fef3c7',
        color: '#d97706',
        border: '#fcd34d'
    }
};

// Single notification component
const NotificationItem = ({ notification, onDismiss }) => {
    const { icon: Icon, bg, color, border } = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.info;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minWidth: '320px',
                maxWidth: '400px'
            }}
        >
            <Icon size={20} style={{ color, flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
                {notification.title && (
                    <p style={{ fontWeight: '600', color, marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                        {notification.title}
                    </p>
                )}
                <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: 1.4 }}>
                    {notification.message}
                </p>
            </div>
            <button
                onClick={() => onDismiss(notification.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <X size={16} style={{ color: '#9ca3af' }} />
            </button>
        </motion.div>
    );
};

// Notification container component
const NotificationContainer = ({ notifications, onDismiss }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 9999,
                pointerEvents: 'none'
            }}
        >
            <AnimatePresence>
                {notifications.map((notification) => (
                    <div key={notification.id} style={{ pointerEvents: 'auto' }}>
                        <NotificationItem
                            notification={notification}
                            onDismiss={onDismiss}
                        />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// Provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((notification) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: 'info',
            duration: 5000,
            ...notification
        };

        setNotifications((prev) => [...prev, newNotification]);

        // Auto dismiss after duration
        if (newNotification.duration > 0) {
            setTimeout(() => {
                dismissNotification(id);
            }, newNotification.duration);
        }

        return id;
    }, []);

    const dismissNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const notify = {
        success: (message, title = 'Success') =>
            addNotification({ type: 'success', message, title }),
        error: (message, title = 'Error') =>
            addNotification({ type: 'error', message, title }),
        info: (message, title = 'Info') =>
            addNotification({ type: 'info', message, title }),
        warning: (message, title = 'Warning') =>
            addNotification({ type: 'warning', message, title }),
        custom: (options) => addNotification(options)
    };

    return (
        <NotificationContext.Provider value={{ notify, dismissNotification, notifications }}>
            {children}
            <NotificationContainer notifications={notifications} onDismiss={dismissNotification} />
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
