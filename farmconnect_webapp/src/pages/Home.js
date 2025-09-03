import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Users, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            🌾 Welcome to Farm Connect
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Connecting farmers, traders, and buyers for better agricultural commerce.
            Join our platform to buy and sell fresh produce directly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!user ? (
              <>
                <Link to="/register" className="btn" style={{
                  backgroundColor: 'white',
                  color: '#10b981',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}>
                  Get Started
                </Link>
                <Link to="/products" className="btn btn-outline" style={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}>
                  Browse Products
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn" style={{
                  backgroundColor: 'white',
                  color: '#10b981',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}>
                  Go to Dashboard
                </Link>
                <Link to="/products" className="btn btn-outline" style={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}>
                  Browse Products
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#1a202c'
          }}>
            Why Choose Farm Connect?
          </h2>
          
          <div className="grid md:grid-cols-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#dcfce7',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Leaf size={32} color="#10b981" />
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Fresh Produce</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Direct from farm to table. Get the freshest produce with complete traceability
                and quality assurance from verified farmers.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#dbeafe',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Users size={32} color="#3b82f6" />
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Trusted Community</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Join a verified community of farmers, traders, and buyers. Build lasting
                relationships and grow your agricultural business.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#fef3c7',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <TrendingUp size={32} color="#f59e0b" />
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Fair Pricing</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Transparent pricing with real-time market rates. Farmers get fair prices
                and buyers get competitive deals.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#fce7f3',
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Shield size={32} color="#ec4899" />
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Secure Transactions</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Safe and secure payment processing with escrow protection. Your money
                is protected until delivery is confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#1a202c'
          }}>
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Register & Verify</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Sign up as a farmer, trader, or buyer. Complete KYC verification
                to join our trusted community.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>List or Browse</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Farmers list their produce with photos and details.
                Buyers browse and find exactly what they need.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Trade & Deliver</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Place orders, make secure payments, and arrange delivery.
                Track your orders from farm to doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: '#1f2937',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            color: '#d1d5db'
          }}>
            Join thousands of farmers, traders, and buyers already using Farm Connect
          </p>
          {!user && (
            <Link to="/register" className="btn btn-primary" style={{
              fontSize: '1.1rem',
              padding: '1rem 2rem'
            }}>
              Join Farm Connect Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
