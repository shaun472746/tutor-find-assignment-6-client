'use client';

import DashboardProvider from '@/context/DashboardContext';
import UserProvider from '@/context/UserContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <DashboardProvider>{children}</DashboardProvider>
    </UserProvider>
  );
};

export default Providers;
