import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from './UserForm';
import * as api from '../services/api';
import * as orderService from '../services/orderService';

describe('UserForm Create', () => {
  const mockCreate = jest.spyOn(api, 'createUser').mockResolvedValue({ id: '10', username: 'new', role: 'guest' });
  const mockAdd = jest.spyOn(orderService, 'addUser').mockImplementation(() => {});
  test('renders create form and submits', async () => {
    render(<UserForm />);
    const input = screen.getByLabelText(/username/i);
    fireEvent.change(input, { target: { value: 'newuser' } });
    const button = screen.getByRole('button', { name: /create user/i });
    fireEvent.click(button);
    await waitFor(() => expect(mockCreate).toHaveBeenCalledWith({ username: 'newuser', role: 'guest' }));
    expect(mockAdd).toHaveBeenCalledWith({ name: 'new', role: 'guest' });
  });
});
