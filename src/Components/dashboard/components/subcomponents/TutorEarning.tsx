'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/TotalEarning.css';
import '@/../../assets/root.css';

import { useEffect } from 'react';
import Image from 'next/image';

export default function TutorEarning() {
  const { setIsLoading, profileDetail } = useUser();
  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  return (
    <>
      <div className="total-earning">
        <Image
          src={'/images/static/office-worker.png'}
          width={100}
          height={100}
          className="tutor-image-earning"
          alt="tutor-logo"
        />
        <h4 className="heading-title">Your Total Earning</h4>
        <h1 className="earning-amount">{profileDetail?.totalEarning} BDT</h1>
      </div>
    </>
  );
}
