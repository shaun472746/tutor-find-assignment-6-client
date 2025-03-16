'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/BookingRequests.css';
import '@/../../assets/root.css';

import { Button, Col, Row } from 'antd';
import { tutorBookingData } from '@/types';
import { createAcceptBookingRequestService } from '@/services/TutorService';
import { toast } from 'sonner';
import { rejectBookingService } from '@/services/DashboardService/TutorService';

interface BookingProps {
  bookings: tutorBookingData[] | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookingRequests({
  bookings,
  setLoading,
}: BookingProps) {
  const { user } = useUser();

  const acceptBookingRequest = async (item: tutorBookingData) => {
    let toastId: string | number = 'updateProfile';
    toastId = toast.loading('...Loading', { id: toastId });
    try {
      if (item && typeof item.userId === 'object' && item.userId !== null) {
        const obj = {
          id: item?._id,
          hourly_rate: item?.hourly_rate,
          student: item?.userId?._id,
          tutor: user?.userId,
          class: item?.class,
          time_slot: item?.availability_slot,
          subject: item?.subjects,
        };
        const res = await createAcceptBookingRequestService(obj);
        if (res?.success) {
          toast.success(res?.message, { id: toastId });
          setLoading(true);
        } else {
          toast.error(res?.message, { id: toastId });
          console.log(res);
        }
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const rejectBookingRequest = async (id: string) => {
    let toastId: string | number = 'updateProfile';
    toastId = toast.loading('...Loading', { id: toastId });
    try {
      const res = await rejectBookingService(id);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setLoading(true);
      } else {
        toast.error(res?.message, { id: toastId });
        console.log(res);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Booking Requests</h3>
          <p className="sub-header">Welcome, {user?.name}</p>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="gutter-row">
          {bookings?.map((item, index) => (
            <div className="book-request" key={index}>
              <h4 className="user-name">
                Book Request from{' '}
                <span className="user">
                  {typeof item?.userId === 'object' && item?.userId != null
                    ? item?.userId?.name
                    : ''}
                </span>
              </h4>
              <div className="class-info">
                <span className="title">Class:</span>
                <span className="value">{item?.class}</span>
              </div>
              <div className="class-info">
                <span className="title">Availability Slot:</span>
                <span className="value">{item?.availability_slot}</span>
              </div>
              <div className="class-info">
                <span className="title">Subject:</span>
                <span className="value">{item?.subjects}</span>
              </div>
              <div className="action-btn">
                <Button
                  block
                  className="accept"
                  onClick={() => acceptBookingRequest(item)}
                >
                  Accept
                </Button>
                <Button
                  block
                  className="reject"
                  onClick={() => rejectBookingRequest(item?._id as string)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
}
