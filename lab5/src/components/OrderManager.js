import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { users, ROLES, createOrder, getOrdersByUser, updateOrder } from '../services/orderService';

export default function OrderManager() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState(() => getOrdersByUser(user));
  const [editingOrder, setEditingOrder] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ tableNumber: '', guestId: '', items: '', waiterId: user.role === ROLES.WAITER ? user.id : '' });

  const refreshOrders = () => setOrders(getOrdersByUser(user));

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = e => {
    e.preventDefault();
    if (!form.tableNumber || !form.guestId) return;
    createOrder({
      tableNumber: form.tableNumber,
      guestId: Number(form.guestId),
      waiterId: user.id,
      items: form.items.split(',').map(i => i.trim()).filter(Boolean),
    });
    setForm({ tableNumber: '', guestId: '', items: '', waiterId: user.role === ROLES.WAITER ? user.id : '' });
    refreshOrders();
    setShowCreateForm(false);
  };

  const handleEdit = order => {
    setEditingOrder(order);
    setForm({
      tableNumber: order.tableNumber,
      guestId: order.guestId,
      items: order.items.join(', '),
      waiterId: order.waiterId,
    });
  };

  const handleSave = e => {
    e.preventDefault();
    if (!editingOrder) return;
    updateOrder(editingOrder.id, user, {
      tableNumber: form.tableNumber,
      guestId: Number(form.guestId),
      waiterId: Number(form.waiterId),
      items: form.items.split(',').map(i => i.trim()).filter(Boolean),
    });
    setEditingOrder(null);
    setForm({ tableNumber: '', guestId: '', items: '', waiterId: '' });
    refreshOrders();
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setForm({ tableNumber: '', guestId: '', items: '', waiterId: '' });
    setShowCreateForm(false);
  };

  // Render order form for waiter/admin
  const renderOrderForm = () => (
    <form onSubmit={editingOrder ? handleSave : handleCreate} style={{ marginBottom: 24, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(25,118,210,0.08)', padding: 24, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: 16 }}>{editingOrder ? 'Edit Order' : 'Create New Order'}</h3>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <input
          name="tableNumber"
          placeholder="Table Number"
          value={form.tableNumber}
          onChange={handleChange}
          required
          style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #bdbdbd', fontSize: 16 }}
        />
        <select name="guestId" value={form.guestId} onChange={handleChange} required style={{ flex: 2, padding: 10, borderRadius: 10, border: '1px solid #bdbdbd', fontSize: 16 }}>
          <option value="">Select Guest</option>
          {users.filter(u => (u.name.toLowerCase().startsWith('guest'))).map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      {editingOrder && user.role === ROLES.ADMIN && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <select name="waiterId" value={form.waiterId} onChange={handleChange} required style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #bdbdbd', fontSize: 16 }}>
            <option value="">Select Waiter</option>
            {users.filter(u => u.role === ROLES.WAITER).map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>
      )}
      <input
        name="items"
        placeholder="Items (comma separated)"
        value={form.items}
        onChange={handleChange}
        style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #bdbdbd', fontSize: 16, marginBottom: 12 }}
      />
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button type="submit" style={{ flex: 2, background: 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>{editingOrder ? 'Save' : 'Create'} Order</button>
        {editingOrder && <button type="button" onClick={handleCancel} style={{ flex: 1, background: '#eee', color: '#333', border: 'none', borderRadius: 12, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>}
      </div>
    </form>
  );

  return (
    <div style={{ maxWidth: 900, margin: '32px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Orders</h2>
        {(user.role === ROLES.WAITER || user.role === ROLES.ADMIN) && !showCreateForm && !editingOrder && (
          <button onClick={() => setShowCreateForm(true)} className="btn">
            + New Order
          </button>
         )}
      </div>
      {/* Show form */}
      {(showCreateForm || editingOrder) && renderOrderForm()}
      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(25,118,210,0.08)', padding: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Table</th>
              <th style={{ padding: 10 }}>Guest</th>
              <th style={{ padding: 10 }}>Waiter</th>
              <th style={{ padding: 10 }}>Items</th>
              <th style={{ padding: 10 }}>Created</th>
              {(user.role === ROLES.ADMIN || user.role === ROLES.WAITER) && <th style={{ padding: 10 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: 10 }}>{order.id}</td>
                <td style={{ padding: 10 }}>{order.tableNumber}</td>
                <td style={{ padding: 10 }}>{users.find(u => u.id === order.guestId)?.name || order.guestId}</td>
                <td style={{ padding: 10 }}>{users.find(u => u.id === order.waiterId)?.name || order.waiterId}</td>
                <td style={{ padding: 10 }}>{order.items.join(', ')}</td>
                <td style={{ padding: 10 }}>{order.createdAt.toLocaleString ? order.createdAt.toLocaleString() : order.createdAt}</td>
                {(user.role === ROLES.ADMIN || (user.role === ROLES.WAITER && order.waiterId === user.id)) && (
                  <td style={{ padding: 10 }}>
                    <button onClick={() => handleEdit(order)} style={{ background: 'linear-gradient(90deg, #1976d2 60%, #2196f3 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Edit</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {user.role === ROLES.GUEST && orders.length === 0 && <div style={{ textAlign: 'center', marginTop: 24, color: '#888' }}>No orders found.</div>}
      </div>
    </div>
  );
}
