
export interface EarlyAccessSignup {
  id: string;
  name: string;
  email: string;
  mobile: string;
  purpose: string;
  note: string;
  timestamp: number;
}

const DB_KEY = 'mindlens_signups';

export const saveSignup = (data: Omit<EarlyAccessSignup, 'id' | 'timestamp'>): void => {
  const existing = getSignups();
  const newEntry: EarlyAccessSignup = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now()
  };
  const updated = [...existing, newEntry];
  localStorage.setItem(DB_KEY, JSON.stringify(updated));
  console.log('Data saved to Mock DB:', newEntry);
};

export const getSignups = (): EarlyAccessSignup[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : [];
};
