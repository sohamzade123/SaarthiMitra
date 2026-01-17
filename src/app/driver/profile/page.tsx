'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import styles from './page.module.css';

export default function DriverProfilePage() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [editSection, setEditSection] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock profile data
    const [profileData, setProfileData] = useState({
        name: user?.fullName || 'Rajesh Kumar',
        email: user?.email || 'rajesh@driver.com',
        phone: user?.phone || '+91 98765 43210',
        altPhone: user?.altPhone || '+91 91234 56789',
        vehicleType: 'Sedan - Maruti Suzuki Dzire',
        vehicleNumber: 'DL 01 AB 1234',
        serviceArea: 'Delhi NCR',
        emergencyContact1: 'Wife - +91 98765 11111',
        emergencyContact2: 'Brother - +91 98765 22222',
    });

    const handleSave = () => {
        setEditSection(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={() => router.push('/driver')}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1>My Profile</h1>
                <button className={styles.logoutBtn} onClick={logout}>
                    Logout
                </button>
            </header>

            <main className={styles.main}>
                {/* Profile Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                        <div className={styles.avatar}>
                            <span>{profileData.name.charAt(0)}</span>
                        </div>
                        <button className={styles.editAvatarBtn}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    <h2 className={styles.userName}>{profileData.name}</h2>
                    <span className={styles.roleLabel}>Driver</span>
                </div>

                {/* Driver Status */}
                <Card padding="medium" className={styles.statusCard}>
                    <h3 className={styles.sectionTitle}>Driver Status & Verification</h3>
                    <div className={styles.statusList}>
                        <div className={styles.statusItem}>
                            <span className={styles.statusIcon}>✅</span>
                            <span>Account Active</span>
                        </div>
                        <div className={styles.statusItem}>
                            <span className={styles.statusIcon}>✅</span>
                            <span>Driver Verified</span>
                            <span className={styles.verifiedBadge}>Verified</span>
                        </div>
                        <div className={styles.statusItem}>
                            <span className={styles.statusIcon}>✅</span>
                            <span>Background Check Passed</span>
                        </div>
                    </div>
                </Card>

                {/* Personal Information */}
                <Card padding="medium" className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Personal Information</h3>
                        <button
                            className={styles.editBtn}
                            onClick={() => setEditSection('personal')}
                        >
                            Edit
                        </button>
                    </div>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Full Name</span>
                            <span className={styles.infoValue}>{profileData.name}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Email Address</span>
                            <span className={styles.infoValue}>{profileData.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Primary Phone</span>
                            <span className={styles.infoValue}>{profileData.phone}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Secondary Phone</span>
                            <span className={styles.infoValue}>{profileData.altPhone}</span>
                        </div>
                    </div>
                </Card>

                {/* Vehicle Information */}
                <Card padding="medium" className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Vehicle Information</h3>
                        <button
                            className={styles.editBtn}
                            onClick={() => setEditSection('vehicle')}
                        >
                            Edit
                        </button>
                    </div>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Vehicle Type</span>
                            <span className={styles.infoValue}>{profileData.vehicleType}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Vehicle Number</span>
                            <span className={styles.infoValue}>{profileData.vehicleNumber}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Service Area</span>
                            <span className={styles.infoValue}>{profileData.serviceArea}</span>
                        </div>
                    </div>
                </Card>

                {/* Safety & Emergency */}
                <Card padding="medium" className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Safety & Emergency</h3>
                        <button
                            className={styles.editBtn}
                            onClick={() => setEditSection('safety')}
                        >
                            Edit
                        </button>
                    </div>
                    <div className={styles.emergencyContacts}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactIcon}>👤</span>
                            <span>{profileData.emergencyContact1}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactIcon}>👤</span>
                            <span>{profileData.emergencyContact2}</span>
                        </div>
                    </div>
                    <button
                        className={styles.sosLink}
                        onClick={() => router.push('/driver')}
                    >
                        <span>🚨</span>
                        Quick Access to Emergency SOS
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </Card>

                {/* App Preferences */}
                <Card padding="medium" className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>App Preferences</h3>
                    <div className={styles.preferencesList}>
                        <div className={styles.preferenceItem}>
                            <div className={styles.preferenceInfo}>
                                <span className={styles.preferenceLabel}>Dark Mode</span>
                                <span className={styles.preferenceDesc}>Switch between light and dark themes</span>
                            </div>
                            <span className={styles.preferenceHint}>Use toggle in header</span>
                        </div>
                        <div className={styles.preferenceItem}>
                            <div className={styles.preferenceInfo}>
                                <span className={styles.preferenceLabel}>Notifications</span>
                                <span className={styles.preferenceDesc}>Receive trip and safety alerts</span>
                            </div>
                            <div className={styles.toggleSwitch}>
                                <input type="checkbox" id="notifications" defaultChecked />
                                <label htmlFor="notifications"></label>
                            </div>
                        </div>
                        <div className={styles.preferenceItem}>
                            <div className={styles.preferenceInfo}>
                                <span className={styles.preferenceLabel}>Language</span>
                                <span className={styles.preferenceDesc}>App display language</span>
                            </div>
                            <span className={styles.preferenceValue}>English</span>
                        </div>
                    </div>
                </Card>
            </main>

            {/* Edit Modal */}
            <Modal
                isOpen={editSection !== null}
                onClose={() => setEditSection(null)}
                title={`Edit ${editSection === 'personal' ? 'Personal Information' : editSection === 'vehicle' ? 'Vehicle Information' : 'Emergency Contacts'}`}
            >
                <div className={styles.editForm}>
                    {editSection === 'personal' && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Primary Phone</label>
                                <input
                                    type="tel"
                                    defaultValue={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                />
                            </div>
                        </>
                    )}
                    {editSection === 'vehicle' && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Vehicle Type</label>
                                <input
                                    type="text"
                                    defaultValue={profileData.vehicleType}
                                    onChange={(e) => setProfileData({ ...profileData, vehicleType: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Vehicle Number</label>
                                <input
                                    type="text"
                                    defaultValue={profileData.vehicleNumber}
                                    onChange={(e) => setProfileData({ ...profileData, vehicleNumber: e.target.value })}
                                />
                            </div>
                        </>
                    )}
                    {editSection === 'safety' && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Emergency Contact 1</label>
                                <input
                                    type="text"
                                    defaultValue={profileData.emergencyContact1}
                                    onChange={(e) => setProfileData({ ...profileData, emergencyContact1: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Emergency Contact 2</label>
                                <input
                                    type="text"
                                    defaultValue={profileData.emergencyContact2}
                                    onChange={(e) => setProfileData({ ...profileData, emergencyContact2: e.target.value })}
                                />
                            </div>
                        </>
                    )}
                    <div className={styles.formActions}>
                        <button className={styles.cancelBtn} onClick={() => setEditSection(null)}>
                            Cancel
                        </button>
                        <button className={styles.saveBtn} onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Success Toast */}
            {showSuccess && (
                <div className={styles.successToast}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Changes saved successfully!
                </div>
            )}
        </div>
    );
}
