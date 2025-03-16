'use client';

import ProfileManagement from './subcomponents/ManageProfileTutor';
import ProfileManagementStudent from './subcomponents/ManageProfileStudent';
import BookingRequests from './subcomponents/BookingRequests';
import { tutorBookingData } from '@/types';
import TutorAcceptance from './subcomponents/TutorAcceptance';
import PastBookings from './subcomponents/PastBookings';
import PaymentHistory from './subcomponents/PaymentHistory';
import ReviewTutors from './subcomponents/ReviewTutors';
import TutorEarning from './subcomponents/TutorEarning';

interface DashboardManagementProps {
  activeMenu: string;
  bookings: tutorBookingData[] | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardManagement({
  activeMenu,
  bookings,
  setLoading,
}: DashboardManagementProps) {
  return (
    <div className="dashboard-section">
      {activeMenu == 'manage-profile-tutor' && <ProfileManagement />}
      {activeMenu == 'manage-profile-student' && <ProfileManagementStudent />}
      {activeMenu == 'booking-request' && (
        <BookingRequests bookings={bookings} setLoading={setLoading} />
      )}
      {activeMenu == 'tutor-acceptance' && <TutorAcceptance />}
      {activeMenu == 'past-bookings' && <PastBookings />}
      {activeMenu == 'payment-history' && <PaymentHistory />}
      {activeMenu == 'review-tutors' && <ReviewTutors />}
      {activeMenu == 'earnings' && <TutorEarning />}
    </div>
  );
}
