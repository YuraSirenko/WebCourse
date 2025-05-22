import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderManager from './OrderManager';
import { AuthContext } from '../context/AuthContext';
import * as orderService from '../services/orderService';

const MockProvider = ({ user, children }) => (
  <AuthContext.Provider value={{ user }}>
    {children}
  </AuthContext.Provider>
);

describe('OrderManager component', () => {
  const admin = { id: 1, role: orderService.ROLES.ADMIN };
  beforeEach(() => {
    jest.spyOn(orderService, 'getOrdersByUser').mockReturnValue([]);
  });

  test('renders empty state for guest', () => {
    const guest = { id: 3, role: orderService.ROLES.GUEST };
    render(
      <MockProvider user={guest}>
        <OrderManager />
      </MockProvider>
    );
    expect(screen.getByText(/No orders found/i)).toBeInTheDocument();
  });

  test('shows create form for admin', () => {
    render(
      <MockProvider user={admin}>
        <OrderManager />
      </MockProvider>
    );
    fireEvent.click(screen.getByText(/New Order/i));
    expect(screen.getByText(/Create New Order/i)).toBeInTheDocument();
  });
});