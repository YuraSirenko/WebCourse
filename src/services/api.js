// Client-side mock API configuration
// We're implementing a fully client-side authentication system

// Mock user data for client-side testing
const MOCK_USERS = [
    {
        id: '1',
        username: 'admin',
        password: 'admin',
        role: 'admin',
    },
    {
        id: '2',
        username: 'user1',
        password: 'password1',
        role: 'user',
    },
    {
        id: '3',
        username: 'user2',
        password: 'password2',
        role: 'user',
    },
];

/**
 * Client-side login implementation
 * In a real application, this would make an API call to a server
 */
export async function loginRequest({ username, password }) {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    // Find the user in our mock database
    const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password,
    );
    
    if (user) {
        // Return user data without the password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    
    throw new Error('Invalid username or password');
}

export async function fetchUsers() {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    // Return users without passwords
    return MOCK_USERS.map(({ password, ...user }) => user);
}

export async function fetchUser(id) {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    const user = MOCK_USERS.find((u) => u.id === id);
    
    if (!user) {
        throw new Error('User not found');
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function createUser(data) {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    // Generate a new ID (would be handled by the server in a real app)
    const newId = String(MOCK_USERS.length + 1);
    
    // Create the new user
    const newUser = {
        id: newId,
        username: data.username,
        password: 'defaultpassword', // In a real app, this would be hashed
        role: data.role || 'user',
    };
    
    // Add to our mock database
    MOCK_USERS.push(newUser);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

export async function updateUser(id, data) {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    // Find the user
    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    // Update the user (preserving the password)
    MOCK_USERS[userIndex] = {
        ...MOCK_USERS[userIndex],
        username: data.username,
        role: data.role,
    };
    
    // Return user without password
    const { password, ...userWithoutPassword } = MOCK_USERS[userIndex];
    return userWithoutPassword;
}

export async function deleteUser(id) {
    // Simulate network delay
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });
    
    // Find the user
    const userIndex = MOCK_USERS.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    
    // Remove the user
    MOCK_USERS.splice(userIndex, 1);
    
    return null;
}
