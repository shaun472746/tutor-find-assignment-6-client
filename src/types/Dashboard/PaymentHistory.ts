interface Tutor {
  _id: string;
  name: string;
}

interface BookingRequest {
  _id: string;
  id: string;
  class: string;
  subject: string;
  hourly_rate: number;
  student: string;
  available: boolean;
  tutor: Tutor;
  time_slot: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserInfo {
  customer_address: string;
  customer_city: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  _id: string;
}

interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface TpaymentHistory {
  transaction: Transaction;
  _id: string;
  bookingRequestId: BookingRequest;
  hours: number;
  month: number;
  hourly_rate: number;
  userInfo: UserInfo;
  createdAt: string;
  updatedAt: string;
}
