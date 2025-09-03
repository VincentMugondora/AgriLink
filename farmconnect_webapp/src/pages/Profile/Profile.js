import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // TODO: Implement profile update API call
    console.log('Profile update:', data);
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Profile Settings 👤
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1a202c',
              margin: 0
            }}>
              Personal Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={16} />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* Profile Picture */}
              <div style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '5rem',
                  height: '5rem',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#1a202c',
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* First Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                  />
                ) : (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    color: '#374151'
                  }}>
                    {user?.firstName}
                  </div>
                )}
                {errors.firstName && (
                  <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-input"
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                  />
                ) : (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    color: '#374151'
                  }}>
                    {user?.lastName}
                  </div>
                )}
                {errors.lastName && (
                  <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Email Address
                </label>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  color: '#374151'
                }}>
                  {user?.email}
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    (Cannot be changed)
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    className="form-input"
                    {...register('phone', {
                      required: 'Phone number is required'
                    })}
                  />
                ) : (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    color: '#374151'
                  }}>
                    {user?.phone}
                  </div>
                )}
                {errors.phone && (
                  <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Role */}
              <div className="form-group">
                <label className="form-label">Role</label>
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  color: '#374151',
                  textTransform: 'capitalize'
                }}>
                  {user?.role}
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    (Cannot be changed)
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Account Statistics */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Account Statistics
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem'
            }}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                margin: 0
              }}>
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Member Since
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem'
            }}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                margin: 0
              }}>
                0
              </p>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Total Orders
              </p>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem'
            }}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#f59e0b',
                margin: 0
              }}>
                $0
              </p>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Total Spent
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
