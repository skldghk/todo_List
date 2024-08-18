"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function NavBar() {
  const { user, logout } = useAuth(); // isLoggedIn 대신 user를 사용합니다.

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/" style={styles.navLink}>
            Home
          </Link>
        </li>
        {user ? (  // user가 존재하면 로그인 상태로 판단합니다.
          <>
            <li style={styles.navItem}>
              <Link href="/todo" style={styles.navLink}>
                To-Do List
              </Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.navButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <Link href="/login" style={styles.navLink}>
                Login
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/signup" style={styles.navLink}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    padding: '1rem',
    backgroundColor: '#333',
  },
  navList: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '1rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};
