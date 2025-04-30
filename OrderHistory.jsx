import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.warn("Using dummy orders (API failed)");
        setOrders([
          {
            _id: '1',
            orderNumber: 'ORD123',
            orderDetails: '2x Cake, 1x Coffee',
            state: 'Delivered',
            date: '2024-03-01',
            total: 'LKR 1500',
          },
          {
            _id: '2',
            orderNumber: 'ORD124',
            orderDetails: '1x Pizza, 1x Juice',
            state: 'Processing',
            date: '2024-03-03',
            total: 'LKR 2200',
          },
        ]);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSingleDelete = async (orderId) => {
    if (!orderId) return;

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      const updatedOrders = orders.filter(order => order._id !== orderId);
      setOrders(updatedOrders);
      setSuccessMsg('Order deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order._id);
    setEditedOrder({ ...order });
  };

  const handleEditChange = (field, value) => {
    setEditedOrder((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === editingOrderId ? editedOrder : order
      )
    );
    setEditingOrderId(null);
    setEditedOrder({});
    setSuccessMsg('Order updated');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditedOrder({});
  };

  return (
    <div className="order-history-container">
      <h2>Order History</h2>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error-message">❌ Error: {error}</p>
      ) : (
        <>
          {successMsg && <p className="success-message">✅ {successMsg}</p>}
          <table className="order-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Order Details</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>

                  <td>
                    {editingOrderId === order._id ? (
                      <input
                        type="text"
                        value={editedOrder.orderDetails}
                        onChange={(e) => handleEditChange("orderDetails", e.target.value)}
                      />
                    ) : (
                      order.orderDetails
                    )}
                  </td>

                  <td>
                    {editingOrderId === order._id ? (
                      <select
                        value={editedOrder.state}
                        onChange={(e) => handleEditChange("state", e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      order.state
                    )}
                  </td>

                  <td>{order.date || "2024-03-20"}</td>
                  <td>{order.total || "LKR 0"}</td>

                  <td>
                    {editingOrderId === order._id ? (
                      <>
                        <button onClick={handleSaveEdit} className="edit-button">Save</button>
                        <button onClick={handleCancelEdit} className="delete-button">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(order)} className="edit-button">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleSingleDelete(order._id)} className="delete-button">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
