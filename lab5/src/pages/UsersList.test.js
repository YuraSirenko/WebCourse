import React from 'react';
import { render } from '@testing-library/react';
import UsersList from './UsersList';
import { AuthContext } from '../context/AuthContext';
import * as api from '../services/api';

describe('UsersList component service calls', () => {
  test('calls fetchUsers on mount', () => {
    const fetchSpy = jest.spyOn(api, 'fetchUsers').mockResolvedValue([]);
    render(
      <AuthContext.Provider value={{ user: { id: '1', role: 'admin' }, ROLES: { ADMIN: 'admin' } }}>
        <UsersList />
      </AuthContext.Provider>
    );
    expect(fetchSpy).toHaveBeenCalled();
  });
});
