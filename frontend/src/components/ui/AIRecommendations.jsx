import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Zap, Award, TrendingUp } from 'lucide-react';

const AIRecommendations = ({ technicians, onSelect }) => {
    // Simple ranking algorithm based on rating, availability, and reviews
    const getRecommendedTechnicians = () => {
        if (!technicians || technicians.length === 0) return [];

        // Score each technician
        const scored = technicians.map((tech) => {
            let score = 0;

            // Rating score (0-50 points)
            const rating = parseFloat(tech.rating) || 4.0;
            score += rating * 10;

            // Availability score (0-20 points)
            if (tech.available !== false) {
                score += 20;
            }

            // Review count score (0-15 points)
            const reviewCount = parseInt(tech.reviewCount) || 0;
            score += Math.min(reviewCount / 10, 15);

            // Experience/completion rate (0-15 points)
            const completionRate = tech.completionRate || 90;
            score += completionRate * 0.15;

            return { ...tech, score };
        });

        // Sort by score and return top 3
        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    };

    const recommended = getRecommendedTechnicians();

    if (recommended.length === 0) {
        return null;
    }

    const getRankBadge = (index) => {
        const badges = [
            { icon: Award, color: '#fbbf24', label: 'Top Pick' },
            { icon: TrendingUp, color: '#60a5fa', label: 'Rising Star' },
            { icon: Star, color: '#a78bfa', label: 'Recommended' }
        ];
        return badges[index] || badges[2];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '1px solid #86efac'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Zap size={20} style={{ color: 'var(--primary)' }} />
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                    AI-Powered Recommendations
                </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Based on ratings, availability, and customer reviews, we recommend these top technicians for you:
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                }}
            >
                {recommended.map((tech, index) => {
                    const badge = getRankBadge(index);
                    const BadgeIcon = badge.icon;

                    return (
                        <motion.div
                            key={tech.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                            onClick={() => onSelect && onSelect(tech)}
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-sm)',
                                padding: '1.25rem',
                                cursor: 'pointer',
                                border: '1px solid var(--border)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Rank badge */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    background: `${badge.color}20`,
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    color: badge.color
                                }}
                            >
                                <BadgeIcon size={12} />
                                {badge.label}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, var(--primary) 0%, #0d7a00 100%)`,
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
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                                        {tech.name}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {tech.serviceType}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Star size={14} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                                    <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                        {tech.rating || '4.8'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                    <MapPin size={14} />
                                    {tech.location || 'Local'}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    marginTop: '1rem',
                                    padding: '0.5rem'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect && onSelect(tech);
                                }}
                            >
                                Book Now
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default AIRecommendations;
