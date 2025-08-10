import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { App } from '../src/App';

// Mock router and react-router-dom RouterProvider
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    RouterProvider: (props: any) => {
      return <div data-testid="router-provider">{props.children || 'RouterProvider'}</div>;
    },
  };
});

// Mock AuthProvider
vi.mock('../src/context/AuthContext', () => {
  return {
    AuthProvider: (props: any) => {
      return <div data-testid="auth-provider">{props.children}</div>;
    },
  };
});

// Mock router import
vi.mock('../src/router/router', () => ({
  router: {},
}));

describe('Main component', () => {
  it('renders AuthProvider and RouterProvider', () => {
    render(<App />);
    // Check if the AuthProvider wrapper is rendered
    const authProvider = screen.getByTestId('auth-provider');
    expect(authProvider).toBeDefined();

    // Check if the RouterProvider is inside AuthProvider
    const routerProvider = screen.getByTestId('router-provider');
    expect(routerProvider).toBeDefined();
  });
});