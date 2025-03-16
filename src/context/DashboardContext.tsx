import { getAcceptedBookingService } from '@/services/DashboardService/StudentService';
import { TAcceptBookingRequest } from '@/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IDashboardProviderValues {
  acceptedBookingRequest: TAcceptBookingRequest[] | [];
  setIsDashboardLoading: Dispatch<SetStateAction<boolean>>;
  isDashboardLoading: boolean;
}

const DashboardContext = createContext<IDashboardProviderValues | undefined>(
  undefined
);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [acceptedBookingRequest, setAcceptedBookingRequest] = useState<
    TAcceptBookingRequest[] | []
  >([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const handleUser = async () => {
    const accBookingRequest = await getAcceptedBookingService();

    setAcceptedBookingRequest(accBookingRequest.data);
    setIsDashboardLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isDashboardLoading]);

  return (
    <DashboardContext.Provider
      value={{
        acceptedBookingRequest,
        isDashboardLoading,
        setIsDashboardLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): IDashboardProviderValues => {
  const context = useContext(DashboardContext);

  if (context == undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default DashboardProvider;
