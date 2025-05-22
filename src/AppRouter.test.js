import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { AuthContext } from './context/AuthContext';

xdescribe('AppRouter', () => {
    test('redirects to login when not authenticated', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter initialEntries={["/users"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        // Should render the Login page
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('displays NavBar when authenticated', () => {
        const user = { id: 1, username: 'test', role: 'guest' };
        render(
            <AuthContext.Provider value={{ user }}>
                <MemoryRouter initialEntries={["/users"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/WebCourse SPA/i)).toBeInTheDocument();
    });

    test('redirects root path to login', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter initialEntries={["/"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders Register page on /register', () => {
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter initialEntries={["/register"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    test('renders Create User form on /users/new when authenticated', () => {
        const adminUser = { id: 1, username: 'admin', role: 'admin' };
        render(
            <AuthContext.Provider value={{ user: adminUser }}>
                <MemoryRouter initialEntries={["/users/new"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByRole('heading', { name: /Create User/i })).toBeInTheDocument();
    });

    test('renders Orders list on /orders when authenticated', () => {
        const guestUser = { id: 3, username: 'guest', role: 'guest' };
        render(
            <AuthContext.Provider value={{ user: guestUser }}>
                <MemoryRouter initialEntries={["/orders"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    });

    test('logs current path on render', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        render(
            <AuthContext.Provider value={{ user: null }}>
                <MemoryRouter initialEntries={["/testpath"]}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(consoleSpy).toHaveBeenCalledWith(
            'AppRouter rendering, current path:',
            '/testpath'
        );
        consoleSpy.mockRestore();
    });
});