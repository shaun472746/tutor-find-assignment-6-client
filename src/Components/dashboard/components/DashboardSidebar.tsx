'use client';

import '../assets/DashboardSidebar.css';
import '@/../../assets/root.css';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Badge } from 'antd';

import { tutorBookingData } from '@/types';
import { useDashboard } from '@/context/DashboardContext';

interface DashboardManagementProps {
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;

  activeMenu: string;
  bookings: tutorBookingData[] | undefined;
}

export default function DashboardSidebar({
  setActiveMenu,
  activeMenu,

  bookings,
}: DashboardManagementProps) {
  const { user, setIsLoading } = useUser();

  const { acceptedBookingRequest, setIsDashboardLoading } = useDashboard();
  useEffect(() => {
    setIsDashboardLoading(true);
  }, [setIsDashboardLoading]);

  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push('/');
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };

  return (
    <div className="dashboard-sidebar-section">
      <div className="personal-detail">
        <Image
          src={user?.imageUrl || '/images/static/profile.png'}
          width={40}
          height={40}
          className="user-image"
          alt="user-image"
        />

        <h4 className="username">{user?.name}</h4>
      </div>
      {/* student navigation */}
      {user?.role == 'student' && (
        <div className="navigation">
          <button
            className={`${activeMenu == 'manage-profile-student' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('manage-profile-student')}
          >
            Manage Profile
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'tutor-acceptance' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('tutor-acceptance')}
          >
            Tutor Acceptance
            <Badge
              className="site-badge-count-109"
              count={acceptedBookingRequest?.length}
              style={{ backgroundColor: '#52c41a', marginLeft: '10px' }}
            />
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'past-bookings' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('past-bookings')}
          >
            Past Bookings
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'payment-history' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('payment-history')}
          >
            Payment History
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'review-tutors' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('review-tutors')}
          >
            Review Tutors
          </button>
          <button disabled={user?.updateProfile == true} className="nav-title">
            <div className="logout-action" onClick={handleLogout}>
              <LogoutOutlined className="icon" />
              Logout
            </div>
          </button>
        </div>
      )}

      {/* Tutor navigation */}
      {user?.role == 'tutor' && (
        <div className="navigation">
          <button
            className={`${activeMenu == 'manage-profile-tutor' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('manage-profile-tutor')}
          >
            Manage Profile
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'booking-request' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('booking-request')}
          >
            Bookings Requests{' '}
            <Badge
              className="site-badge-count-109"
              count={bookings?.length}
              style={{ backgroundColor: '#52c41a', marginLeft: '10px' }}
            />
          </button>
          <button
            disabled={user?.updateProfile == true}
            className={`${activeMenu == 'earnings' ? 'nav-title-active' : ''} nav-title`}
            onClick={() => setActiveMenu('earnings')}
          >
            Earnings
          </button>
          <button disabled={user?.updateProfile == true} className="nav-title">
            <div className="logout-action" onClick={handleLogout}>
              <LogoutOutlined className="icon" />
              Logout
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
