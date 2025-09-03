import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Package, Clock, CheckCircle, XCircle, Truck, AlertCircle } from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');

  const { data: orders, isLoading, error } = useQuery(
    ['orders', user?.id, statusFilter],
    async () => {
      if (!user) return { data: [] };
      
      const endpoint = user.role === 'farmer' || user.role === 'trader' 
        ? `/api/orders/seller/${user.id}`
        : `/api/orders/buyer/${user.id}`;
      
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const response = await axios.get(`${endpoint}${params}`);
      return response.data;
    },
    {
      enabled: !!user
    }
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color="#f59e0b" />;
      case 'accepted':
      case 'paid':
        return <CheckCircle size={16} color="#10b981" />;
      case 'shipped':
        return <Truck size={16} color="#3b82f6" />;
      case 'delivered':
        return <CheckCircle size={16} color="#10b981" />;
      case 'cancelled':
      case 'rejected':
        return <XCircle size={16} color="#ef4444" />;
      case 'disputed':
        return <AlertCircle size={16} color="#f59e0b" />;
      default:
        return <Package size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'accepted':
      case 'paid':
      case 'delivered':
        return { bg: '#dcfce7', text: '#166534' };
      case 'shipped':
        return { bg: '#dbeafe', text: '#1d4ed8' };
      case 'cancelled':
      case 'rejected':
        return { bg: '#fecaca', text: '#991b1b' };
      case 'disputed':
        return { bg: '#fed7aa', text: '#9a3412' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#dc2626' }}>Error loading orders. Please try again.</p>
      </div>
    );
  }

  const isSeller = user?.role === 'farmer' || user?.role === 'trader';

  return (
    <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            {isSeller ? 'Sales Orders' : 'My Orders'} 📦
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            {isSeller 
              ? 'Manage your sales and track order fulfillment'
              : 'Track your purchases and order status'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div className="form-group" style={{ marginBottom: 0, minWidth: '200px' }}>
              <label className="form-label">Filter by Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Orders</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="disputed">Disputed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders?.data?.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Package size={48} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>No Orders Found</h3>
            <p style={{ color: '#6b7280' }}>
              {statusFilter 
                ? `No orders with status "${statusFilter}" found.`
                : isSeller 
                  ? 'You haven\'t received any orders yet.'
                  : 'You haven\'t placed any orders yet.'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders?.data?.map((order) => (
              <div key={order.id} className="card">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div>
                    {/* Order Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: '#1a202c',
                          margin: 0
                        }}>
                          Order #{order.id.slice(-8)}
                        </h3>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          margin: 0
                        }}>
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text,
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      gap: '1rem',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        🌾
                      </div>
                      <div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#1a202c',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {order.product?.name}
                        </h4>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          margin: 0
                        }}>
                          {order.quantity} {order.product?.unit} × ${order.unitPrice}
                        </p>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.875rem',
                          margin: 0
                        }}>
                          {isSeller 
                            ? `Buyer: ${order.buyer?.firstName} ${order.buyer?.lastName}`
                            : `Seller: ${order.product?.seller?.firstName} ${order.product?.seller?.lastName}`
                          }
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#10b981',
                          margin: 0
                        }}>
                          ${order.totalPrice}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        margin: 0
                      }}>
                        <strong>Delivery Address:</strong> {order.deliveryAddress}
                      </p>
                      {order.deliveryInstructions && (
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: '0.25rem 0 0 0'
                        }}>
                          <strong>Instructions:</strong> {order.deliveryInstructions}
                        </p>
                      )}
                    </div>

                    {/* Order Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      {isSeller && order.status === 'pending' && (
                        <>
                          <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                            Accept Order
                          </button>
                          <button className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
                            Reject Order
                          </button>
                        </>
                      )}
                      {isSeller && order.status === 'paid' && (
                        <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                          Mark as Shipped
                        </button>
                      )}
                      {isSeller && order.status === 'shipped' && (
                        <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                          Mark as Delivered
                        </button>
                      )}
                      {!isSeller && order.status === 'delivered' && (
                        <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                          Confirm Delivery
                        </button>
                      )}
                      <button className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {orders?.pagination && orders.pagination.totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
          }}>
            {Array.from({ length: orders.pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn ${page === orders.pagination.page ? 'btn-primary' : 'btn-outline'}`}
                style={{ minWidth: '2.5rem' }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
