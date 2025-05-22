import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import * as api from '../services/api';
import { BrowserRouter } from 'react-router-dom';

xdescribe('Register page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows error when fields are missing', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/All fields are required/i)).toBeInTheDocument();
  });

  test('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'pass1' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'pass2' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test('shows error when username exists', async () => {
    jest.spyOn(api, 'fetchUsers').mockResolvedValue([{ username: 'existuser' }]);
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'existuser' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(await screen.findByText(/Username already exists/i)).toBeInTheDocument();
  });

  test('submits successfully when valid', async () => {
    jest.spyOn(api, 'fetchUsers').mockResolvedValue([]);
    jest.spyOn(api, 'createUser').mockResolvedValue({ username: 'newuser', role: 'guest' });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => expect(api.createUser).toHaveBeenCalledWith({ username: 'newuser', role: 'guest' }));
  });
});
