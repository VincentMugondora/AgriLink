import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { confirmPassword, ...userData } = data;
    const result = await registerUser(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('root', { message: result.error });
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Join Farm Connect
          </h1>
          <p style={{ color: '#6b7280' }}>
            Create your account to start trading
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {errors.root.message}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters'
                  }
                })}
                placeholder="John"
              />
              {errors.firstName && (
                <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters'
                  }
                })}
                placeholder="Doe"
              />
              {errors.lastName && (
                <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="john@example.com"
            />
            {errors.email && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[+]?[\d\s\-\(\)]+$/,
                  message: 'Invalid phone number'
                }
              })}
              placeholder="+263 123 456 789"
            />
            {errors.phone && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              {...register('role', {
                required: 'Please select your role'
              })}
            >
              <option value="">Select your role</option>
              <option value="farmer">Farmer - I grow and sell produce</option>
              <option value="trader">Trader - I buy and resell produce</option>
              <option value="buyer">Buyer - I purchase produce for consumption</option>
            </select>
            {errors.role && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: '3rem' }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match'
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              width: '100%',
              marginTop: '1rem',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#10b981',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
