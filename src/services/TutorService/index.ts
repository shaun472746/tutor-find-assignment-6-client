'use server';

import { getValidToken } from '@/lib/verifyToken';
import { TAcceptBookingRequest, tutorBookingData } from '@/types';

export const getAllTutors = async (params: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/get-all-tutors?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTutorsProfileTestimonialService = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/get-tutor-profile-detail-testimonial`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getAllBookingReq = async (params: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/get-all-bookings/${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createBookingRequestService = async (
  bookingData: tutorBookingData
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/create-booking-request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createAcceptBookingRequestService = async (
  bookingData: TAcceptBookingRequest
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/create-accept-booking-request`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
