'use client';

import Image from 'next/image';
import '../asset/PopularTutor.css';
import '@/../../assets/root.css';
import { Carousel, ConfigProvider, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { allTutors } from '@/types';
import { getAllTutors } from '@/services/TutorService';

export default function PopularTutors() {
  const [tutorsForLargerScreen, setTutors] = useState<allTutors[]>();
  const [tutorsForMediumScreen, setMediumTutors] = useState<allTutors[]>();
  const [tutorsForSmallerScreen, setSmallerTutors] = useState<allTutors[]>();

  const getTutorsFunc = async () => {
    const res = await getAllTutors('');

    const result = res.data?.slice(0, 8);
    const largerDeviceCount = 4;
    const mediumDeviceCount = 3;
    const smallerDeviceCount = 2;
    // for larger devices
    const filteredTutorsForLargerScreen = Array.from(
      { length: Math.ceil(result.length / largerDeviceCount) },
      (_, index) => index + 1
    ).map((_, index) => {
      const count = index * largerDeviceCount;
      return result.slice(
        index * largerDeviceCount,
        count + largerDeviceCount <= result.length
          ? count + largerDeviceCount
          : result.length
      );
    });

    setTutors(filteredTutorsForLargerScreen);

    // for medium devices
    const filteredTutorsForMediumScreen = Array.from(
      { length: Math.ceil(result.length / mediumDeviceCount) },
      (_, index) => index + 1
    ).map((_, index) => {
      const count = index * mediumDeviceCount;
      return result.slice(
        index * mediumDeviceCount,
        count + mediumDeviceCount <= result.length
          ? count + mediumDeviceCount
          : result.length
      );
    });
    setMediumTutors(filteredTutorsForMediumScreen);

    // for smaller devices
    const filteredTutorsForSmallerScreen = Array.from(
      { length: Math.ceil(result.length / smallerDeviceCount) },
      (_, index) => index + 1
    ).map((_, index) => {
      const count = index * smallerDeviceCount;
      return result.slice(
        index * smallerDeviceCount,
        count + smallerDeviceCount <= result.length
          ? count + smallerDeviceCount
          : result.length
      );
    });
    setSmallerTutors(filteredTutorsForSmallerScreen);
  };

  useEffect(() => {
    getTutorsFunc();
  }, []);

  return (
    <div className="popular-tutors ">
      <div className="slider-background"></div>
      <div className="tutor-slider default-padding-body">
        <div className="header-description ">
          <h2 className="heading">Our Popular Tutors</h2>
          <p className="sub-heading">Few of the verified Tutors</p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                /* here is your component tokens */
                arrowSize: 24,
              },
            },
          }}
        >
          <Carousel
            arrows
            infinite={false}
            className="for-smaller-devices"
            dots={false}
          >
            {tutorsForSmallerScreen &&
              tutorsForSmallerScreen.map((tutorList, index) => (
                <div key={index}>
                  <div className="columns">
                    {tutorList &&
                      tutorList.map((tutor, index) => (
                        <div className="column" key={index}>
                          <Image
                            src={
                              tutor?.id?.imageUrl ||
                              '/images/static/profile.png'
                            }
                            width={300}
                            height={200}
                            className="tutor-image"
                            alt="email-logo"
                          />
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={
                              tutor?.rating?.length // 1. Check if ratings exist and have entries
                                ? // 2. If ratings exist:
                                  tutor.rating.reduce(
                                    (acc, curr) => acc + (curr?.rate || 0), // 3. Safe rating access
                                    0
                                  ) / tutor.rating.length // 4. Safe division
                                : 0
                            }
                          />

                          <h3 className="tutor-name">{tutor?.id?.name}</h3>
                          <p className="tutor-skill">
                            Expert In{' '}
                            <span className="skill-subject">
                              {tutor && tutor?.expertise?.length > 0
                                ? tutor?.expertise[0]
                                    ?.toString()
                                    ?.toUpperCase()
                                    ?.split('_')
                                    ?.join(' ')
                                : ''}
                            </span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </Carousel>
          <Carousel
            arrows
            infinite={false}
            className="for-medium-devices"
            dots={false}
          >
            {tutorsForMediumScreen &&
              tutorsForMediumScreen.map((tutorList, index) => (
                <div key={index}>
                  <div className="columns">
                    {tutorList &&
                      tutorList.map((tutor, index) => (
                        <div className="column" key={index}>
                          <Image
                            src={
                              tutor?.id?.imageUrl ||
                              '/images/static/profile.png'
                            }
                            width={300}
                            height={200}
                            className="tutor-image"
                            alt="email-logo"
                          />
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={
                              tutor?.rating?.length // 1. Check if ratings exist and have entries
                                ? // 2. If ratings exist:
                                  tutor.rating.reduce(
                                    (acc, curr) => acc + (curr?.rate || 0), // 3. Safe rating access
                                    0
                                  ) / tutor.rating.length // 4. Safe division
                                : 0
                            }
                          />
                          <h3 className="tutor-name">{tutor?.id?.name}</h3>
                          <p className="tutor-skill">
                            Expert In{' '}
                            <span className="skill-subject">
                              {tutor && tutor?.expertise?.length > 0
                                ? tutor?.expertise[0]
                                    ?.toString()
                                    ?.toUpperCase()
                                    ?.split('_')
                                    ?.join(' ')
                                : ''}
                            </span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </Carousel>
          <Carousel
            arrows
            infinite={false}
            className="for-larger-devices"
            dots={false}
          >
            {tutorsForLargerScreen &&
              tutorsForLargerScreen.map((tutorList, index) => (
                <div key={index}>
                  <div className="columns">
                    {tutorList &&
                      tutorList.map((tutor, index) => (
                        <div className="column" key={index}>
                          <Image
                            src={
                              tutor?.id?.imageUrl ||
                              '/images/static/profile.png'
                            }
                            width={300}
                            height={200}
                            className="tutor-image"
                            alt="email-logo"
                          />
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={
                              tutor?.rating?.length // 1. Check if ratings exist and have entries
                                ? // 2. If ratings exist:
                                  tutor.rating.reduce(
                                    (acc, curr) => acc + (curr?.rate || 0), // 3. Safe rating access
                                    0
                                  ) / tutor.rating.length // 4. Safe division
                                : 0
                            }
                          />
                          <h3 className="tutor-name">{tutor?.id?.name}</h3>
                          <p className="tutor-skill">
                            Expert In{' '}
                            <span className="skill-subject">
                              {tutor && tutor?.expertise?.length > 0
                                ? tutor?.expertise[0]
                                    ?.toString()
                                    ?.toUpperCase()
                                    ?.split('_')
                                    ?.join(' ')
                                : ''}
                            </span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </Carousel>
        </ConfigProvider>
      </div>
    </div>
  );
}
