import { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';
import './Profile.css';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page profile-page" id="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-layout">
          <div className="profile-card glass-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{user.name}</h2>
                <p className="profile-role">
                  {user.role === 'admin' ? '👨‍💼 Admin' : '🛒 Customer'}
                </p>
                <p className="profile-since">Member since {formatDate(user.createdAt)}</p>
              </div>
            </div>

            {saved && (
              <div className="save-toast animate-fade-in-up">
                ✅ Profile updated successfully!
              </div>
            )}

            <div className="profile-fields">
              <div className="profile-field">
                <label><User size={14} /> Full Name</label>
                {editing ? (
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>

              <div className="profile-field">
                <label><Mail size={14} /> Email</label>
                <p>{user.email}</p>
              </div>

              <div className="profile-field">
                <label><Phone size={14} /> Phone</label>
                {editing ? (
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p>{user.phone || 'Not added'}</p>
                )}
              </div>
            </div>

            <div className="profile-actions">
              {editing ? (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary" onClick={() => setEditing(true)} id="edit-profile-btn">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
