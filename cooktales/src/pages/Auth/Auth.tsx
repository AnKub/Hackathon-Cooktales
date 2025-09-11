import React, { useEffect, useState } from 'react';
import './Auth.scss';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="auth-page">
      {loading ? (
        <div className="auth-loader">
          <img src="/images/yellow.png" alt="Loading..." className="auth-loader-img" />
        </div>
      ) : (
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form className="auth-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {!isLogin && (
              <input type="password" placeholder="Repeat password" required />
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <button className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;