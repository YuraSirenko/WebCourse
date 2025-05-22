import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

describe('NavBar component', () => {
  const mockLogout = jest.fn();
  const user = { username: 'testuser', role: 'guest' };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders brand, user info and links', () => {
    render(
      <AuthContext.Provider value={{ user, logout: mockLogout }}>
        <NavBar />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/WebCourse SPA/i)).toBeInTheDocument();
    // user info
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText(/guest/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Orders/i })).toBeInTheDocument();
  });

  test('calls logout on button click with confirm', () => {
    window.confirm = jest.fn(() => true);
    render(
      <AuthContext.Provider value={{ user, logout: mockLogout }}>
        <NavBar />
      </AuthContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(window.confirm).toHaveBeenCalled();
    expect(mockLogout).toHaveBeenCalled();
  });
});
