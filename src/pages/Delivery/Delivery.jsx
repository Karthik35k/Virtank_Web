import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStatus, getReadableStatus } from '../../context/OrderStatusContext';
import './Delivery.css';

const Delivery = () => {
  const navigate = useNavigate();
  const { orderIdToStatus } = useOrderStatus();
  const currentOrderId = '#784213';
  const status = orderIdToStatus[currentOrderId] || 'processing';
  const tracking = useMemo(() => ({
    orderId: 'ORD-784213',
    eta: '28-35 min',
    stages: [
      { key: 'placed', label: 'Order Placed', time: '12:15 PM', done: true, icon: '✓' },
      { key: 'preparing', label: 'Preparing', time: '12:22 PM', done: true, icon: '✓' },
      { key: 'picked', label: 'Picked Up', time: '12:40 PM', done: true, icon: '✓' },
      { key: 'enroute', label: 'On the Way', time: '—', done: orderIdToStatus['#784213'] === 'on_the_way' || orderIdToStatus['#784213'] === 'delivered', icon: '🚚' },
      { key: 'delivered', label: 'Delivered', time: '—', done: orderIdToStatus['#784213'] === 'delivered', icon: '✓' }
    ],
    rider: {
      name: 'Rahul Kumar',
      phone: '+91 91827 18386',
      vehicle: 'AP 07 CD 1234',
      avatar: '👤'
    },
    restaurant: {
      name: 'Mirchi Restaurant',
      address: 'Main Road, Guntur'
    },
    destination: {
      name: '22B-14/A',
      address: 'Lakshmipuram, Guntur'
    }
  }), [orderIdToStatus]);

  const totalStages = tracking.stages.length;
  const completedStages = tracking.stages.filter(s => s.done).length;
  const progressPercent = Math.round((completedStages / totalStages) * 100);
  const currentStage = tracking.stages.find(s => !s.done) || tracking.stages[tracking.stages.length - 1];

  return (
    <div className='delivery-page'>
      <div className='delivery-container'>
        <div className='delivery-header'>
          <div className='header-icon'>📦</div>
          <h1>Track Your Order</h1>
          <div className='order-info'>
            <span className='order-id'>Order {tracking.orderId}</span>
            <span className='eta-badge'>
              <span className='eta-icon'>⏱</span>
              ETA: {tracking.eta}
            </span>
            <span className={`status-pill ${status}`}>
              {getReadableStatus(status)}
            </span>
          </div>
          <div className='progress-section'>
            <div className='progress-bar' aria-label='delivery progress'>
              <div className='progress-fill' style={{ width: `${progressPercent}%` }}>
                <div className='progress-glow' />
              </div>
            </div>
            <div className='progress-meta'>
              <span className='progress-text'>
                <strong>{completedStages}</strong> of <strong>{totalStages}</strong> steps completed
              </span>
              <span className='progress-percent'>{progressPercent}%</span>
            </div>
            {currentStage && !currentStage.done && (
              <div className='current-status'>
                <span className='pulse-dot' /> Currently: {currentStage.label}
              </div>
            )}
          </div>
        </div>

        <div className='delivery-grid'>
          <div className='tracking-card card-elevated'>
            <div className='card-header'>
              <h2>
                <span className='card-icon'>📍</span>
                Live Status
              </h2>
            </div>
            <div className='tracking-timeline'>
              {tracking.stages.map((stage, index) => (
                <div key={stage.key} className={`timeline-item ${stage.done ? 'completed' : ''} ${index === completedStages - 1 ? 'active' : ''}`}>
                  <div className='timeline-marker'>
                    <div className='marker-inner'>
                      {stage.done ? <span className='check-icon'>✓</span> : <span className='stage-icon'>{stage.icon}</span>}
                    </div>
                    {index < tracking.stages.length - 1 && <div className='timeline-line' />}
                  </div>
                  <div className='timeline-content'>
                    <div className='timeline-title'>{stage.label}</div>
                    <div className='timeline-time'>{stage.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='info-card card-elevated'>
            <div className='card-header'>
              <h2>
                <span className='card-icon'>🚴</span>
                Delivery Partner
              </h2>
            </div>
            <div className='rider-profile'>
              <div className='rider-avatar'>{tracking.rider.avatar}</div>
              <div className='rider-info'>
                <div className='rider-name'>{tracking.rider.name}</div>
                <div className='rider-vehicle'>{tracking.rider.vehicle}</div>
              </div>
            </div>
            <div className='info-details'>
              <div className='info-item'>
                <span className='info-label'>📞 Phone</span>
                <a className='info-value link' href={`tel:${tracking.rider.phone.replace(/[^0-9+]/g, '')}`}>
                  {tracking.rider.phone}
                </a>
              </div>
              <div className='info-item'>
                <span className='info-label'>🏍️ Vehicle</span>
                <span className='info-value'>{tracking.rider.vehicle}</span>
              </div>
            </div>
            <div className='actions'>
              <a className='btn btn-primary' href={`tel:${tracking.rider.phone.replace(/[^0-9+]/g, '')}`}>
                <span className='btn-icon'>📞</span>
                Call Rider
              </a>
              <button 
                className='btn btn-secondary' 
                onClick={() => navigator?.share ? navigator.share({ title: 'Track my order', text: `Order ${tracking.orderId}`, url: window.location.href }) : window.alert('Share this page link to track the order.')}
              >
                <span className='btn-icon'>🔗</span>
                Share
              </button>
              <button className='btn btn-ghost' onClick={() => navigate('/help-support')}>
                <span className='btn-icon'>❓</span>
                Help
              </button>
            </div>
          </div>

          <div className='info-card card-elevated route-card'>
            <div className='card-header'>
              <h2>
                <span className='card-icon'>🗺️</span>
                Delivery Route
              </h2>
            </div>
            <div className='route-container'>
              <div className='route-point origin-point'>
                <div className='route-marker origin-marker'>
                  <div className='marker-pulse' />
                </div>
                <div className='route-info'>
                  <div className='route-label'>From</div>
                  <div className='route-name'>{tracking.restaurant.name}</div>
                  <div className='route-address'>{tracking.restaurant.address}</div>
                </div>
              </div>
              <div className='route-connector'>
                <div className='connector-line' />
                <div className='connector-icon'>→</div>
              </div>
              <div className='route-point destination-point'>
                <div className='route-marker destination-marker'>
                  <div className='marker-pulse' />
                </div>
                <div className='route-info'>
                  <div className='route-label'>To</div>
                  <div className='route-name'>{tracking.destination.name}</div>
                  <div className='route-address'>{tracking.destination.address}</div>
                </div>
              </div>
            </div>
            <a 
              className='map-button' 
              href="https://www.google.com/maps?q=Lakshmipuram,+Guntur,+Andhra+Pradesh+522007" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className='map-icon'>🗺️</span>
              <span>View on Google Maps</span>
              <span className='map-arrow'>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;


