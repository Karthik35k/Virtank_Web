import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

const OrderStatusContext = createContext(null);

export const useOrderStatus = () => {
  const ctx = useContext(OrderStatusContext);
  if (!ctx) throw new Error('useOrderStatus must be used within OrderStatusProvider');
  return ctx;
};

export const OrderStatusProvider = ({ children }) => {
  const [orderIdToStatus, setOrderIdToStatus] = useState(() => ({
    '#784213': 'on_the_way',
    '#784214': 'preparing',
    '#784215': 'delivered'
  }));

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrderIdToStatus(prev => ({ ...prev, [orderId]: status }));
  }, []);

  const value = useMemo(() => ({ orderIdToStatus, updateOrderStatus }), [orderIdToStatus, updateOrderStatus]);

  return (
    <OrderStatusContext.Provider value={value}>
      {children}
    </OrderStatusContext.Provider>
  );
};

export const getReadableStatus = (status) => {
  switch (status) {
    case 'processing': return 'Processing';
    case 'preparing': return 'Preparing';
    case 'on_the_way': return 'On the way';
    case 'delivered': return 'Delivered';
    default: return 'Processing';
  }
};


