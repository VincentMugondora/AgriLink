import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Mail, Phone, MapPin, Edit3, Save, X, Eye, EyeOff, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      language: user?.language || 'en',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      businessName: user?.businessName || '',
      businessType: user?.businessType || ''
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
    watch
  } = useForm()

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put('/api/users/profile', data)
      return response.data
    },
    onSuccess: (data) => {
      updateUser(data.user)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
      queryClient.invalidateQueries(['user-profile'])
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put('/api/users/change-password', data)
      return response.data
    },
    onSuccess: () => {
      setShowPasswordForm(false)
      resetPassword()
      toast.success('Password changed successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to change password')
    }
  })

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data)
  }

  const onPasswordSubmit = (data) => {
    changePasswordMutation.mutate(data)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    reset()
  }

  const newPassword = watch('newPassword')

  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('profile.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('profile.personalInfo')}
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Edit3 size={16} className="mr-2" />
                    {t('profile.editProfile')}
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      <Save size={16} className="mr-2" />
                      {isSubmitting ? t('profile.saving') : t('profile.save')}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} className="mr-2" />
                      {t('profile.cancel')}
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fields.firstName')}
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: t('profile.errors.firstName') })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fields.lastName')}
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: t('profile.errors.lastName') })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.fields.email')}
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.fields.phone')}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.fields.language')}
                  </label>
                  <select
                    {...register('language')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 bg-white"
                  >
                    <option value="en">{t('languages.en')}</option>
                    <option value="sn">{t('languages.sn')}</option>
                    <option value="nd">{t('languages.nd')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.fields.address')}
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fields.city')}
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fields.state')}
                    </label>
                    <input
                      type="text"
                      {...register('state')}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.fields.zipCode')}
                    </label>
                    <input
                      type="text"
                      {...register('zipCode')}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {user?.role !== 'buyer' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.fields.businessName')}
                      </label>
                      <input
                        type="text"
                        {...register('businessName')}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.fields.businessType')}
                      </label>
                      <input
                        type="text"
                        {...register('businessType')}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Security
                </h2>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Change Password
                </button>
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...registerPassword('currentPassword', { required: 'Current password is required' })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="text-red-600 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        {...registerPassword('newPassword', { 
                          required: 'New password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-red-600 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      {...registerPassword('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === newPassword || 'Passwords do not match'
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={isPasswordSubmitting}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isPasswordSubmitting ? 'Changing...' : 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false)
                        resetPassword()
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Profile Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.role?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Language</p>
                    <p className="font-medium">
                      {({ en: 'English', sn: 'Shona', nd: 'Ndebele' }[user?.language] || user?.language || 'English')}
                    </p>
                  </div>
                </div>

                {user?.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}

                {(user?.city || user?.state) && (
                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {[user?.city, user?.state].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Member since</p>
                  <p className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
