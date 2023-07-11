import Header from 'components/Header/Header';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <body>{children}</body>
    </>
  );
}
