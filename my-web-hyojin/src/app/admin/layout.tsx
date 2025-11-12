// src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>Admin Panel</title>
      </head>
      <body style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        {/* 사이드바 */}
        <aside
          style={{
            width: '200px',
            backgroundColor: '#f0f0f0',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          
          <Link href="/admin"><h2>Admin</h2></Link>
          <Link href="/admin/projects">프로젝트 관리</Link>
        </aside>

        {/* 메인 컨텐츠 */}
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}