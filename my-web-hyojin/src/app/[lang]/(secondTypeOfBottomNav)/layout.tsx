import { ReactNode } from 'react';
import CopyRight from '../components/CopyRight';

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }:Props) {

  return (
    <>
      {children}
      <CopyRight />
    </>
  );
}