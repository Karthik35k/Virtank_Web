import React from 'react';
import './orders.css';
import { useOrderStatus, getReadableStatus } from '../../../context/OrderStatusContext';

const Orders = () => {
  const { orderIdToStatus, updateOrderStatus } = useOrderStatus();

  const rows = [
    { id: '#784213', customer: 'Rahul', total: '₹230', payment: 'UPI', eta: '25m' },
    { id: '#784214', customer: 'Anita', total: '₹140', payment: 'Card', eta: '35m' },
    { id: '#784215', customer: 'Vijay', total: '₹190', payment: 'COD', eta: '-' }
  ];

  const options = [
    { value: 'processing', label: 'Processing' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'on_the_way', label: 'On the way' },
    { value: 'delivered', label: 'Delivered' }
  ];

  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Orders</h2>
        <div className='section-actions'>
          <button className='btn ghost'>Export</button>
          <button className='btn'>New Order</button>
        </div>
      </div>
      <div className='table-wrap orders-table'>
        <table className='data'>
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>ETA</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const status = orderIdToStatus[row.id] || 'processing';
              const statusClass = status === 'delivered' ? 'success' : status === 'on_the_way' ? 'info' : status === 'preparing' ? 'warn' : 'neutral';
              return (
                <tr key={row.id}>
                  <td>{row.id}</td><td>{row.customer}</td><td>{row.total}</td><td>{row.payment}</td>
                  <td>
                    <span className={`status ${statusClass}`}>{getReadableStatus(status)}</span>
                  </td>
                  <td>{row.eta}</td>
                  <td>
                    <select className='admin-select' value={status} onChange={(e) => updateOrderStatus(row.id, e.target.value)}>
                      {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;


