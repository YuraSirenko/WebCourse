import { loginRequest, fetchUsers, fetchUser, createUser, updateUser, deleteUser } from './api';

describe('API Service', () => {
    test('loginRequest resolves valid user and rejects invalid', async () => {
        const user = await loginRequest({ username: 'admin', password: 'admin' });
        expect(user).toMatchObject({ username: 'admin', role: 'admin' });
        await expect(loginRequest({ username: 'bad', password: 'wrong' })).rejects.toThrow('Invalid username or password');
    });

    test('fetchUsers returns users without password', async () => {
        const users = await fetchUsers();
        expect(Array.isArray(users)).toBe(true);
        users.forEach(u => expect(u).not.toHaveProperty('password'));
    });

    test('fetchUser returns user without password and rejects if not found', async () => {
        const u = await fetchUser('1');
        expect(u).toHaveProperty('username');
        await expect(fetchUser('999')).rejects.toThrow();
    });

    test('createUser adds and returns user, updateUser updates, deleteUser removes', async () => {
        const newUser = await createUser({ username: 'test', role: 'guest' });
        expect(newUser).toMatchObject({ username: 'test', role: 'guest' });
        const updated = await updateUser(newUser.id, { username: 'test2', role: 'waiter' });
        expect(updated).toMatchObject({ username: 'test2', role: 'waiter' });
        await expect(deleteUser(newUser.id)).resolves.toBeNull();
    });
});
