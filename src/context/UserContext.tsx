import {
  getCurrentUser,
  getProfileDetail,
  getTutorProfileDetail,
} from '@/services/AuthService';
import { FieldTypeRegister, ProfileDetail } from '@/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IUserProviderValues {
  user: FieldTypeRegister | null;
  isLoading: boolean;
  setUser: (user: FieldTypeRegister | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  profileDetail: ProfileDetail | null;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FieldTypeRegister | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileDetail, setProfileDetail] = useState<ProfileDetail | null>(
    null
  );

  const handleUser = async () => {
    const user = await getCurrentUser();
    if (user.role == 'student') {
      const studentProfile = await getProfileDetail(user?.userId as string);
      setProfileDetail(studentProfile.data);
    } else {
      const tutorProfile = await getTutorProfileDetail(user?.userId as string);
      setProfileDetail(tutorProfile.data);
    }

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, profileDetail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserProviderValues => {
  const context = useContext(UserContext);

  if (context == undefined) {
    throw new Error('useUser must be used within the UserProvider context');
  }

  return context;
};

export default UserProvider;
