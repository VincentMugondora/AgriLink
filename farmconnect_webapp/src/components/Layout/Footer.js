import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#374151',
      color: 'white',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#10b981' }}>🌾 Farm Connect</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
              Connecting farmers, traders, and buyers for better agricultural commerce.
              Building sustainable food systems through technology.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/products" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  Browse Products
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/register" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  Join as Farmer
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/register" style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  Join as Buyer
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db' }}>Email: support@farmconnect.com</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db' }}>Phone: +263 123 456 789</span>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ color: '#d1d5db' }}>WhatsApp: +263 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #4b5563',
          paddingTop: '1rem',
          textAlign: 'center',
          color: '#9ca3af'
        }}>
          <p>&copy; 2024 Farm Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
