export type bookingPaymentDuration = {
  month?: number;
  hours?: number;
  city?: string;
  userInfo: paymentData;
  bookingRequestId?: string;
  hourly_rate: number;
  tutorId: string;
};

export type paymentData = {
  customer_email?: string;
  customer_name?: string;
  customer_address?: string;
  customer_phone?: string;
  customer_city?: string;
};
