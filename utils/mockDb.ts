
export interface EarlyAccessSignup {
  id: string;
  name: string;
  email: string;
  mobile: string;
  purpose: string;
  note: string;
  timestamp: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  note?: string;
  amount: string;
  currency: 'USD' | 'INR';
  paymentMethod: string;
  status: 'captured' | 'settled' | 'pending';
  timestamp: number;
}

const SIGNUP_KEY = 'mindlens_signups';
const BOOKING_KEY = 'mindlens_bookings';

export const saveSignup = (data: Omit<EarlyAccessSignup, 'id' | 'timestamp'>): void => {
  const existing = getSignups();
  const newEntry: EarlyAccessSignup = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now()
  };
  const updated = [...existing, newEntry];
  localStorage.setItem(SIGNUP_KEY, JSON.stringify(updated));
};

export const getSignups = (): EarlyAccessSignup[] => {
  const data = localStorage.getItem(SIGNUP_KEY);
  return data ? JSON.parse(data) : [];
};

// Fix: Modified signature to allow an optional id property, fixing errors in components/BookingModal.tsx
export const saveBooking = (data: Omit<Booking, 'id' | 'timestamp'> & { id?: string }): void => {
  const existing = getBookings();
  const newEntry: Booking = {
    ...data,
    // Fix: Correctly access the potentially provided id from the data object
    id: data.id || `ML-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    timestamp: Date.now(),
    status: 'captured' // In a real app, this updates via Webhook
  };
  const updated = [newEntry, ...existing];
  localStorage.setItem(BOOKING_KEY, JSON.stringify(updated));
};

export const getBookings = (): Booking[] => {
  const data = localStorage.getItem(BOOKING_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearAllData = () => {
  localStorage.removeItem(SIGNUP_KEY);
  localStorage.removeItem(BOOKING_KEY);
};
