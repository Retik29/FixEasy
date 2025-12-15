import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Wrench, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const TechnicianCard = ({ tech, onBook }) => {
    return (
        <motion.div
            className="technician-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -6,
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                borderColor: 'var(--primary-200)'
            }}
            style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%'
            }}
        >
            {/* Header with Avatar and Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.35rem',
                        fontWeight: '700',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                    }}
                >
                    {tech.name?.charAt(0).toUpperCase() || 'T'}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h3
                            style={{
                                fontSize: '1.15rem',
                                fontWeight: '700',
                                color: 'var(--text-primary)',
                                margin: 0
                            }}
                        >
                            {tech.name}
                        </h3>
                        <CheckCircle
                            size={16}
                            style={{ color: 'var(--primary)' }}
                            fill="var(--primary)"
                            strokeWidth={0}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        <Star size={14} fill="#f59e0b" style={{ color: '#f59e0b' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#f59e0b' }}>
                            {tech.rating || '4.8'}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            ({tech.reviewCount || '20+'} reviews)
                        </span>
                    </div>
                </div>
            </div>

            {/* Service Type Badge */}
            <div
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1rem',
                    background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%)',
                    borderRadius: 'var(--radius-md)',
                    width: 'fit-content',
                    border: '1px solid var(--primary-200)'
                }}
            >
                <Wrench size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.9rem' }}>
                    {tech.serviceType || 'General Service'}
                </span>
            </div>

            {/* Info Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {/* Location */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <MapPin size={14} />
                    </div>
                    <span>{tech.location || 'Location not specified'}</span>
                </div>

                {/* Availability */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        fontSize: '0.9rem'
                    }}
                >
                    <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: tech.available !== false ? '#dcfce7' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Calendar size={14} style={{
                            color: tech.available !== false ? '#16a34a' : '#dc2626'
                        }} />
                    </div>
                    <span style={{
                        color: tech.available !== false ? '#16a34a' : '#dc2626',
                        fontWeight: '500'
                    }}>
                        {tech.available !== false ? 'Available Now' : 'Currently Busy'}
                    </span>
                </div>
            </div>

            {/* Price and Book Button */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border)'
                }}
            >
                <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Starting from
                    </span>
                    <p
                        style={{
                            fontSize: '1.35rem',
                            fontWeight: '800',
                            color: 'var(--text-primary)',
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        ${tech.hourlyRate || '25'}<span style={{
                            fontSize: '0.85rem',
                            fontWeight: '500',
                            color: 'var(--text-secondary)'
                        }}>/hr</span>
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onBook && onBook();
                    }}
                    className="btn btn-primary"
                    style={{
                        padding: '0.65rem 1.25rem',
                        gap: '0.35rem'
                    }}
                >
                    Book <ArrowRight size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TechnicianCard;
