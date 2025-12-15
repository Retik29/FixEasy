import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizes = {
        sm: { spinner: 24, border: 2 },
        md: { spinner: 40, border: 3 },
        lg: { spinner: 56, border: 4 }
    };

    const { spinner, border } = sizes[size] || sizes.md;

    return (
        <div className="loading-spinner" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem'
        }}>
            <motion.div
                style={{
                    width: spinner,
                    height: spinner,
                    borderRadius: '50%',
                    border: `${border}px solid var(--border)`,
                    borderTopColor: 'var(--primary)',
                    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.15)'
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        margin: 0
                    }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default LoadingSpinner;
