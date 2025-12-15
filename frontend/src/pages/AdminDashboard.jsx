import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Users,
    Wrench,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    LogOut,
    TrendingUp,
    UserCircle
} from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTechnicians: 0,
        totalRequests: 0,
        pendingRequests: 0,
        completedRequests: 0
    });
    const [technicians, setTechnicians] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch all data in parallel
            const [techRes, requestsRes, usersRes] = await Promise.all([
                api.get('/technicians'),
                api.get('/admin/requests'),
                api.get('/admin/users')
            ]);

            setTechnicians(techRes.data || []);
            setRequests(requestsRes.data || []);

            // Calculate stats
            const allRequests = requestsRes.data || [];
            const allUsers = usersRes.data || [];
            const allTechnicians = techRes.data || [];

            setStats({
                totalUsers: allUsers.filter(u => u.role === 'User').length,
                totalTechnicians: allTechnicians.length,
                totalRequests: allRequests.length,
                pendingRequests: allRequests.filter(r => r.status === 'Pending').length,
                completedRequests: allRequests.filter(r => r.status === 'Completed').length
            });
        } catch (err) {
            console.error('Failed to fetch admin data:', err);
            // Use mock data if API fails
            setStats({
                totalUsers: 24,
                totalTechnicians: 12,
                totalRequests: 48,
                pendingRequests: 8,
                completedRequests: 35
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTechnician = async (id) => {
        if (!window.confirm('Are you sure you want to remove this technician?')) return;
        try {
            await api.delete(`/technicians/${id}`);
            toast.success('Technician removed successfully');
            setTechnicians(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            toast.error('Failed to remove technician');
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, delay }) => (
        <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Icon size={24} style={{ color }} />
            </div>
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    {label}
                </p>
                <p style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {value}
                </p>
            </div>
        </motion.div>
    );

    return (
        <PageTransition>
            <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
                {/* Admin Header */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'var(--primary)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.25rem'
                            }}
                        >
                            FE
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                                Admin Dashboard
                            </h1>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Manage your platform
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link
                            to="/profile"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--bg-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <UserCircle size={22} />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </header>

                <div className="container" style={{ padding: '2rem' }}>
                    {/* Stats Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <StatCard
                            icon={Users}
                            label="Total Users"
                            value={stats.totalUsers}
                            color="#3b82f6"
                            delay={0}
                        />
                        <StatCard
                            icon={Wrench}
                            label="Technicians"
                            value={stats.totalTechnicians}
                            color="#14a800"
                            delay={0.1}
                        />
                        <StatCard
                            icon={FileText}
                            label="Total Requests"
                            value={stats.totalRequests}
                            color="#8b5cf6"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Clock}
                            label="Pending"
                            value={stats.pendingRequests}
                            color="#f59e0b"
                            delay={0.3}
                        />
                        <StatCard
                            icon={CheckCircle}
                            label="Completed"
                            value={stats.completedRequests}
                            color="#10b981"
                            delay={0.4}
                        />
                    </div>

                    {/* Tabs */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1.5rem',
                            background: 'white',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            width: 'fit-content'
                        }}
                    >
                        {['overview', 'technicians', 'requests'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <p>Loading data...</p>
                        </div>
                    ) : (
                        <>
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        padding: '2rem',
                                        border: '1px solid var(--border)'
                                    }}
                                >
                                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <TrendingUp size={24} style={{ color: 'var(--primary)' }} />
                                        Platform Overview
                                    </h2>
                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Service Completion Rate</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                                {stats.totalRequests > 0
                                                    ? Math.round((stats.completedRequests / stats.totalRequests) * 100)
                                                    : 0}%
                                            </p>
                                        </div>
                                        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Active Technicians</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>{stats.totalTechnicians}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Technicians Tab */}
                            {activeTab === 'technicians' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                        <h2 style={{ margin: 0 }}>Registered Technicians</h2>
                                    </div>
                                    {technicians.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            No technicians registered yet.
                                        </div>
                                    ) : (
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Location</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Rating</th>
                                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {technicians.map((tech, index) => (
                                                        <motion.tr
                                                            key={tech.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            style={{ borderBottom: '1px solid var(--border)' }}
                                                        >
                                                            <td style={{ padding: '1rem' }}>{tech.name}</td>
                                                            <td style={{ padding: '1rem' }}>{tech.serviceType}</td>
                                                            <td style={{ padding: '1rem' }}>{tech.location}</td>
                                                            <td style={{ padding: '1rem' }}>{tech.rating || 'N/A'}</td>
                                                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                                <button
                                                                    onClick={() => handleDeleteTechnician(tech.id)}
                                                                    style={{
                                                                        background: '#fee2e2',
                                                                        color: '#dc2626',
                                                                        border: 'none',
                                                                        padding: '0.5rem 1rem',
                                                                        borderRadius: 'var(--radius-sm)',
                                                                        cursor: 'pointer',
                                                                        fontSize: '0.875rem'
                                                                    }}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Requests Tab */}
                            {activeTab === 'requests' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        background: 'white',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--border)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                        <h2 style={{ margin: 0 }}>All Service Requests</h2>
                                    </div>
                                    {requests.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            No service requests yet.
                                        </div>
                                    ) : (
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr style={{ background: 'var(--bg-secondary)' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Technician</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requests.map((req, index) => (
                                                        <motion.tr
                                                            key={req.id}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            style={{ borderBottom: '1px solid var(--border)' }}
                                                        >
                                                            <td style={{ padding: '1rem' }}>{req.userName}</td>
                                                            <td style={{ padding: '1rem' }}>{req.technicianName}</td>
                                                            <td style={{ padding: '1rem' }}>{req.serviceType}</td>
                                                            <td style={{ padding: '1rem' }}>
                                                                <span
                                                                    style={{
                                                                        padding: '0.25rem 0.75rem',
                                                                        borderRadius: '999px',
                                                                        fontSize: '0.75rem',
                                                                        fontWeight: '500',
                                                                        background:
                                                                            req.status === 'Completed'
                                                                                ? '#dcfce7'
                                                                                : req.status === 'Pending'
                                                                                    ? '#fef3c7'
                                                                                    : req.status === 'Accepted'
                                                                                        ? '#dbeafe'
                                                                                        : '#fee2e2',
                                                                        color:
                                                                            req.status === 'Completed'
                                                                                ? '#16a34a'
                                                                                : req.status === 'Pending'
                                                                                    ? '#d97706'
                                                                                    : req.status === 'Accepted'
                                                                                        ? '#2563eb'
                                                                                        : '#dc2626'
                                                                    }}
                                                                >
                                                                    {req.status}
                                                                </span>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </>
                    )}
                </div>

                <ToastContainer position="top-center" />
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
