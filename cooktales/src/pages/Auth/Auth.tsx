import React, { useEffect, useState } from 'react';
import { account } from '../../appwrite';
import './Auth.scss';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    try {
      await account.create(email, password, name);
      await account.createSession(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Registration error');
      console.error('Appwrite error:', err);
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await account.createSession(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login error');
      console.error('Appwrite error:', err);
    }
  };

  return (
    <div className="auth-page">
      {loading ? (
        <div className="auth-loader">
          <img src="/images/yellow.svg" alt="Loading..." className="auth-loader-img" />
        </div>
      ) : (
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form className="auth-form" onSubmit={isLogin ? login : register}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="auth-password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="auth-show-password"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {!isLogin && (
              <div className="auth-password-field">
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
                  required
                  value={repeatPassword}
                  onChange={e => setRepeatPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-show-password"
                  onClick={() => setShowRepeatPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showRepeatPassword ? '🙈' : '👁️'}
                </button>
              </div>
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