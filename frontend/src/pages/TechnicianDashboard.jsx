import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogOut, Wrench, CheckCircle, XCircle, Clock, UserCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const TechnicianDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Fetch assigned requests for the logged-in technician
    const fetchRequests = async () => {
        try {
            const res = await api.get('/technician/requests');
            setRequests(res.data);
        } catch (err) {
            toast.error('Failed to load your requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateRequestStatus = async (id, newStatus) => {
        setActionLoadingId(id);
        try {
            await api.patch(`/requests/${id}`, { status: newStatus });
            toast.success(`Request ${newStatus.toLowerCase()}`);
            // Optimistically update UI
            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
            );
        } catch (err) {
            toast.error('Action failed');
        } finally {
            setActionLoadingId(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            Pending: { background: '#fef3c7', color: '#d97706' },
            Accepted: { background: '#dbeafe', color: '#2563eb' },
            Completed: { background: '#dcfce7', color: '#16a34a' },
            Rejected: { background: '#fee2e2', color: '#dc2626' }
        };
        return (
            <span
                style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    ...styles[status]
                }}
            >
                {status}
            </span>
        );
    };

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
                                color: 'white'
                            }}
                        >
                            <Wrench size={20} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                                Technician Dashboard
                            </h1>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Manage your service requests
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
                    {/* Stats Cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'white',
                                padding: '1.25rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <Clock size={18} style={{ color: '#f59e0b' }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending</span>
                            </div>
                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                {requests.filter(r => r.status === 'Pending').length}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                background: 'white',
                                padding: '1.25rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <CheckCircle size={18} style={{ color: '#10b981' }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Completed</span>
                            </div>
                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                {requests.filter(r => r.status === 'Completed').length}
                            </p>
                        </motion.div>
                    </div>

                    {/* Requests Table */}
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
                            <h2 style={{ margin: 0 }}>Your Service Requests</h2>
                        </div>

                        {loading ? (
                            <div style={{ padding: '2rem', textAlign: 'center' }}>
                                <p>Loading requests...</p>
                            </div>
                        ) : requests.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No assigned service requests yet.
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-secondary)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>User</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Service</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Description</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                            <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
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
                                                <td style={{ padding: '1rem' }}>{req.serviceType}</td>
                                                <td style={{ padding: '1rem', maxWidth: '200px' }}>
                                                    {req.description || 'No description'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    {getStatusBadge(req.status)}
                                                </td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                        {req.status === 'Pending' && (
                                                            <>
                                                                <button
                                                                    disabled={actionLoadingId === req.id}
                                                                    onClick={() => updateRequestStatus(req.id, 'Accepted')}
                                                                    style={{
                                                                        background: '#dcfce7',
                                                                        color: '#16a34a',
                                                                        border: 'none',
                                                                        padding: '0.5rem 1rem',
                                                                        borderRadius: 'var(--radius-sm)',
                                                                        cursor: 'pointer',
                                                                        fontSize: '0.875rem',
                                                                        opacity: actionLoadingId === req.id ? 0.5 : 1
                                                                    }}
                                                                >
                                                                    Accept
                                                                </button>
                                                                <button
                                                                    disabled={actionLoadingId === req.id}
                                                                    onClick={() => updateRequestStatus(req.id, 'Rejected')}
                                                                    style={{
                                                                        background: '#fee2e2',
                                                                        color: '#dc2626',
                                                                        border: 'none',
                                                                        padding: '0.5rem 1rem',
                                                                        borderRadius: 'var(--radius-sm)',
                                                                        cursor: 'pointer',
                                                                        fontSize: '0.875rem',
                                                                        opacity: actionLoadingId === req.id ? 0.5 : 1
                                                                    }}
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                        {req.status === 'Accepted' && (
                                                            <button
                                                                disabled={actionLoadingId === req.id}
                                                                onClick={() => updateRequestStatus(req.id, 'Completed')}
                                                                className="btn btn-primary"
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    fontSize: '0.875rem',
                                                                    opacity: actionLoadingId === req.id ? 0.5 : 1
                                                                }}
                                                            >
                                                                Mark Completed
                                                            </button>
                                                        )}
                                                        {(req.status === 'Completed' || req.status === 'Rejected') && (
                                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                                                No actions available
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                </div>

                <ToastContainer position="top-center" />
            </div>
        </PageTransition>
    );
};

export default TechnicianDashboard;
