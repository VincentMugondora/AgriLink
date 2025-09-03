import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Package, ShoppingCart, TrendingUp, Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery('dashboard-stats', async () => {
    const response = await axios.get('/api/dashboard/stats');
    return response.data;
  });

  const getRoleBasedGreeting = () => {
    switch (user?.role) {
      case 'farmer':
        return 'Manage your farm products and track sales';
      case 'trader':
        return 'Monitor your trading activities and inventory';
      case 'buyer':
        return 'Track your orders and discover new products';
      default:
        return 'Welcome to your dashboard';
    }
  };

  const getRoleBasedActions = () => {
    switch (user?.role) {
      case 'farmer':
        return [
          { title: 'Add New Product', icon: Plus, link: '/products/new', color: '#10b981' },
          { title: 'My Products', icon: Package, link: '/products/my', color: '#3b82f6' },
          { title: 'Sales Orders', icon: ShoppingCart, link: '/orders?type=sales', color: '#f59e0b' },
          { title: 'Analytics', icon: TrendingUp, link: '/analytics', color: '#8b5cf6' }
        ];
      case 'trader':
        return [
          { title: 'Browse Products', icon: Package, link: '/products', color: '#10b981' },
          { title: 'My Inventory', icon: Package, link: '/inventory', color: '#3b82f6' },
          { title: 'Purchase Orders', icon: ShoppingCart, link: '/orders?type=purchases', color: '#f59e0b' },
          { title: 'Sales Analytics', icon: TrendingUp, link: '/analytics', color: '#8b5cf6' }
        ];
      case 'buyer':
        return [
          { title: 'Browse Products', icon: Package, link: '/products', color: '#10b981' },
          { title: 'My Orders', icon: ShoppingCart, link: '/orders', color: '#3b82f6' },
          { title: 'Favorites', icon: Users, link: '/favorites', color: '#f59e0b' },
          { title: 'Order History', icon: TrendingUp, link: '/orders/history', color: '#8b5cf6' }
        ];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)' }}>
      <div className="container">
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            {getRoleBasedGreeting()}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Total Products</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {stats?.totalProducts || 0}
                </p>
              </div>
              <Package size={32} style={{ opacity: 0.8 }} />
            </div>
          </div>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Active Orders</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {stats?.activeOrders || 0}
                </p>
              </div>
              <ShoppingCart size={32} style={{ opacity: 0.8 }} />
            </div>
          </div>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>This Month</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  ${stats?.monthlyRevenue || 0}
                </p>
              </div>
              <TrendingUp size={32} style={{ opacity: 0.8 }} />
            </div>
          </div>

          <div className="card" style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Connections</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {stats?.connections || 0}
                </p>
              </div>
              <Users size={32} style={{ opacity: 0.8 }} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {getRoleBasedActions().map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    backgroundColor: `${action.color}20`,
                    padding: '0.75rem',
                    borderRadius: '0.5rem'
                  }}>
                    <action.icon size={24} color={action.color} />
                  </div>
                  <div>
                    <h3 style={{
                      fontWeight: '600',
                      color: '#1a202c',
                      marginBottom: '0.25rem'
                    }}>
                      {action.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            Recent Activity
          </h2>
          <div style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
            <p>No recent activity to display.</p>
            <p style={{ marginTop: '0.5rem' }}>
              Start by {user?.role === 'farmer' ? 'adding products' : 'browsing products'} to see activity here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
