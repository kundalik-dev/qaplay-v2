"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBankStore } from './store/useBankStore';
import styles from './styles/Bank.module.css';
import { LogOut, Home, User, Settings } from 'lucide-react';

export default function BankLayout({ children }: { children: React.ReactNode }) {
  const { version, setVersionAndData, isLoggedIn, logout } = useBankStore();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Version Check Sync Logic
  useEffect(() => {
    async function syncData() {
      try {
        const { version: serverVersion } = await fetch('/api/bank-version').then(r => r.json());
        
        if (serverVersion !== version) {
          // Version mismatch (or first load): Fetch all data and populate local storage
          console.log(`[BankApp] Syncing data. Local: ${version}, Server: ${serverVersion}`);
          const data = await fetch('/api/bank-data').then(r => r.json());
          setVersionAndData(serverVersion, data.balance, data.transactions);
        } else {
          console.log(`[BankApp] Cache hit. Serving data from localStorage. Version: ${version}`);
        }
      } catch (err) {
        console.error("Failed to sync bank data:", err);
      } finally {
        setIsReady(true);
      }
    }

    syncData();
  }, [version, setVersionAndData]);

  // Protect routes based on login status
  useEffect(() => {
    if (isReady) {
      if (!isLoggedIn && pathname !== '/bank/login') {
        router.push('/bank/login');
      } else if (isLoggedIn && pathname === '/bank/login') {
        router.push('/bank/dashboard');
      }
    }
  }, [isReady, isLoggedIn, pathname, router]);

  if (!isReady) {
    // Skeleton or blank while hydrating/syncing
    return <div className={styles.loginWrapper}>Loading secure banking portal...</div>;
  }

  // If on login page, don't show the app shell sidebar
  if (pathname === '/bank/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push('/bank/login');
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', padding: '0 1rem', marginBottom: '1rem' }}>QA Bank</h2>
        
        <Link 
          href="/bank/dashboard" 
          className={`${styles.sidebarLink} ${pathname === '/bank/dashboard' ? styles.sidebarLinkActive : ''}`}
          data-testid="sidebar-link-dashboard"
        >
          <Home size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Dashboard
        </Link>

        {/* Dummy links for practice UI */}
        <Link 
          href="/bank/dashboard" 
          className={styles.sidebarLink}
          data-testid="sidebar-link-profile"
        >
          <User size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Profile
        </Link>

        <Link 
          href="/bank/dashboard" 
          className={styles.sidebarLink}
          data-testid="sidebar-link-settings"
        >
          <Settings size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
          Settings
        </Link>

      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div style={{ fontWeight: 500 }}>Secure Portal</div>
          <button 
            onClick={handleLogout} 
            className={styles.exportBtn} // Reusing button style
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'transparent' }}
            data-testid="header-logout-btn"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>
        
        <div className={styles.pageContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}
