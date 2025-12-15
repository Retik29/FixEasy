import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Wrench, Shield, Clock, Star } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTransition from '../components/layout/PageTransition';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await api.post('/login', { email, password });
            const { token, role } = response.data;
            login(token, role);
            toast.success('Logged in successfully!');

            // Redirect based on role
            setTimeout(() => {
                if (role === 'user') navigate('/user');
                else if (role === 'technician') navigate('/technician');
                else if (role === 'admin') navigate('/admin');
            }, 500);
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { icon: Shield, text: 'Verified Professionals' },
        { icon: Clock, text: 'Quick Response Time' },
        { icon: Star, text: 'Quality Guaranteed' }
    ];

    return (
        <PageTransition>
            <div className="auth-container">
                {/* Left Side - Branding */}
                <div className="auth-branding">
                    <motion.div
                        className="auth-branding-content"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '3rem'
                        }}>
                            <div
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Wrench size={28} />
                            </div>
                            <span style={{ fontSize: '1.75rem', fontWeight: '800' }}>FixEasy</span>
                        </div>

                        <h1 style={{
                            fontSize: '2.75rem',
                            fontWeight: '700',
                            lineHeight: 1.2,
                            marginBottom: '1.5rem'
                        }}>
                            Your trusted platform for home services
                        </h1>

                        <p style={{
                            fontSize: '1.15rem',
                            opacity: 0.9,
                            lineHeight: 1.7,
                            marginBottom: '2.5rem'
                        }}>
                            Connect with skilled technicians for all your repair and maintenance needs.
                            Quality service, fair prices, and reliable professionals.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {features.map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '8px',
                                            background: 'rgba(255, 255, 255, 0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Icon size={18} />
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{feature.text}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Login Form */}
                <div className="auth-form-container">
                    <motion.div
                        className="auth-card"
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Header */}
                        <div className="auth-header">
                            <motion.div
                                className="auth-logo"
                                whileHover={{ rotate: -10 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Wrench size={32} />
                            </motion.div>
                            <h2>Welcome back</h2>
                            <p>Sign in to continue to FixEasy</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="input-group has-icon has-label">
                                <label>Email Address</label>
                                <Mail size={18} className="input-icon" style={{ top: 'calc(50% + 12px)' }} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        paddingLeft: '2.75rem',
                                        borderColor: errors.email ? '#dc2626' : undefined
                                    }}
                                />
                                {errors.email && (
                                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="input-group has-icon has-label">
                                <label>Password</label>
                                <Lock size={18} className="input-icon" style={{ top: 'calc(50% + 12px)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        paddingLeft: '2.75rem',
                                        paddingRight: '2.75rem',
                                        borderColor: errors.password ? '#dc2626' : undefined
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: 'calc(50% + 12px)',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)',
                                        padding: 0
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && (
                                    <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Forgot Password Link */}
                            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                                <Link
                                    to="/forgot-password"
                                    style={{
                                        color: 'var(--primary)',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    Forgot password?
                                </Link>
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
                                    padding: '0.95rem',
                                    fontSize: '1rem',
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner" style={{
                                            width: '18px',
                                            height: '18px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white',
                                            marginRight: '0.5rem'
                                        }} />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In <ArrowRight size={18} />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        {/* Register Link */}
                        <p className="auth-footer" style={{ color: 'var(--text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/register">Create one</Link>
                        </p>

                        {/* Back to Home */}
                        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <Link
                                to="/"
                                style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.875rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                ← Back to home
                            </Link>
                        </p>
                    </motion.div>
                </div>

                <ToastContainer
                    position="top-center"
                    toastStyle={{
                        borderRadius: '12px',
                        fontFamily: 'var(--font-sans)'
                    }}
                />
            </div>
        </PageTransition>
    );
};

export default Login;
