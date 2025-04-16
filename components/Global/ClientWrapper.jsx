'use client';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Global/Footer';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdminRoute && <Footer/>}
    </>
  );
}