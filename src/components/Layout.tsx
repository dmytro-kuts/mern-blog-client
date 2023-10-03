import React, { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className='wrapper'>
        <Header />
        <main className='page'>{children}</main>
      </div>
    </React.Fragment>
  );
};
