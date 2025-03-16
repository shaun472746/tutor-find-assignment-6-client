'use server';

import { getValidToken } from '@/lib/verifyToken';
import { bookingPaymentDuration } from '@/types/Dashboard/AcceptanceTutor';
import { TTutor } from '@/types/Dashboard/StudentDashboard';
import { unstable_noStore as noStore } from 'next/cache';

export const getAcceptedBookingService = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/accepted-booking-requests/`,
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

export const createPaymentService = async (data: bookingPaymentDuration) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/make-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const makePaymentVerifyService = async (order_id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/payment-verify?order_id=${order_id}`,
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

export const getPastBookingsService = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/past-bookings`,
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

export const getPaymentHistoryService = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/payment-history`,
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

export const getTutorProfileDetailService = async (id: string) => {
  noStore();
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/get-tutor-profile-detail/${id}`,
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

export const uploadProfileImgService = async (url: { url: string }) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/upload-profile-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(url),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateTutorRatingService = async (rating: TTutor) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/update-tutor-rating`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rating),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
