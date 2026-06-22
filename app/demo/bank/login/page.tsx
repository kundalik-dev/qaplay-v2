"use client";

import React, { useState } from 'react';
import { useBankStore } from '../store/useBankStore';
import styles from '../styles/Bank.module.css';

export default function LoginPage() {
  const { login } = useBankStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      login(username);
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle} data-testid="login-header">Bank Portal Login</h1>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} data-testid="login-form">
          {/* Beginner Locator: Clean label, input id, and testid */}
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={styles.inputField}
              data-testid="login-username"
              placeholder="Enter your username"
            />
          </div>

          {/* Challenge Locator: Missing label and testid. Relies on placeholder or sibling traversal. */}
          <div className={styles.formGroup}>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Security Credential</span>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your password"
              // Deliberately omitting testid and standard label htmlFor
            />
          </div>

          <button type="submit" className={styles.submitBtn} data-testid="login-submit">
            Login
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
          Hint: Use any username and password to enter.
        </div>
      </div>
    </div>
  );
}
