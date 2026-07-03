import React from 'react';
import './content.css';

const Content = () => {
  const banners = [
    { id: 'BN-1', title: 'Dasara Offers' },
    { id: 'BN-2', title: 'Monsoon Specials' },
    { id: 'BN-3', title: 'Weekend Combo' }
  ];
  return (
    <section className='admin-section'>
      <div className='section-header'>
        <h2 className='section-title'>Content</h2>
        <div className='section-actions'>
          <button className='btn'>Add Banner</button>
        </div>
      </div>
      <div className='cards content-grid'>
        {banners.map(b => (
          <div className='card' key={b.id}>
            <div className='muted'>{b.id}</div>
            <div className='metric' style={{ fontSize: '1.1rem' }}>{b.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Content;


