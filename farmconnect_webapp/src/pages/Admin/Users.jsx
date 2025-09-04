import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'

const UsersAdminPage = () => {
  const { user: currentUser } = useAuth()
  const [search, setSearch] = useState('')

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['admin-users', search],
    queryFn: async () => {
      const { data } = await axios.get('/api/admin/users', {
        params: { search, limit: 50 },
      })
      return data
    },
    keepPreviousData: true,
  })

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      toast.error("You can't delete your own account")
      return
    }
    const confirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.')
    if (!confirmed) return
    try {
      await axios.delete(`/api/admin/users/${id}`)
      toast.success('User deleted')
      refetch()
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete user'
      toast.error(msg)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email or phone..."
          className="w-full md:w-80 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {isFetching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">Loading users...</div>
      ) : isError ? (
        <div className="py-20 text-center text-red-600">Failed to load users</div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">No users found</td>
                </tr>
              )}
              {data?.data?.map(u => (
                <tr key={u.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.phone}</td>
                  <td className="px-4 py-3 text-sm"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{u.role}</span></td>
                  <td className="px-4 py-3 text-sm">
                    {u.status === 'active' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Active</span>}
                    {u.status === 'suspended' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Suspended</span>}
                    {u.status === 'banned' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Banned</span>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={u.id === currentUser?.id}
                      onClick={() => handleDelete(u.id)}
                      className={`px-3 py-1.5 text-sm rounded-md border ${u.id === currentUser?.id ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsersAdminPage
