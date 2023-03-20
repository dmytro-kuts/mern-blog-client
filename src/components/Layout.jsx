import React from 'react';
import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <Header />
        <main className="page">{children}</main>
      </div>
    </React.Fragment>
  );
};
