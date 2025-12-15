import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, FileText, User, Wrench } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const BookingModal = ({ tech, onClose, onSuccess }) => {
    const [description, setDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/requests', {
                technicianId: tech.id,
                serviceType: tech.serviceType,
                description,
                preferredDate,
                preferredTime
            });
            onSuccess && onSuccess();
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to create booking';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}
            >
                <motion.div
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'white',
                        borderRadius: 'var(--radius-md)',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Book a Service</h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Technician Info */}
                    <div
                        style={{
                            padding: '1.5rem',
                            background: 'var(--bg-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '1.1rem'
                            }}
                        >
                            {tech.name?.charAt(0).toUpperCase() || 'T'}
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={14} style={{ color: 'var(--text-secondary)' }} />
                                <span style={{ fontWeight: '600' }}>{tech.name}</span>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Wrench size={14} />
                                <span>{tech.serviceType}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                marginLeft: 'auto',
                                textAlign: 'right'
                            }}
                        >
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Rate
                            </p>
                            <p style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                                ${tech.hourlyRate || '25'}/hr
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                        {/* Description */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <FileText size={16} style={{ color: 'var(--primary)' }} />
                                Describe your issue
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please describe the problem you're experiencing..."
                                required
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.95rem',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {/* Date and Time */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <div>
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <Calendar size={16} style={{ color: 'var(--primary)' }} />
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                    min={today}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: '500',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <Clock size={16} style={{ color: 'var(--primary)' }} />
                                    Preferred Time
                                </label>
                                <select
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.95rem',
                                        background: 'white'
                                    }}
                                >
                                    <option value="">Select time</option>
                                    <option value="morning">Morning (8AM - 12PM)</option>
                                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                    <option value="evening">Evening (5PM - 8PM)</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.01 }}
                            whileTap={{ scale: loading ? 1 : 0.99 }}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                fontSize: '1rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Submitting...' : 'Confirm Booking'}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
