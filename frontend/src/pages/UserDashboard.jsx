import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogOut, Search, User, UserCircle, MapPin, Calendar, Clock, Wrench, ArrowRight } from 'lucide-react';
import TechnicianCard from '../components/ui/TechnicianCard';
import BookingModal from '../components/ui/BookingModal';
import AIRecommendations from '../components/ui/AIRecommendations';
import PageTransition from '../components/layout/PageTransition';
import Navbar from '../components/layout/Navbar';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [technicians, setTechnicians] = useState([]);
    const [filteredTechs, setFilteredTechs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchService, setSearchService] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedTech, setSelectedTech] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [myRequests, setMyRequests] = useState([]);

    // Fetch technicians on mount
    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const res = await api.get('/technicians');
                setTechnicians(res.data);
                setFilteredTechs(res.data);
            } catch (err) {
                toast.error('Failed to load technicians');
            } finally {
                setLoading(false);
            }
        };
        fetchTechnicians();
        fetchMyRequests();
    }, []);

    // Fetch user's own requests
    const fetchMyRequests = async () => {
        try {
            const res = await api.get('/requests/me');
            setMyRequests(res.data);
        } catch (err) {
            toast.error('Failed to load your requests');
        }
    };

    // Filter technicians whenever search fields change
    useEffect(() => {
        const filtered = technicians.filter((t) => {
            const matchesService = searchService
                ? t.serviceType.toLowerCase().includes(searchService.toLowerCase())
                : true;
            const matchesLocation = searchLocation
                ? t.location.toLowerCase().includes(searchLocation.toLowerCase())
                : true;
            return matchesService && matchesLocation;
        });
        setFilteredTechs(filtered);
    }, [searchService, searchLocation, technicians]);

    const openBooking = (tech) => {
        setSelectedTech(tech);
        setShowModal(true);
    };

    const closeBooking = () => {
        setShowModal(false);
        setSelectedTech(null);
    };

    const handleBookingSuccess = async () => {
        toast.success('Service request created');
        closeBooking();
        await fetchMyRequests();
    };

    const getStatusBadge = (status) => {
        const styles = {
            Pending: { background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' },
            Accepted: { background: '#dbeafe', color: '#2563eb', border: '1px solid #93c5fd' },
            Completed: { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' },
            Rejected: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }
        };
        return (
            <span
                style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    ...styles[status]
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <PageTransition>
            <div className="dashboard">
                <Navbar />

                <div className="dashboard-content">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dashboard-header"
                        style={{ marginBottom: '2rem' }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '0.5rem'
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: 'var(--radius-lg)',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
                            }}>
                                <User size={28} />
                            </div>
                            <div>
                                <h1 style={{ margin: 0 }}>Welcome back!</h1>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                                    Find and book skilled technicians for your home services.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)',
                            marginBottom: '2rem',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.25rem'
                        }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--primary-50)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Search size={22} style={{ color: 'var(--primary)' }} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Find a Technician</h2>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    Search by service type or location
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                                <Wrench
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-muted)'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Service type (e.g., Plumbing, Electrical)"
                                    value={searchService}
                                    onChange={(e) => setSearchService(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 2.75rem',
                                        border: '2px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.95rem',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                                <MapPin
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-muted)'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 2.75rem',
                                        border: '2px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.95rem',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Recommendations */}
                    {!loading && technicians.length > 0 && (
                        <AIRecommendations technicians={technicians} onSelect={openBooking} />
                    )}

                    {/* Technician Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1.5rem'
                        }}>
                            <h2 style={{ margin: 0 }}>Available Technicians</h2>
                            <span style={{
                                padding: '0.35rem 0.85rem',
                                background: 'var(--primary-50)',
                                color: 'var(--primary)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                            }}>
                                {filteredTechs.length} found
                            </span>
                        </div>

                        {loading ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border)'
                            }}>
                                <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                                <p style={{ color: 'var(--text-secondary)' }}>Loading technicians...</p>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '3rem'
                                }}
                            >
                                {filteredTechs.map((tech, index) => (
                                    <motion.div
                                        key={tech.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <TechnicianCard tech={tech} onBook={() => openBooking(tech)} />
                                    </motion.div>
                                ))}
                                {filteredTechs.length === 0 && (
                                    <div style={{
                                        gridColumn: '1 / -1',
                                        textAlign: 'center',
                                        padding: '3rem 2rem',
                                        background: 'white',
                                        borderRadius: 'var(--radius-lg)',
                                        border: '1px solid var(--border)'
                                    }}>
                                        <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                                            No technicians match your criteria. Try adjusting your search.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Booking Modal */}
                    {showModal && selectedTech && (
                        <BookingModal
                            tech={selectedTech}
                            onClose={closeBooking}
                            onSuccess={handleBookingSuccess}
                        />
                    )}

                    {/* User's Requests */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--primary-50)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Calendar size={20} style={{ color: 'var(--primary)' }} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>My Service Requests</h2>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    Track your bookings and service history
                                </p>
                            </div>
                        </div>

                        {myRequests.length === 0 ? (
                            <div style={{
                                padding: '3rem 2rem',
                                textAlign: 'center'
                            }}>
                                <Clock size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    You haven't made any service requests yet.
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="btn btn-primary"
                                >
                                    Find a Technician <ArrowRight size={18} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--bg-secondary)' }}>
                                            <th style={{
                                                padding: '1rem 1.5rem',
                                                textAlign: 'left',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)'
                                            }}>Technician</th>
                                            <th style={{
                                                padding: '1rem 1.5rem',
                                                textAlign: 'left',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)'
                                            }}>Service</th>
                                            <th style={{
                                                padding: '1rem 1.5rem',
                                                textAlign: 'left',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)'
                                            }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myRequests.map((req, index) => (
                                            <motion.tr
                                                key={req.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                style={{
                                                    borderBottom: '1px solid var(--border)',
                                                    transition: 'background 0.15s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <td style={{
                                                    padding: '1rem 1.5rem',
                                                    fontWeight: '500'
                                                }}>{req.technicianName}</td>
                                                <td style={{
                                                    padding: '1rem 1.5rem',
                                                    color: 'var(--text-secondary)'
                                                }}>{req.serviceType}</td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    {getStatusBadge(req.status)}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
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

export default UserDashboard;
