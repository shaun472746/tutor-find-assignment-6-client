'use server';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { FieldTypeLogin, FieldTypeRegister, ProfileDetail } from '@/types';
import { getValidToken } from '@/lib/verifyToken';

export const registerUser = async (userData: FieldTypeRegister) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set('TutorAccessToken', result.data.accessToken);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData: FieldTypeLogin) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    console.log(result);
    if (result.success) {
      (await cookies()).set('TutorAccessToken', result.data.token);
      (await cookies()).set('TutorRefreshToken', result.data.refreshToken);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get('TutorAccessToken')?.value;

  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return '';
  }
};

export const updateCurrentUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/get-user-detail/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set('TutorAccessToken', result.data);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * update tutor profile
 */
export const updateTutorProfile = async (profileData: ProfileDetail) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-tutor-profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * get profile detail
 */

export const getProfileDetail = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/student-profile-detail/${id}`,
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
  } catch (err) {
    console.log(err);
  }
};

export const getTutorProfileDetail = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/tutor-profile-detail/${id}`,
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
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  (await cookies()).delete('TutorAccessToken');
  (await cookies()).delete('TutorRefreshToken');
};

/**
 * update student profile
 */

export const updateStudentProfile = async (profileData: ProfileDetail) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/update-student-profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(await cookies()).get('TutorRefreshToken')!.value}`,
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
