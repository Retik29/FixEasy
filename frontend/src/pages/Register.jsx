import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Wrench, Users, Check, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTransition from '../components/layout/PageTransition';

const Register = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useContext(AuthContext);

    // Pre-select role from URL param if provided
    const initialRole = searchParams.get('role') === 'technician' ? 'technician' : 'user';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [role, setRole] = useState(initialRole);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1); // 1: Role selection, 2: Form

    const roles = [
        {
            value: 'user',
            icon: Users,
            title: 'I need a service',
            description: 'Find and hire skilled technicians for your home repairs'
        },
        {
            value: 'technician',
            icon: Wrench,
            title: 'I provide services',
            description: 'Join as a technician and connect with customers'
        }
    ];

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await api.post('/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role
            });
            const { token, role: returnedRole } = response.data;
            login(token, returnedRole);
            toast.success('Account created successfully!');

            // Redirect based on role
            setTimeout(() => {
                if (returnedRole === 'user') navigate('/user');
                else if (returnedRole === 'technician') navigate('/technician');
                else if (returnedRole === 'admin') navigate('/admin');
            }, 500);
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <div className="auth-container" style={{ justifyContent: 'center' }}>
                <motion.div
                    className={`auth-card ${step === 1 ? 'auth-card-lg' : ''}`}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        maxWidth: step === 1 ? '560px' : '440px',
                        transition: 'max-width 0.3s ease'
                    }}
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
                        <h2>{step === 1 ? 'Join FixEasy' : 'Create your account'}</h2>
                        <p>
                            {step === 1
                                ? 'Choose how you want to use FixEasy'
                                : `Register as a ${role === 'user' ? 'customer' : 'technician'}`
                            }
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        justifyContent: 'center'
                    }}>
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                style={{
                                    width: s === step ? '2rem' : '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: 'var(--radius-full)',
                                    background: s <= step ? 'var(--primary)' : 'var(--border)',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: Role Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="role-grid">
                                    {roles.map((r) => {
                                        const Icon = r.icon;
                                        const isSelected = role === r.value;
                                        return (
                                            <motion.div
                                                key={r.value}
                                                onClick={() => setRole(r.value)}
                                                className={`role-card ${isSelected ? 'active' : ''}`}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                <div className="role-icon">
                                                    <Icon size={24} />
                                                </div>
                                                <div className="role-content" style={{ flex: 1 }}>
                                                    <h3>{r.title}</h3>
                                                    <p>{r.description}</p>
                                                </div>
                                                <div className="role-check">
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                        >
                                                            <Check size={14} color="white" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    onClick={() => setStep(2)}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '0.95rem',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Continue <ArrowRight size={18} />
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Step 2: Registration Form */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handleSubmit}>
                                    {/* Name Field */}
                                    <div className="input-group has-icon has-label">
                                        <label>Full Name</label>
                                        <User size={18} className="input-icon" style={{ top: 'calc(50% + 12px)' }} />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{
                                                paddingLeft: '2.75rem',
                                                borderColor: errors.name ? '#dc2626' : undefined
                                            }}
                                        />
                                        {errors.name && (
                                            <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="input-group has-icon has-label">
                                        <label>Email Address</label>
                                        <Mail size={18} className="input-icon" style={{ top: 'calc(50% + 12px)' }} />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
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
                                            name="password"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
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

                                    {/* Confirm Password Field */}
                                    <div className="input-group has-icon has-label">
                                        <label>Confirm Password</label>
                                        <Lock size={18} className="input-icon" style={{ top: 'calc(50% + 12px)' }} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            style={{
                                                paddingLeft: '2.75rem',
                                                paddingRight: '2.75rem',
                                                borderColor: errors.confirmPassword ? '#dc2626' : undefined
                                            }}
                                        />
                                        {errors.confirmPassword && (
                                            <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                                                {errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <motion.button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="btn btn-secondary"
                                            style={{
                                                flex: 1,
                                                padding: '0.9rem'
                                            }}
                                        >
                                            <ArrowLeft size={18} />
                                            Back
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: loading ? 1 : 1.01 }}
                                            whileTap={{ scale: loading ? 1 : 0.99 }}
                                            className="btn btn-primary"
                                            style={{
                                                flex: 2,
                                                padding: '0.9rem',
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
                                                    Creating...
                                                </>
                                            ) : (
                                                'Create Account'
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Divider */}
                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    {/* Login Link */}
                    <p className="auth-footer" style={{ color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
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

export default Register;
