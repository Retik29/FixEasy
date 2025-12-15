import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, Star, Shield, Clock, Users,
    Wrench, Zap, Sparkles, Check, Leaf, Phone
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Navbar from '../components/layout/Navbar';

const LandingPage = () => {
    const categories = [
        { name: 'Plumbing', icon: '🔧', rating: 4.8 },
        { name: 'Electrical', icon: '⚡', rating: 4.9 },
        { name: 'Cleaning', icon: '🧹', rating: 4.7 },
        { name: 'IT Support', icon: '💻', rating: 4.8 },
        { name: 'Moving', icon: '📦', rating: 4.6 },
        { name: 'Painting', icon: '🎨', rating: 4.8 }
    ];

    const features = [
        {
            icon: Shield,
            title: 'Verified Professionals',
            description: 'All technicians are background-checked and verified for your safety and peace of mind.'
        },
        {
            icon: Clock,
            title: 'Quick Response',
            description: 'Get connected with available technicians within minutes, not hours.'
        },
        {
            icon: Star,
            title: 'Quality Guaranteed',
            description: 'Rated and reviewed by real customers for reliable, premium service.'
        },
        {
            icon: Zap,
            title: 'Easy Booking',
            description: 'Book services with just a few clicks, anytime, anywhere you need.'
        }
    ];

    const stats = [
        { value: '10K+', label: 'Happy Customers' },
        { value: '500+', label: 'Expert Technicians' },
        { value: '50+', label: 'Service Categories' },
        { value: '4.8', label: 'Average Rating' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <PageTransition>
            <div className="landing-container" style={{ background: 'var(--bg-page)' }}>
                <Navbar />

                {/* Hero Section */}
                <section className="hero">
                    <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <motion.div
                            className="hero-content"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {/* Badge */}
                            <motion.div className="hero-badge" variants={itemVariants}>
                                <Sparkles size={16} />
                                The #1 Home Services Platform
                            </motion.div>

                            {/* Title */}
                            <motion.h1 className="hero-title" variants={itemVariants}>
                                Home repairs made<br />
                                <span>simple & reliable.</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p className="hero-subtitle" variants={itemVariants}>
                                Connect with skilled technicians for plumbing, electrical,
                                cleaning, and more. Quality service at your fingertips.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div className="hero-cta" variants={itemVariants}>
                                <Link to="/register" className="btn btn-primary btn-lg">
                                    Get Started <ArrowRight size={20} />
                                </Link>
                                <Link to="/register?role=technician" className="btn btn-secondary btn-lg">
                                    Join as Technician
                                </Link>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                variants={itemVariants}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    marginTop: '3rem',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={18} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Free to sign up
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={18} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Verified professionals
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Check size={18} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        24/7 support
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="container stats-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section style={{
                    padding: '5rem 1.5rem',
                    background: 'white'
                }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '4rem',
                            alignItems: 'center'
                        }}>
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--primary-50)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-full)',
                                    marginBottom: '1.5rem'
                                }}>
                                    <Leaf size={16} style={{ color: 'var(--primary)' }} />
                                    <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '500' }}>
                                        About Us
                                    </span>
                                </div>

                                <h2 style={{ marginBottom: '1.5rem', fontSize: '2.25rem' }}>
                                    Connecting you with trusted home service professionals
                                </h2>

                                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
                                    FixEasy is your one-stop solution for all home service needs. We bring together
                                    verified, skilled technicians with homeowners who need reliable repairs and maintenance.
                                </p>

                                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                                    {[
                                        'Transparent pricing with no hidden fees',
                                        'Real-time booking and tracking',
                                        'Satisfaction guaranteed on every service'
                                    ].map((item, i) => (
                                        <li key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            marginBottom: '0.75rem',
                                            color: 'var(--text-primary)'
                                        }}>
                                            <div style={{
                                                width: '22px',
                                                height: '22px',
                                                borderRadius: '50%',
                                                background: 'var(--primary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Check size={14} style={{ color: 'white' }} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/register" className="btn btn-primary">
                                    Learn More <ArrowRight size={18} />
                                </Link>
                            </motion.div>

                            {/* Right - Image/Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem'
                                }}
                            >
                                {[
                                    { icon: Users, value: '10K+', label: 'Customers', color: '#16a34a' },
                                    { icon: Wrench, value: '500+', label: 'Technicians', color: '#0ea5e9' },
                                    { icon: Star, value: '4.8', label: 'Rating', color: '#f59e0b' },
                                    { icon: Clock, value: '24/7', label: 'Support', color: '#8b5cf6' }
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.03, y: -4 }}
                                            style={{
                                                background: 'var(--bg-secondary)',
                                                borderRadius: 'var(--radius-lg)',
                                                padding: '1.5rem',
                                                textAlign: 'center',
                                                border: '1px solid var(--border)'
                                            }}
                                        >
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                background: `${item.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 1rem'
                                            }}>
                                                <Icon size={24} style={{ color: item.color }} />
                                            </div>
                                            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{item.value}</h3>
                                            <p style={{ fontSize: '0.9rem', margin: 0 }}>{item.label}</p>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Why Choose FixEasy?</h2>
                            <p>We make home services easy, reliable, and affordable for everyone.</p>
                        </motion.div>

                        <div className="features-grid">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        className="feature-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="card-icon">
                                            <Icon size={28} />
                                        </div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Browse by Category</h2>
                            <p>Find the right professional for any job around your home.</p>
                        </motion.div>

                        <div className="category-grid">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={cat.name}
                                    className="category-card"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <span className="icon">{cat.icon}</span>
                                    <h3>{cat.name}</h3>
                                    <div className="rating">
                                        <Star size={14} fill="currentColor" />
                                        {cat.rating}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section style={{
                    padding: '5rem 1.5rem',
                    background: 'var(--bg-secondary)'
                }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>How It Works</h2>
                            <p>Getting started with FixEasy is quick and simple.</p>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>
                            {[
                                {
                                    step: '01',
                                    title: 'Describe Your Issue',
                                    description: 'Tell us what needs fixing and when you\'re available.',
                                    icon: '📝'
                                },
                                {
                                    step: '02',
                                    title: 'Get Matched',
                                    description: 'We connect you with verified technicians in your area.',
                                    icon: '🔍'
                                },
                                {
                                    step: '03',
                                    title: 'Book & Relax',
                                    description: 'Schedule the service and let the professionals handle it.',
                                    icon: '✅'
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    whileHover={{ y: -6 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        border: '1px solid var(--border)',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: '700'
                                    }}>
                                        Step {item.step}
                                    </div>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ marginBottom: '0.75rem' }}>{item.title}</h3>
                                    <p style={{ margin: 0 }}>{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Ready to get started?</h2>
                            <p>
                                Join thousands of satisfied customers who trust FixEasy for their home service needs.
                            </p>
                            <div className="cta-buttons">
                                <Link to="/register" className="btn btn-light btn-lg">
                                    <Users size={20} />
                                    Sign Up Free
                                </Link>
                                <Link to="/register?role=technician" className="btn btn-outline-light btn-lg">
                                    <Wrench size={20} />
                                    Become a Technician
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="container footer-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div className="footer-logo">
                            <Wrench size={24} />
                            <span>FixEasy</span>
                        </div>

                        <div className="footer-links">
                            <a href="#about">About</a>
                            <a href="#services">Services</a>
                            <a href="#contact">Contact</a>
                            <a href="#faq">FAQ</a>
                        </div>

                        <p className="footer-copyright">
                            © 2024 FixEasy. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </PageTransition>
    );
};

export default LandingPage;
