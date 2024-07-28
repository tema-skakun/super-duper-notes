"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
    </body>
    </html>
  );
}
