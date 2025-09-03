import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data: products, isLoading, error } = useQuery(
    ['products', { searchTerm, selectedCategory, selectedGrade, sortBy }],
    async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedGrade) params.append('grade', selectedGrade);
      params.append('sortBy', sortBy);
      
      const response = await axios.get(`/api/products?${params}`);
      return response.data;
    }
  );

  const categories = [
    'Vegetables', 'Fruits', 'Grains', 'Legumes', 'Herbs', 'Dairy', 'Livestock'
  ];

  const grades = ['A', 'B', 'C'];

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
        <p style={{ color: '#dc2626' }}>Error loading products. Please try again.</p>
      </div>
    );
  }

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
            Fresh Products 🌾
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Discover fresh produce directly from farmers and trusted traders
          </p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Search Products</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Grade</label>
              <select
                className="form-select"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest First</option>
                <option value="pricePerUnit">Price: Low to High</option>
                <option value="-pricePerUnit">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products?.data?.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              No products found matching your criteria.
            </p>
            <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {products?.data?.map((product) => (
              <div key={product.id} className="card" style={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}>
                {/* Product Image */}
                <div style={{
                  height: '200px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem'
                }}>
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0.5rem'
                      }}
                    />
                  ) : (
                    '🌾'
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#1a202c',
                      margin: 0
                    }}>
                      {product.name}
                    </h3>
                    <span style={{
                      backgroundColor: product.grade === 'A' ? '#dcfce7' : 
                                     product.grade === 'B' ? '#fef3c7' : '#fecaca',
                      color: product.grade === 'A' ? '#166534' : 
                             product.grade === 'B' ? '#92400e' : '#991b1b',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      Grade {product.grade}
                    </span>
                  </div>

                  <p style={{
                    color: '#6b7280',
                    marginBottom: '0.75rem',
                    fontSize: '0.875rem'
                  }}>
                    {product.description?.substring(0, 100)}
                    {product.description?.length > 100 && '...'}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#10b981'
                      }}>
                        ${product.pricePerUnit}
                      </span>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        marginLeft: '0.25rem'
                      }}>
                        /{product.unit}
                      </span>
                    </div>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      {product.availableQuantity} {product.unit} available
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <MapPin size={16} color="#6b7280" />
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      {product.seller?.firstName} {product.seller?.lastName}
                    </span>
                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {products?.pagination && products.pagination.totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
          }}>
            {Array.from({ length: products.pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn ${page === products.pagination.page ? 'btn-primary' : 'btn-outline'}`}
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

export default Products;
