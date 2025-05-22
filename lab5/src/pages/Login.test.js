import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

xdescribe('Login page', () => {
  const mockLogin = jest.fn();
  const setup = () => {
    render(
      <AuthContext.Provider value={{ user: null, login: mockLogin }}>
        <Login />
      </AuthContext.Provider>
    );
  };

  test('renders inputs and submits', async () => {
    setup();
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /login/i });
    fireEvent.change(username, { target: { value: 'admin' } });
    fireEvent.change(password, { target: { value: 'admin' } });
    fireEvent.click(submit);
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'admin', password: 'admin' });
    });
  });
});
