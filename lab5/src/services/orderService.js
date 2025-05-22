let orders = [];
let orderId = 1;

export const ROLES = {
  ADMIN: 'admin',
  WAITER: 'waiter',
  GUEST: 'guest',
};

export const users = [
  { id: 1, name: 'Admin', role: ROLES.ADMIN },
  { id: 2, name: 'Waiter1', role: ROLES.WAITER },
  { id: 3, name: 'Guest1', role: ROLES.GUEST },
];

orders = [
  {
    id: orderId++,
    tableNumber: 1,
    guestId: 3,
    waiterId: 2,
    items: ['Soup', 'Steak'],
    createdAt: new Date('2025-05-20T12:00:00'),
  },
  {
    id: orderId++,
    tableNumber: 2,
    guestId: 3,
    waiterId: 2,
    items: ['Salad', 'Juice'],
    createdAt: new Date('2025-05-20T13:00:00'),
  },
];

export function createOrder({ tableNumber, guestId, waiterId, items }) {
  const order = {
    id: orderId++,
    tableNumber,
    guestId,
    waiterId,
    items: items || [],
    createdAt: new Date(),
  };
  orders.push(order);
  return order;
}

export function getOrdersByUser(user) {
  if (user.role === ROLES.ADMIN) return orders;
  if (user.role === ROLES.WAITER) return orders.filter(o => o.waiterId === user.id);
  if (user.role === ROLES.GUEST) return orders.filter(o => o.guestId === user.id);
  return [];
}

export function updateOrder(orderId, user, update) {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return null;
  const order = orders[idx];
  if (
    user.role === ROLES.ADMIN ||
    (user.role === ROLES.WAITER && order.waiterId === user.id)
  ) {
    orders[idx] = { ...order, ...update };
    return orders[idx];
  }
  return null;
}

export function getOrderById(orderId) {
  return orders.find(o => o.id === orderId);
}

export function addUser({ name, role }) {
  const newUser = {
    id: users.length + 1,
    name,
    role: role || ROLES.GUEST,
  };
  users.push(newUser);
  return newUser;
}
