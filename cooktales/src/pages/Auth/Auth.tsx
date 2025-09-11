import React, { useEffect, useState } from 'react';
import { account } from '../../appwrite'; 
import './Auth.scss';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

 
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await account.create('unique()', email, password);
     await account.createSession(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || "Registration error");
    }
  };

  // Логін
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await account.createSession(email, password);
      window.location.href = '/'; 
    } catch (err: any) {
      setError(err.message || "Login error");
    }
  };

  return (
    <div className="auth-page">
      {loading ? (
        <div className="auth-loader">
          <img src="/images/yellow.png" alt="Loading..." className="auth-loader-img" />
        </div>
      ) : (
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form className="auth-form" onSubmit={isLogin ? login : register}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Repeat password"
                required
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
              />
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            {error && <div className="auth-error">{error}</div>}
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