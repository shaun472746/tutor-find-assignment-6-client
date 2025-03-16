'use client';

import { Col, Row } from 'antd';
import DashboardSidebar from './DashboardSidebar';
import DashboardManagement from './DashboardMainPage';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { tutorBookingData } from '@/types';
import { getAllBookingReq } from '@/services/TutorService';

export default function DashboardMainComponent() {
  const { user } = useUser();
  const [activeMenu, setActiveMenu] = useState<string>('manage-profile-tutor');
  const [bookings, setBookings] = useState<tutorBookingData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const gettingBookings = async () => {
      try {
        const res = await getAllBookingReq(user?.userId as string);
        setBookings(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    gettingBookings();
  }, [user, loading]);

  useEffect(() => {
    if (user?.role == 'student') {
      setActiveMenu('manage-profile-student');
    }
  }, [user]);
  return (
    <div className="dashboard-main-section">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8} md={8} lg={8} xl={6} className="gutter-row">
          <DashboardSidebar
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            bookings={bookings}
          />
        </Col>
        <Col xs={24} sm={16} md={16} lg={16} xl={18} className="gutter-row">
          <DashboardManagement
            activeMenu={activeMenu}
            bookings={bookings}
            setLoading={setLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
