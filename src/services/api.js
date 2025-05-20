const MOCK_USERS = [
    { id: '1', username: 'admin', password: 'admin', role: 'admin' },
    { id: '2', username: 'waiter', password: 'waiter', role: 'waiter' },
    { id: '3', username: 'guest', password: 'guest', role: 'guest' },
];

export async function loginRequest({ username, password }) {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password,
    );

    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    throw new Error('Invalid username or password');
}

export async function fetchUsers() {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    return MOCK_USERS.map(({ password, ...user }) => user);
}

export async function fetchUser(id) {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const user = MOCK_USERS.find((u) => u.id === id);

    if (!user) {
        throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function createUser(data) {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const newId = String(MOCK_USERS.length + 1);

    const newUser = {
        id: newId,
        username: data.username,
        password: 'defaultpassword', 
        role: data.role || 'guest',
    };

    MOCK_USERS.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function updateUser(id, data) {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        throw new Error('User not found');
    }

    MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        username: data.username,
        role: data.role,
    };

    const { password, ...userWithoutPassword } = MOCK_USERS[userIndex];
    return userWithoutPassword;
}

export async function deleteUser(id) {
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        throw new Error('User not found');
    }

    MOCK_USERS.splice(userIndex, 1);

    return null;
}
