import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Wrench, Save, ArrowLeft, LogOut, Camera } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTransition from '../components/layout/PageTransition';

const Profile = () => {
    const navigate = useNavigate();
    const { logout, role } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        serviceType: '',
        bio: '',
        experience: ''
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/profile');
            setProfile(res.data);
        } catch (err) {
            // Use mock data if API fails
            setProfile({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 234 567 8900',
                location: 'New York, NY',
                serviceType: role === 'technician' ? 'Plumbing' : '',
                bio: 'Experienced professional with a passion for quality work.',
                experience: '5 years'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put('/profile', profile);
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, disabled = false }) => (
        <div style={{ marginBottom: '1.25rem' }}>
            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)'
                }}
            >
                <Icon size={16} style={{ color: 'var(--primary)' }} />
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={profile[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    background: disabled ? 'var(--bg-secondary)' : 'white',
                    cursor: disabled ? 'not-allowed' : 'text'
                }}
            />
        </div>
    );

    if (loading) {
        return (
            <PageTransition>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Loading profile...</p>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
                {/* Header */}
                <header
                    style={{
                        background: 'white',
                        borderBottom: '1px solid var(--border)',
                        padding: '1rem 2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => navigate(-1)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                                Profile Settings
                            </h1>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Manage your account information
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-ghost"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </header>

                <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Profile Header */}
                        <div
                            style={{
                                background: 'linear-gradient(135deg, var(--primary) 0%, #0d7a00 100%)',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative'
                            }}
                        >
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    fontWeight: '600',
                                    color: 'var(--primary)',
                                    border: '4px solid white',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    position: 'relative'
                                }}
                            >
                                {profile.name?.charAt(0).toUpperCase() || 'U'}
                                <button
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'var(--primary)',
                                        border: '2px solid white',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Camera size={14} />
                                </button>
                            </div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>{profile.name}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.25rem' }}>
                                {role || 'User'}
                            </p>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                <InputField
                                    icon={User}
                                    label="Full Name"
                                    name="name"
                                    placeholder="Enter your name"
                                />
                                <InputField
                                    icon={Mail}
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    disabled={true}
                                />
                                <InputField
                                    icon={Phone}
                                    label="Phone Number"
                                    name="phone"
                                    placeholder="Enter your phone"
                                />
                                <InputField
                                    icon={MapPin}
                                    label="Location"
                                    name="location"
                                    placeholder="Enter your location"
                                />
                            </div>

                            {role === 'technician' && (
                                <>
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Wrench size={18} style={{ color: 'var(--primary)' }} />
                                            Professional Information
                                        </h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                            <div style={{ marginBottom: '1.25rem' }}>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                                                    Service Type
                                                </label>
                                                <select
                                                    name="serviceType"
                                                    value={profile.serviceType}
                                                    onChange={handleChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem 1rem',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: '0.95rem',
                                                        background: 'white'
                                                    }}
                                                >
                                                    <option value="">Select service type</option>
                                                    <option value="Plumbing">Plumbing</option>
                                                    <option value="Electrical">Electrical</option>
                                                    <option value="Cleaning">Cleaning</option>
                                                    <option value="IT Support">IT Support</option>
                                                    <option value="Moving">Moving</option>
                                                    <option value="Painting">Painting</option>
                                                    <option value="HVAC">HVAC</option>
                                                    <option value="Carpentry">Carpentry</option>
                                                </select>
                                            </div>
                                            <InputField
                                                icon={Wrench}
                                                label="Years of Experience"
                                                name="experience"
                                                placeholder="e.g., 5 years"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                                            Bio / Description
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={profile.bio || ''}
                                            onChange={handleChange}
                                            placeholder="Tell customers about your services and experience..."
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
                                </>
                            )}

                            <motion.button
                                type="submit"
                                disabled={saving}
                                whileHover={{ scale: saving ? 1 : 1.01 }}
                                whileTap={{ scale: saving ? 1 : 0.99 }}
                                className="btn btn-primary"
                                style={{
                                    width: '100%',
                                    marginTop: '2rem',
                                    padding: '0.85rem',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    opacity: saving ? 0.7 : 1
                                }}
                            >
                                <Save size={18} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                <ToastContainer position="top-center" />
            </div>
        </PageTransition>
    );
};

export default Profile;
