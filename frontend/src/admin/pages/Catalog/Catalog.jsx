import React from 'react';
import './catalog.css';

const Catalog = () => {
  const items = [
    { id: 'MI-101', name: 'Chicken Rolls', price: 20, stock: 25 },
    { id: 'MI-102', name: 'Jar Ice Cream', price: 10, stock: 14 },
    { id: 'MI-103', name: 'Chicken Sandwich', price: 12, stock: 32 }
  ];
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Catalog</h2>
        <div className='section-actions'>
          <button className='btn'>Add Item</button>
        </div>
      </div>
      <div className='table-wrap catalog-table'>
        <table className='data'>
          <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.id}</td><td>{it.name}</td><td>₹{it.price}</td><td>{it.stock}</td>
                <td><button className='btn secondary'>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Catalog;


