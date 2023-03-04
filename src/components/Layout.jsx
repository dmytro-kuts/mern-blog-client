import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <Header />
        <main className="page">{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  );
};
