export type FieldTypeLogin = {
  email?: string;
  password?: string;
};

export type FieldTypeRegister = {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  role?: string;
  updateProfile?: boolean;
  userId?: string;
  userEmail?: string;
  imageUrl?: string;
};

export type ProfileDetail = {
  id?: string;
  _id?: string;
  expertise?: string;
  subjects?: string[];
  rating?: number;
  image?: string;
  address?: string;
  available?: boolean;
  phone?: string;
  earning?: number;
  class?: string;
  availability_slot?: string[];
  hourly_rate?: number;
  totalEarning?: number;
} | null;

export type ProfileDetailStudent = {
  id?: string;
  _id?: string;
  image?: string;
  address?: string;
  class?: string;
  phone?: string;
} | null;

export type Tutor = {
  id?: {
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    updateProfile: boolean;
    imageUrl: string;
    _id: string;
  };

  expertise: string;
  subjects: string[];
  rating: {
    id: string;
    rate: number;
    review: string;
  }[];
  image?: string;
  address: string;

  phone: string;
  earning?: number;
  availability_slot: string[];
  hourly_rate: number;
  userDetails?: {
    email?: string;
    isBlocked?: boolean;
    imageUrl?: string;
    name?: string;
    role?: string;
    updateProfile?: boolean;
    _id: string;
  };
} | null;
export type allTutors = Tutor[] | null;

// tutor list

export type tutorBookingData = {
  availability_slot: string;
  subjects: string;
  class: string;
  userId?:
    | {
        email: string;
        isBlocked: boolean;
        name: string;
        role: string;
        updateProfile: boolean;
        _id: string;
      }
    | string;
  tutorId?: string;
  hourly_rate?: number;
  _id?: string;
} | null;

export type tutorBookingFormData = {
  availability_slot: string[];
  subjects: string[];
  class: string[];
} | null;

type TsubAcceptTutor = {
  _id: string;
  role: string;
  name: string;
  email: string;
};
export type TAcceptBookingRequest = {
  _id?: string;
  id: string | undefined;
  hourly_rate: number | undefined;
  student: string | undefined;
  tutor: string | undefined | TsubAcceptTutor;
  class: string | undefined;
  time_slot: string | undefined;
  subject: string | undefined;
};

export type TTutorTestimonials = {
  address: string;
  rating: {
    id: {
      email: string;
      name: string;
      role: string;
      imageUrl: string;
    };
    rate: number;
    review: string;
  };
};

export type TTutorProfileDtl = {
  id?: {
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    updateProfile: boolean;
    imageUrl: string;
    _id: string;
  };

  expertise: string;
  subjects: string[];
  rating: {
    id: string;
    rate: number;
    review: string;
  };
  image?: string;
  address: string;

  phone: string;
  earning?: number;
  availability_slot: string[];
  hourly_rate: number;
  userDetails?: {
    email?: string;
    isBlocked?: boolean;
    imageUrl?: string;
    name?: string;
    role?: string;
    updateProfile?: boolean;
    _id: string;
  };
};
