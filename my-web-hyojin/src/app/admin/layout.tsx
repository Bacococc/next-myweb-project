// src/app/admin/layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import '@/styles/globals.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <head>
        <title>Admin Panel</title>
      </head>
      <body className='flex h-full'>

        {/* 사이드바 */}
        <aside className='w-[200px] h-screen p-1 flex-clo gap-1 bg-gray-50 text-center'>
          <Link href="/admin"><h2 className='m-6 text-2xl'>Admin</h2></Link>
          <Link href="/admin/projects"><p className='m-2'>프로젝트 관리</p></Link>
          <Link href="/admin/projects/post"><p className='m-2'>프로젝트 추가</p></Link>
          <Link href="/"><p className='m-2'>Go back to main</p></Link>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className='flex-1 p-2 bg-neutral-100'>
          {children}
        </main>
      </body>
    </html>
  );
}