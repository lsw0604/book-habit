import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'queries';

const domNode: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(domNode).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      <ReactQueryDevtools position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
