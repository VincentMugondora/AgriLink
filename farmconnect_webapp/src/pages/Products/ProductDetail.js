import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { MapPin, Star, ShoppingCart, Phone, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);

  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    async () => {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    }
  );

  const handleOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (quantity > product.availableQuantity) {
      toast.error('Quantity exceeds available stock');
      return;
    }

    setIsOrdering(true);
    try {
      const response = await axios.post('/api/orders', {
        productId: product.id,
        quantity,
        buyerId: user.id,
        deliveryAddress: 'Default address', // This should come from user profile
        paymentMethod: 'ecocash'
      });

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setIsOrdering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#dc2626' }}>Product not found or error loading product.</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">
          Back to Products
        </button>
      </div>
    );
  }

  const totalPrice = (product.pricePerUnit * quantity).toFixed(2);

  return (
    <div style={{ padding: '2rem 0', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 140px)' }}>
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#10b981',
            cursor: 'pointer',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Product Images */}
          <div>
            <div style={{
              height: '400px',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.75rem'
                  }}
                />
              ) : (
                '🌾'
              )}
            </div>

            {/* Additional Images */}
            {product.images?.length > 1 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.5rem'
              }}>
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    style={{
                      height: '80px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '0.5rem',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '1rem'
              }}>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  margin: 0
                }}>
                  {product.name}
                </h1>
                <span style={{
                  backgroundColor: product.grade === 'A' ? '#dcfce7' : 
                                 product.grade === 'B' ? '#fef3c7' : '#fecaca',
                  color: product.grade === 'A' ? '#166534' : 
                         product.grade === 'B' ? '#92400e' : '#991b1b',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Grade {product.grade}
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem'
                }}>
                  {product.category}
                </span>
                <span style={{
                  backgroundColor: product.status === 'available' ? '#dcfce7' : '#fecaca',
                  color: product.status === 'available' ? '#166534' : '#991b1b',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {product.status === 'available' ? 'Available' : 'Sold Out'}
                </span>
              </div>

              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {product.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  ${product.pricePerUnit}
                </span>
                <span style={{
                  color: '#6b7280',
                  fontSize: '1.25rem'
                }}>
                  per {product.unit}
                </span>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
              }}>
                <p style={{
                  color: '#374151',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  Available Quantity: {product.availableQuantity} {product.unit}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Harvest Date: {new Date(product.harvestDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Order Section */}
            {product.status === 'available' && user?.id !== product.sellerId && (
              <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  Place Order
                </h3>

                <div className="form-group">
                  <label className="form-label">Quantity ({product.unit})</label>
                  <input
                    type="number"
                    className="form-input"
                    min="1"
                    max={product.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ fontWeight: '600' }}>Total Price:</span>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    ${totalPrice}
                  </span>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={isOrdering || quantity > product.availableQuantity}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <ShoppingCart size={20} />
                  {isOrdering ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            )}

            {/* Seller Information */}
            <div className="card">
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                Seller Information
              </h3>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: 'bold'
                }}>
                  {product.seller?.firstName?.charAt(0)}
                </div>
                <div>
                  <h4 style={{
                    fontWeight: '600',
                    color: '#1a202c',
                    margin: 0
                  }}>
                    {product.seller?.firstName} {product.seller?.lastName}
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    margin: 0
                  }}>
                    {product.seller?.role?.charAt(0).toUpperCase() + product.seller?.role?.slice(1)}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Phone size={16} color="#6b7280" />
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {product.seller?.phone}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Mail size={16} color="#6b7280" />
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {product.seller?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
