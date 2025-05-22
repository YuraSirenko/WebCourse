import { createOrder, getOrdersByUser, updateOrder, getOrderById, ROLES, users } from './orderService';

describe('orderService functions', () => {
    let admin, waiter, guest;
    beforeAll(() => {
        admin = users.find(u => u.role === ROLES.ADMIN);
        waiter = users.find(u => u.role === ROLES.WAITER);
        guest = users.find(u => u.role === ROLES.GUEST);
    });

    test('createOrder adds a new order and returns it', () => {
        const initialCount = getOrdersByUser(admin).length;
        const newOrder = createOrder({ tableNumber: 5, guestId: guest.id, waiterId: waiter.id, items: ['Item1'] });
        expect(newOrder).toHaveProperty('id');
        expect(newOrder.tableNumber).toBe(5);
        expect(getOrdersByUser(admin).length).toBe(initialCount + 1);
    });

    test('getOrdersByUser filters based on role', () => {
        const ordersAdmin = getOrdersByUser(admin);
        const ordersWaiter = getOrdersByUser(waiter);
        const ordersGuest = getOrdersByUser(guest);
        ordersWaiter.forEach(o => expect(o.waiterId).toBe(waiter.id));
        ordersGuest.forEach(o => expect(o.guestId).toBe(guest.id));
        expect(ordersAdmin.length).toBeGreaterThanOrEqual(ordersWaiter.length);
        expect(ordersAdmin.length).toBeGreaterThanOrEqual(ordersGuest.length);
    });

    test('updateOrder updates when allowed', () => {
        const order = createOrder({ tableNumber: 10, guestId: guest.id, waiterId: waiter.id, items: ['A'] });
        const updated = updateOrder(order.id, waiter, { tableNumber: 20 });
        expect(updated).not.toBeNull();
        expect(updated.tableNumber).toBe(20);
    });

    test('updateOrder rejects unauthorized updates', () => {
        const order = createOrder({ tableNumber: 11, guestId: guest.id, waiterId: waiter.id, items: ['B'] });
        const result = updateOrder(order.id, guest, { tableNumber: 30 });
        expect(result).toBeNull();
    });

    test('getOrderById returns correct order', () => {
        const order = createOrder({ tableNumber: 15, guestId: guest.id, waiterId: waiter.id, items: [] });
        expect(getOrderById(order.id)).toEqual(order);
    });
});