'use server';
import { getValidToken } from '@/lib/verifyToken';

export const rejectBookingService = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutor/reject-booking-request/${id}`,
      {
        method: 'PATCH',
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
