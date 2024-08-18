"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // AuthContext에서 useAuth 훅 가져오기

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

// 로그인 API 요청 및 토큰 저장
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log('Server response:', data); // 서버 응답 출력

  if (res.ok) {
      const token = data.token;
      if (token) {
          login(token); // JWT 토큰을 사용해 로그인
          console.log('Received token:', token); // 받은 토큰 확인
          router.push('/'); // 홈으로 이동
      } else {
          console.error('No token received from server');
      }
  } else {
      setMessage(data.error);
  }
};
  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
